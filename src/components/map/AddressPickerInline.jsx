'use client';

import * as React from 'react';

const PROVINCES_API = 'https://provinces.open-api.vn/api/?depth=2';
const vnCollator = new Intl.Collator('vi', { sensitivity: 'base' });
const sortByName = (a, b) => vnCollator.compare(a.name, b.name);

export default function AddressPickerNoURL({ onChange }) {
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const [provinces, setProvinces] = React.useState([]);
  const provincesRef = React.useRef([]);
  React.useEffect(() => { provincesRef.current = provinces; }, [provinces]);

  const [provinceCode, setProvinceCode] = React.useState('');
  const [districtCode, setDistrictCode] = React.useState('');
  const [wardCode, setWardCode] = React.useState('');

  const [wards, setWards] = React.useState([]);
  const [loadingWards, setLoadingWards] = React.useState(false);

  // Load provinces + districts (cache 7 ngày)
  React.useEffect(() => {
    let cancelled = false;
    const key = 'vn_provinces_depth2_v1';
    const now = Date.now();
    (async () => {
      try {
        let cache = null;
        try { cache = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
        if (cache?.data && Array.isArray(cache.data) && (now - cache.ts < 7 * 24 * 60 * 60 * 1000)) {
          const data = cache.data.slice().sort(sortByName)
            .map(p => ({ ...p, districts: (p.districts || []).slice().sort(sortByName) }));
          if (!cancelled) setProvinces(data);
        } else {
          const res = await fetch(PROVINCES_API, { cache: 'no-store' });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          let data = await res.json();
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
    })();
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

  // When district changes -> load wards
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setWards([]); setWardCode('');
      if (!districtCode) return;
      try {
        setLoadingWards(true);
        const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const ws = (data?.wards || []).slice().sort(sortByName);
        if (!cancelled) setWards(ws);
      } catch (e) {
        console.error('Load wards error:', e);
        if (!cancelled) setWards([]);
      } finally {
        if (!cancelled) setLoadingWards(false);
      }
    })();
    return () => { cancelled = true; };
  }, [districtCode]);

  // Emit helper
  function emit(payload) {
    try { onChangeRef.current?.(payload); } catch (e) { console.error(e); }
  }

  function handleProvinceChange(e) {
    const code = e.target.value;
    setProvinceCode(code);
    setDistrictCode('');
    setWardCode('');
    setWards([]);

    const p = provinces.find(x => String(x.code) === String(code));
    if (p) {
      emit({
        provinceCode: String(p.code),
        province: p.name,
        districtCode: '',
        district: '',
        wardCode: '',
        ward: ''
      });
    } else {
      emit({ provinceCode: '', province: '', districtCode: '', district: '', wardCode: '', ward: '' });
    }
  }

  function handleDistrictChange(e) {
    const code = e.target.value;
    setDistrictCode(code);
    setWardCode('');
    setWards([]);

    const p = provinces.find(x => String(x.code) === String(provinceCode));
    const d = p?.districts?.find(x => String(x.code) === String(code));
    if (p && d) {
      emit({
        provinceCode: String(p.code),
        province: p.name,
        districtCode: String(d.code),
        district: d.name,
        wardCode: '',
        ward: ''
      });
    } else {
      emit({ districtCode: '', district: '', wardCode: '', ward: '' });
    }
  }

  function handleWardChange(e) {
    const code = e.target.value;
    setWardCode(code);

    const p = provinces.find(x => String(x.code) === String(provinceCode));
    const d = p?.districts?.find(x => String(x.code) === String(districtCode));
    const w = wards.find(x => String(x.code) === String(code));

    if (p && d && w) {
      emit({
        provinceCode: String(p.code),
        province: p.name,
        districtCode: String(d.code),
        district: d.name,
        wardCode: String(w.code),
        ward: w.name
      });
    } else {
      emit({ wardCode: '', ward: '' });
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-full">
        <div className="grid grid-cols-1 gap-4">
          {/* Province */}
          <div className="flex flex-col">
            <label htmlFor="province-select" className="mb-1 text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
            <select
              id="province-select"
              className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={provinceCode}
              onChange={handleProvinceChange}
              disabled={loading}
            >
              <option value="">-- Chọn Tỉnh/Thành phố --</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label htmlFor="district-select" className="mb-1 text-sm font-medium text-gray-700">Quận/Huyện</label>
            <select
              id="district-select"
              className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              value={districtCode}
              onChange={handleDistrictChange}
              disabled={!provinceCode || loading}
            >
              <option value="">-- Chọn Quận/Huyện --</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Ward */}
          <div className="flex flex-col">
            <label htmlFor="ward-select" className="mb-1 text-sm font-medium text-gray-700">Phường/Xã</label>
            <select
              id="ward-select"
              className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              value={wardCode}
              onChange={handleWardChange}
              disabled={!districtCode || loadingWards}
            >
              <option value="">{loadingWards ? 'Đang tải…' : '-- Chọn Phường/Xã --'}</option>
              {wards.map(w => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="mt-3 text-sm text-gray-600">
          {loading && <div>Đang tải dữ liệu hành chính…</div>}
          {!loading && error && <div className="text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}
