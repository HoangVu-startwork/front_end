'use client';

import * as React from 'react';

/** =========================
 *  Types
 *  ========================= */
type Ward = { code: number; name: string };
type District = { code: number; name: string };
type Province = { code: number; name: string; districts?: District[] };

/** =========================
 *  Config & Helpers
 *  ========================= */
const ENV = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) || '';
const PROVINCES_API = 'https://provinces.open-api.vn/api/?depth=2';

const vnCollator = new Intl.Collator('vi', { sensitivity: 'base' });
const sortByName = (a: { name: string }, b: { name: string }) => vnCollator.compare(a.name, b.name);

function normalizeName(str?: string) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    // @ts-expect-error: Unicode class for diacritics
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^tinh\s+/, '')
    .replace(/^thanh pho\s+/, '')
    .replace(/^quan\s+/, '')
    .replace(/^huyen\s+/, '')
    .replace(/^thi xa\s+/, '')
    .replace(/^phuong\s+/, '')
    .replace(/^xa\s+/, '')
    .replace(/^thanh pho thu duc\s*/, 'thu duc');
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function Spinner() {
  return <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

/** =========================
 *  Google Maps loader (key OR full URL)
 *  ========================= */
function loadGoogleMapsSrc(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('window not available');
    if ((window as any).google?.maps) return resolve((window as any).google);

    const id = 'google-maps-js';
    if (document.getElementById(id)) {
      const timer = setInterval(() => {
        if ((window as any).google?.maps) { clearInterval(timer); resolve((window as any).google); }
      }, 50);
      setTimeout(() => clearInterval(timer), 10000);
      return;
    }

    const s = document.createElement('script');
    s.id = id;
    s.async = true;
    s.src = src;
    s.onerror = () => reject('Failed to load Google Maps JS');
    s.onload = () => {
      if ((window as any).google?.maps) resolve((window as any).google);
      else reject('Google Maps not available after load');
    };
    document.head.appendChild(s);
  });
}

function loadGoogleMapsFromEnv(): Promise<any> {
  if (!ENV) return Promise.reject('Thiếu NEXT_PUBLIC_GOOGLE_MAPS_API_KEY trong .env.local');
  const src = /^https?:\/\//i.test(ENV)
    ? ENV
    : `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(ENV)}&libraries=places&language=vi`;
  return loadGoogleMapsSrc(src);
}

function geocodeAddress(address: string): Promise<{ lat: number; lng: number; formattedAddress: string }> {
  return new Promise((resolve, reject) => {
    const g: any = (typeof window !== 'undefined' ? (window as any).google : undefined);
    if (!(g && g.maps)) return reject('Google Maps JS not available');
    const geocoder = new g.maps.Geocoder();
    geocoder.geocode({ address }, (results: any[], status: string) => {
      if (status === 'OK' && results?.[0]) {
        const loc = results[0].geometry.location;
        resolve({ lat: loc.lat(), lng: loc.lng(), formattedAddress: results[0].formatted_address });
      } else reject(status);
    });
  });
}

function pickAdminFromComponents(components: any[] = []) {
  let province = '', district = '', ward = '';
  for (const c of components) {
    if (c.types?.includes('administrative_area_level_1')) province = c.long_name;
    if (c.types?.includes('administrative_area_level_2')) district = c.long_name;
    if (c.types?.includes('administrative_area_level_3') || c.types?.includes('sublocality_level_1')) ward = c.long_name;
    if (!district && c.types?.includes('locality')) district = c.long_name; // fallback
  }
  return { province, district, ward };
}

/** =========================
 *  Overpass: fetch street names (highway with name) around lat/lng
 *  ========================= */
async function fetchStreetsAround(lat: number, lng: number, radius = 1500): Promise<string[]> {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter'
  ];
  const query = `
[out:json][timeout:25];
(
  way["highway"]["name"](around:${radius},${lat},${lng});
);
out tags;`;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: 'data=' + encodeURIComponent(query)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const names = new Set<string>();
      for (const el of (data?.elements || [])) {
        const n = el?.tags?.name;
        if (typeof n === 'string' && n.trim()) names.add(n.trim());
      }
      const list = Array.from(names).sort((a, b) => vnCollator.compare(a, b));
      return list.slice(0, 600); // hard cap
    } catch {
      // try next endpoint
    }
  }
  return [];
}

