'use client'
import { useState, useEffect, useRef } from 'react';

import { useParams, useSearchParams } from "next/navigation";
import AddressPickerNoURL from "@/components/map/AddressPickerInline"

type Addr = {
    province?: string; district?: string; ward?: string; street?: string;
    lat?: number; lng?: number;
  };

  const composeAddress = (a: Addr) =>
    [a.street, a.ward, a.district, a.province].filter(Boolean).join(', ');

function Page() {

    const [addr, setAddr] = useState<Addr>({});
    const [diachi, setDiachi] = useState('');
  
    const handleAddrChange = (payload: Partial<Addr>) => {
      const merged = { ...addr, ...payload };
      setAddr(merged);
      setDiachi(composeAddress(merged));
    };
    return (
        <div className="p-4">
            <AddressPickerNoURL onChange={handleAddrChange} />

            {/* Bạn vẫn có thể hiển thị từng phần nếu muốn */}
            <div className="mt-4 rounded-xl border p-4 bg-white text-sm">
                <div><b>Đường:</b> {addr.street || '—'}</div>
                <div><b>Phường/Xã:</b> {addr.ward || '—'}</div>
                <div><b>Quận/Huyện:</b> {addr.district || '—'}</div>
                <div><b>Tỉnh/Thành:</b> {addr.province || '—'}</div>
                <div><b>Tọa độ:</b> {addr.lat && addr.lng ? `${addr.lat}, ${addr.lng}` : '—'}</div>
            </div>

            {/* Biến diachi đã tổng hợp sẵn để submit backend / hiển thị */}
            <div className="mt-3 rounded-xl border p-4 bg-white text-sm">
                <div><b>Địa chỉ (gộp):</b> {diachi || '—'}</div>
            </div>
        </div>
    );
}

export default Page;