'use client';

import { useState, useEffect, useMemo } from 'react';
import Giohang from '@/service/giohang';
import { useRouter } from 'next/navigation';
import "@/app/(dienthoai)/css/giohang.css"
import xoaGihang from '../../../../../public/img/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import Link from 'next/link';



export default function Giohangsanpham() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<Record<string | number, boolean>>({});
    const [selected, setSelected] = useState<Set<string | number>>(new Set()); // các _uid đã chọn

    const router = useRouter();
    // Helper: ép số, kẹp trong khoảng 1..99
    //Nhận một giá trị v (có thể là string, number, undefined, ...).
    //Ép kiểu sang số bằng Number(v).
    //Nếu không phải số hợp lệ (NaN, Infinity, ...), trả về mặc định là 1.
    //Dùng Math.floor(n) để làm tròn xuống (tránh số thập phân).
    //Dùng Math.max(1, ...) để giới hạn tối thiểu = 1.
    //Dùng Math.min(99, ...) để giới hạn tối đa = 99
    // const toQty = (v: any) => {
    //     const n = Number(v);
    //     if (!Number.isFinite(n)) return 1;
    //     return Math.min(99, Math.max(1, Math.floor(n)));
    // };

    // Helper: ép số, kẹp trong khoảng 0..99 (CHO PHÉP 0)
    const toQty = (v: any) => {
        const n = Number(v);
        if (!Number.isFinite(n)) return 0;
        return Math.min(99, Math.max(0, Math.floor(n)));
    };


    // Tạo _uid và chuẩn hóa soluong thành number attachUids → gắn thêm các field _uid, _serverId, và chuẩn hóa soluong để frontend dễ quản lý và đồng bộ với backend.
    const attachUids = (list: any[]) =>
        (list ?? []).map((it: any, idx: number) => ({
            ...it,
            _uid:
                it.giohangId ??
                it.cartItemId ??
                it.id ??
                it.mausacId ??
                `${it.tensanpham || 'sp'}-${it.tenmausac || 'ms'}-${idx}`,
            soluong: toQty(it.soluong),
            _serverId: it.giohangId ?? it.cartItemId ?? it.id, // luôn giữ id giỏ hàng
        }));


    const fetchGiohang = async () => {
        try {
            const res = await Giohang.getGiohang();
            setData(attachUids(res));
            console.log(res);
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN').format(value) + ' đ';

    useEffect(() => {
        fetchGiohang();
    }, []);

    // --- Giá sau khuyến mãi cho 1 sp ---
    const unitPrice = (it: any) => {
        const base = Number(it.mausacGiaban) || 0;
        const km = Number(it.phantramKhuyenmai) || 0;
        return km > 0 ? base - (base * km) / 100 : base;
    };

    // --- Tổng tiền của các dòng đã chọn ---
    const totalSelected = useMemo(() => {
        return data.reduce((sum, it) => {
            if (!selected.has(it._uid)) return sum;
            return sum + unitPrice(it) * toQty(it.soluong);
        }, 0);
    }, [data, selected]);

    // --- Cập nhật số lượng (optimistic) theo _uid ---
    const applyLocalQty = (_uid: string | number, qty: number) => {
        const q = toQty(qty);
        setData(prev =>
            prev.map((it: any) => (it._uid === _uid ? { ...it, soluong: q } : it)),
        );
    };

    const updateQtyServer = async (item: any, newQty: number) => {
        const rowId = item._uid;
        setUpdating(prev => ({ ...prev, [rowId]: true }));
        const oldQty = toQty(item.soluong);
        // Cập nhật local ngay
        applyLocalQty(rowId, newQty);

        try {
            // Ưu tiên lấy id giỏ hàng từ các key khác nhau
            const serverId = item.id;
            await Giohang.updateQuantity({
                giohangId: serverId,
                quantity: toQty(newQty),
            });
        } catch (e) {
            applyLocalQty(rowId, oldQty);
            alert("Cập nhật số lượng thất bại. Vui lòng thử lại.");
        } finally {
            setUpdating(prev => ({ ...prev, [rowId]: false }));
        }
    };


    const dec = (item: any) => {
        const rowId = item._uid;
        if (updating[rowId]) return;
        const cur = toQty(item.soluong);
        const next = Math.max(1, cur - 1);
        if (next !== cur) updateQtyServer(item, next);
    };

    const inc = (item: any) => {
        const rowId = item._uid;
        if (updating[rowId]) return;
        const cur = toQty(item.soluong);
        const next = Math.min(99, cur + 1);
        if (next !== cur) updateQtyServer(item, next);
    };

    const onManualChange = (item: any, value: string) => {
        const rowId = item._uid;
        const parsed = Number(String(value).replace(/\D/g, ''));
        applyLocalQty(rowId, toQty(parsed));
    };

    const onManualBlur = (item: any) => {
        updateQtyServer(item, toQty(item.soluong));
    };

    // --- Chọn/bỏ chọn một dòng ---
    const toggleSelect = (rowId: string | number, checked: boolean) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (checked) next.add(rowId);
            else next.delete(rowId);
            return next;
        });
    };

    const xoaGiohang = async (id: any) => {
        try {
            const res = await Giohang.deleteGiohang(id);
            console.log("Xoá thanh cong");
            fetchGiohang()
        } catch {

        }
    }

    const totals = useMemo(() => {
        return data.reduce(
            (acc, it) => {
                if (!selected.has(it._uid)) return acc;

                const qty = toQty(it.soluong);
                const base = Number(it.mausacGiaban) || 0;
                const km = Number(it.phantramKhuyenmai) || 0;
                const after = km > 0 ? base - (base * km) / 100 : base;

                acc.before += base * qty;
                acc.after += after * qty;
                acc.discount += (base - after) * qty;
                return acc;
            },
            { before: 0, after: 0, discount: 0 }
        );
    }, [data, selected]);


    const handleCheckout = () => {
        const selectedItems = data.filter((it: any) => selected.has(it._uid) && toQty(it.soluong) > 0)
            .map((it: any) => {
                const soluong = toQty(it.soluong);
                const giasanpham = Number(it.mausacGiaban) || 0;
                const khuyenmai = Number(it.phantramKhuyenmai) || 0;
                const Tonggia = khuyenmai > 0 ? giasanpham - (giasanpham * khuyenmai) / 100 : giasanpham;

                return {
                    giohangId: it.id ?? it._serverId ?? null,
                    dienthoaiId: it.dienthoaiId,
                    mausacId: it.mausacId,
                    tensanpham: it.tensanpham,
                    tenmausac: it.tenmausac,
                    hinhanh: it.mausacHinhanh,
                    quantity: soluong,
                    giasanphammau: giasanpham,
                    khuyenmaisanpham: khuyenmai,
                    price: Tonggia,
                    // Tổng tiền dòng để hiển thị nhanh
                    lineTotal: Tonggia * soluong,
                }
            });

        if (selectedItems.length === 0) {
            alert('Vui lòng chọn ít nhất 1 sản phẩm còn hàng trước khi thanh toán.');
            return;
        }

        try {
            // Lưu tạm vào localStorage
            localStorage.setItem('hn_checkout_selection', JSON.stringify(selectedItems));
            // Điều hướng sang trang payment-info
            router.push('/payment-info');
        } catch (e) {
            console.error('Không thể lưu lựa chọn thanh toán:', e);
            alert('Có lỗi khi xử lý dữ liệu thanh toán. Vui lòng thử lại.');
        }
    }

    if (loading) return <p>Đang tải dữ liệu...</p>;


    return (
        <div className="tranggiohang-components w-svh">
            {data.map((giohang: any) => {
                const rowId = giohang._uid;
                const isUpdating = !!updating[rowId];
                const qty = toQty(giohang.soluong);
                const isOut = qty === 0;            // HẾT HÀNG
                const priceAfter = unitPrice(giohang);

                return (
                    <div key={rowId} className="w-svh giohang-item flex items-center gap-4 py-4 border-b">
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={!isOut && selected.has(rowId)}   // không cho “checked” nếu hết hàng
                            onChange={(e) => toggleSelect(rowId, e.target.checked)}
                            disabled={isOut}                          // KHÓA checkbox khi hết hàng
                            className="mt-1 custom-checkbox"
                        />

                        {/* Hình ảnh */}
                        <div className="w-28 h-28 shrink-0 relative rounded-lg overflow-hidden">
                            {isOut ? (
                                <>

                                    <div className="hethang absolute mt-1 text-xl font-semibold text-red-600">
                                        Hết hàng
                                    </div>
                                </>
                            ) : (<>

                            </>)}
                            <img className="w-full h-full object-cover" alt={giohang.tensanpham} src={giohang.mausacHinhanh} />
                        </div>

                        {/* Thông tin + Giá */}
                        <div className="flex-1 min-w-0 relative">
                            <Link href={`/dienthoai/${giohang.dienthoaiId}/mausac/${giohang.mausacId}`}>
                                <h3 className="text-lg font-medium truncate text-black">
                                    {giohang.tensanpham} – {giohang.tenmausac}
                                </h3>
                            </Link>
                            {Number(giohang.phantramKhuyenmai) > 0 ? (
                                <div className="flex items-end gap-3 mt-1">
                                    <div className="text-red-500 font-bold text-xl">
                                        {priceAfter.toLocaleString('vi-VN')} đ{" "}
                                    </div>
                                    <div className="text-gray-500 ml-5 line-through">
                                        {formatCurrency(Number(giohang.mausacGiaban) || 0)}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-red-500 font-bold text-xl mt-1">
                                    {formatCurrency(priceAfter)}
                                </div>
                            )}
                        </div>


                        <div className='thongtinthongso-giohang'>
                            <div className='xoagiohang'>
                                <button className='xoagiohang-button' onClick={() => xoaGiohang(giohang.id)}><img src={xoaGihang.src} alt="Xoá" /></button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    aria-label="Giảm số lượng"
                                    onClick={() => dec(giohang)}
                                    disabled={isOut || isUpdating || qty <= 0}   // KHÓA nếu hết hàng
                                    className="w-8 h-8 rounded-md border flex items-center justify-center disabled:opacity-50"
                                >
                                    –
                                </button>

                                <input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={qty}
                                    onChange={(e) => onManualChange(giohang, e.target.value)}
                                    onBlur={() => {
                                        // Không gọi server nếu hết hàng (qty=0) — tuỳ nghiệp vụ của bạn
                                        if (toQty(giohang.soluong) > 0) onManualBlur(giohang);
                                    }}
                                    disabled={isOut}                            // KHÓA input nếu hết hàng
                                    className="w-12 h-8 text-center border rounded-md disabled:bg-gray-100"
                                />

                                <button
                                    aria-label="Tăng số lượng"
                                    onClick={() => inc(giohang)}
                                    disabled={isOut || isUpdating || qty >= 99} // KHÓA nếu hết hàng
                                    className="w-8 h-8 rounded-md border flex items-center justify-center disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* Bộ đếm số lượng (– 2 +) */}

                    </div>
                );
            })}


            {/* Tổng tiền của các sản phẩm đã chọn */}
            <div className="mt-6 p-4 rounded-lg bg-gray-50 space-y-2 giatinhtonghopsanphamdachon">
                <div className='mt-1 rounded-lg space-y-2 thongtinmuagiasanpham'>
                    {/* <div className="flex justify-between text-sm">
                        <span>Tổng trước KM:</span>
                        <span>{formatCurrency(totals.before)}</span>
                    </div> */}
                    <div className="flex justify-between text-black text-xl font-semibold">
                        <span className='text-xl'>Tạm tính :</span>
                        <span className="text-red-600">{formatCurrency(totals.after)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span className='text-base text-[#2d2d2dbe]'>Tiết kiệm:</span>
                        <span className='text-blue-600'>-{formatCurrency(totals.discount)}</span>
                    </div>
                </div>
                <div className='nutmuangay'>
                        <button
                            type="button"
                            onClick={handleCheckout}
                            className="w-full py-3 rounded-lg bg-black text-white hover:opacity-90 transition nut-h3-muangay"
                        >Mua ngay</button>
                </div>
            </div>

        </div>
    );
}