/** =========================
 *  PAGE (Province → District → Ward → Street)
 *  ========================= */
export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [provinceCode, setProvinceCode] = React.useState<string>('');
  const [districtCode, setDistrictCode] = React.useState<string>('');

  // Wards
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [wardCode, setWardCode] = React.useState<string>('');
  const [loadingWards, setLoadingWards] = React.useState(false);

  // Streets
  const [streets, setStreets] = React.useState<string[]>([]);
  const [streetName, setStreetName] = React.useState<string>('');
  const [loadingStreets, setLoadingStreets] = React.useState(false);

  // Keep latest center (for Overpass)
  const centerRef = React.useRef<{lat:number; lng:number} | null>(null);

  const pendingWardNameRef = React.useRef<string>(''); // from Places result, to auto-select after wards load

  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [mapReady, setMapReady] = React.useState(false);
  const mapInstanceRef = React.useRef<any>(null);
  const markerRef = React.useRef<any>(null);

  // Load provinces + districts (cache 7d)
  React.useEffect(() => {
    let cancelled = false;
    const key = 'vn_provinces_depth2_v1';
    const now = Date.now();

    async function bootstrap() {
      try {
        let cache: { ts: number; data: Province[] } | null = null;
        try { cache = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}

        if (cache?.data && Array.isArray(cache.data) && (now - cache.ts < 7 * 24 * 60 * 60 * 1000)) {
          const data = cache.data.slice().sort(sortByName)
            .map(p => ({ ...p, districts: (p.districts || []).slice().sort(sortByName) }));
          if (!cancelled) setProvinces(data);
        } else {
          const res = await fetch(PROVINCES_API, { cache: 'no-store' });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          let data: Province[] = await res.json();
          data.sort(sortByName);
          data = data.map(p => ({ ...p, districts: (p.districts || []).slice().sort(sortByName) }));
          localStorage.setItem(key, JSON.stringify({ ts: now, data }));
          if (!cancelled) setProvinces(data);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Không tải được danh sách Tỉnh/Thành.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    bootstrap();
    return () => { cancelled = true; };
  }, []);

  const selectedProvince = React.useMemo(
    () => provinces.find(p => String(p.code) === String(provinceCode)) || null,
    [provinces, provinceCode]
  );
  const districts = selectedProvince?.districts || [];
  const selectedDistrict = React.useMemo(
    () => districts.find(d => String(d.code) === String(districtCode)) || null,
    [districts, districtCode]
  );
  const selectedWard = React.useMemo(
    () => wards.find(w => String(w.code) === String(wardCode)) || null,
    [wards, wardCode]
  );

  // When district changes → load wards
  React.useEffect(() => {
    let cancelled = false;
    async function loadWards() {
      setWards([]);
      setWardCode('');
      setStreets([]);
      setStreetName('');
      if (!districtCode) { pendingWardNameRef.current = ''; return; }
      try {
        setLoadingWards(true);
        const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const ws: Ward[] = (data?.wards || []).slice().sort(sortByName);
        if (!cancelled) {
          setWards(ws);
          // Auto-select ward if we have a pending name from Places
          const pending = pendingWardNameRef.current;
          if (pending) {
            const match = ws.find(w => normalizeName(w.name) === normalizeName(pending));
            if (match) setWardCode(String(match.code));
            pendingWardNameRef.current = '';
          }
        }
      } catch (e) {
        console.error('Load wards error:', e);
        if (!cancelled) setWards([]);
      } finally {
        if (!cancelled) setLoadingWards(false);
      }
    }
    loadWards();
    return () => { cancelled = true; };
  }, [districtCode]);

  // Init Google Map + Places Autocomplete
  React.useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const google = await loadGoogleMapsFromEnv();
        if (cancelled) return;

        const center = { lat: 10.8231, lng: 106.6297 }; // HCM default
        const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
          center, zoom: 11, mapTypeControl: false, fullscreenControl: false, streetViewControl: false
        });
        mapInstanceRef.current = map;

        markerRef.current = new google.maps.Marker({ map, position: center, draggable: false });
        centerRef.current = center;

        if (inputRef.current) {
          const ac = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'vn' },
            fields: ['address_components', 'geometry', 'formatted_address'],
            types: ['geocode']
          });
          ac.addListener('place_changed', async () => {
            const place = ac.getPlace();
            if (!place || !place.address_components) return;

            const { province, district, ward } = pickAdminFromComponents(place.address_components);

            const pMatch = provinces.find(p => normalizeName(p.name) === normalizeName(province));
            const dMatch = pMatch?.districts?.find(d => normalizeName(d.name) === normalizeName(district));
            if (pMatch) setProvinceCode(String(pMatch.code));
            if (dMatch) setDistrictCode(String(dMatch.code));
            pendingWardNameRef.current = ward || '';

            const loc = place.geometry?.location;
            if (loc) {
              const lat = loc.lat(), lng = loc.lng();
              updateMapLocation(lat, lng);
              centerRef.current = { lat, lng };
              // prefetch streets near this point if ward already set (or soon)
              try {
                setLoadingStreets(true);
                const list = await fetchStreetsAround(lat, lng, 1500);
                setStreets(list);
              } finally {
                setLoadingStreets(false);
              }
            } else {
              const addr = [ward, district, province, 'Việt Nam'].filter(Boolean).join(', ');
              try {
                const { lat, lng } = await geocodeAddress(addr);
                updateMapLocation(lat, lng);
                centerRef.current = { lat, lng };
                setLoadingStreets(true);
                const list = await fetchStreetsAround(lat, lng, 1500);
                setStreets(list);
              } catch {}
              finally { setLoadingStreets(false); }
            }
          });
        }

        setMapReady(true);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Không thể tải Google Maps JS. Kiểm tra env hoặc quyền API.');
      }
    }

    init();
    return () => { cancelled = true; };
  }, [provinces]);

  function updateMapLocation(lat: number, lng: number) {
    const map = mapInstanceRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;
    const pos = { lat: Number(lat), lng: Number(lng) };
    marker.setPosition(pos);
    map.setZoom(13);
    map.panTo(pos);
  }

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setProvinceCode(code);
    setDistrictCode('');
    setWards([]); setWardCode('');
    setStreets([]); setStreetName('');
    const p = provinces.find(x => String(x.code) === String(code));
    if (p) geocodeAddress(`${p.name}, Việt Nam`).then(({ lat, lng }) => { updateMapLocation(lat, lng); centerRef.current = {lat,lng}; }).catch(() => {});
  }
  function handleDistrictChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setDistrictCode(code);
    setWardCode('');
    setStreets([]); setStreetName('');
    const p = provinces.find(x => String(x.code) === String(provinceCode));
    const d = p?.districts?.find(x => String(x.code) === String(code));
    if (p && d) geocodeAddress(`${d.name}, ${p.name}, Việt Nam`).then(({ lat, lng }) => { updateMapLocation(lat, lng); centerRef.current = {lat,lng}; }).catch(() => {});
  }
  async function handleWardChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setWardCode(code);
    setStreetName('');
    setStreets([]);
    const p = provinces.find(x => String(x.code) === String(provinceCode));
    const d = p?.districts?.find(x => String(x.code) === String(districtCode));
    const w = wards.find(x => String(x.code) === String(code));
    const parts = [w?.name, d?.name, p?.name, 'Việt Nam'].filter(Boolean).join(', ');
    if (parts) {
      try {
        const { lat, lng } = await geocodeAddress(parts);
        updateMapLocation(lat, lng);
        centerRef.current = { lat, lng };
        setLoadingStreets(true);
        const list = await fetchStreetsAround(lat, lng, 1500);
        setStreets(list);
      } catch {}
      finally { setLoadingStreets(false); }
    }
  }
  async function handleStreetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const name = e.target.value;
    setStreetName(name);
    const p = provinces.find(x => String(x.code) === String(provinceCode));
    const d = p?.districts?.find(x => String(x.code) === String(districtCode));
    const w = wards.find(x => String(x.code) === String(wardCode));
    const parts = [name || '', w?.name, d?.name, p?.name, 'Việt Nam'].filter(Boolean).join(', ');
    if (name) {
      try {
        const { lat, lng } = await geocodeAddress(parts);
        updateMapLocation(lat, lng);
        centerRef.current = { lat, lng };
      } catch {}
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Google Maps + Tỉnh/Quận/Phường-Xã/Đường (Next.js – page.tsx)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Search + Selects */}
        <div className="lg:col-span-1">
          <label htmlFor="gmaps-search" className="mb-1 block text-sm font-medium text-gray-700">Tìm trên bản đồ</label>
          <input
            id="gmaps-search"
            ref={inputRef}
            type="text"
            placeholder="Nhập địa chỉ, địa danh… (VN)"
            className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 grid grid-cols-1 gap-4">
            {/* Province */}
            <div className="flex flex-col">
              <label htmlFor="province-select" className="mb-1 text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
              <div className="relative">
                <select
                  id="province-select"
                  className="w-full appearance-none rounded-2xl border border-gray-300 bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={provinceCode}
                  onChange={handleProvinceChange}
                  disabled={loading}
                >
                  <option value="">-- Chọn Tỉnh/Thành phố --</option>
                  {provinces.map(p => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
                <ArrowDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label htmlFor="district-select" className="mb-1 text-sm font-medium text-gray-700">Quận/Huyện</label>
              <div className="relative">
                <select
                  id="district-select"
                  className="w-full appearance-none rounded-2xl border border-gray-300 bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  value={districtCode}
                  onChange={handleDistrictChange}
                  disabled={!provinceCode || loading}
                >
                  <option value="">-- Chọn Quận/Huyện --</option>
                  {districts.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>
                <ArrowDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Ward */}
            <div className="flex flex-col">
              <label htmlFor="ward-select" className="mb-1 text-sm font-medium text-gray-700">Phường/Xã</label>
              <div className="relative">
                <select
                  id="ward-select"
                  className="w-full appearance-none rounded-2xl border border-gray-300 bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  value={wardCode}
                  onChange={handleWardChange}
                  disabled={!districtCode || loadingWards}
                >
                  <option value="">{loadingWards ? 'Đang tải…' : '-- Chọn Phường/Xã --'}</option>
                  {wards.map(w => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                  ))}
                </select>
                <ArrowDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Street */}
            <div className="flex flex-col">
              <label htmlFor="street-select" className="mb-1 text-sm font-medium text-gray-700">Đường</label>
              <div className="relative">
                <select
                  id="street-select"
                  className="w-full appearance-none rounded-2xl border border-gray-300 bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  value={streetName}
                  onChange={handleStreetChange}
                  disabled={!wardCode || loadingStreets}
                >
                  <option value="">{loadingStreets ? 'Đang tải…' : '-- Chọn Đường --'}</option>
                  {streets.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ArrowDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
              {!loadingStreets && wardCode && streets.length === 0 && (
                <span className="mt-1 text-xs text-gray-500">
                  Không tìm thấy tên đường gần khu vực này (OSM). Bạn có thể nhập ô tìm kiếm Google phía trên.
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            {loading && (<><Spinner /> <span>Đang tải dữ liệu hành chính…</span></>)}
            {!loading && error && <span className="text-red-600">{error}</span>}
            {!loading && !error && (
              <span>
                Đã chọn:
                {' '}
                <strong>{streetName || '—'}</strong>
                {streetName ? ', ' : ''}
                <strong>{selectedWard?.name || '—'}</strong>
                {selectedWard ? ', ' : ''}
                <strong>{selectedDistrict?.name || '—'}</strong>
                {selectedDistrict ? ', ' : ''}
                <strong>{selectedProvince?.name || '—'}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-[420px] rounded-2xl border border-gray-200 overflow-hidden">
            <div ref={mapRef} className="absolute inset-0" />
            {!mapReady && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 bg-white/60">
                <Spinner />
                <span className="ml-2">Đang tải bản đồ Google…</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* debug */}
      <pre className="mt-4 text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto">
        {JSON.stringify(
          {
            province: selectedProvince?.name || null,
            district: selectedDistrict?.name || null,
            ward: selectedWard?.name || null,
            street: streetName || null
          },
          null, 2
        )}
      </pre>
    </main>
  );
}
