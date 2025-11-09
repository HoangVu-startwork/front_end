'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import "../css/payment.css";
import Auth from "@/service/auth"
import AddressPickerNoURL from "@/components/map/AddressPickerInline"
import Thanhtoan from "@/service/thanhtoan"

type Addr = {
    province?: string; district?: string; ward?: string; street?: string;
    lat?: number; lng?: number;
};

const composeAddress = (a: Addr) =>
    [a.street, a.ward, a.district, a.province].filter(Boolean).join(', ');


type CheckoutItem = {
    giohangId: number | string | null;
    dienthoaiId?: number | string;
    mausacId?: number | string;
    tensanpham?: string;
    tenmausac?: string;
    hinhanh?: string;
    quantity: number;
    giasanphammau: number;
    khuyenmaisanpham: number;
    price: number;
    lineTotal: number;
};

interface User {
    id: string;
    username: string;
    email: string;
    firsName: string;
    lastName: string;
    phone: string;
    ngaysinh: string;
    tongtien: number;
    hangmuc: string;
    dob: string;
    roles: Response[];
}

export default function PaymentInfoPage() {
    const [items, setItems] = useState<CheckoutItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [addr, setAddr] = useState<Addr>({});
    const [diachi, setDiachi] = useState('');
    const [useruudaimuahang, setUseruudaimuahang] = useState<any[]>([]);
    const [ghichu, setGhichu] = useState('');
    const [generalerror ,setGeneralError] = useState('');

    const handleAddrChange = (payload: Partial<Addr>) => {
        const merged = { ...addr, ...payload };
        setAddr(merged);
        setDiachi(composeAddress(merged));
    };

    const fetchTokenInfo = async () => {
        try {
            const data = await Auth.gettoken();
            console.log(data.result)
            setUser(data.result)
            setUseruudaimuahang(data.result.uudaimuahang)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    useEffect(() => {
        fetchTokenInfo();
        try {
            const raw = localStorage.getItem('hn_checkout_selection');
            if (raw) {
                const parsed: CheckoutItem[] = JSON.parse(raw);
                setItems(parsed);
            }
        } catch (e) {
            console.error('Không đọc được dữ liệu checkout:', e);
        }
    }, []);



    // useMemo là hook của React.
    // Nó ghi nhớ (memoize) kết quả tính toán, chỉ chạy lại khi giá trị trong deps ([items]) thay đổi.
    // const totals = useMemo(() => {

    //     // items là mảng sản phẩm đã chọn.
    //     // reduce lặp qua từng phần tử it trong items.
    //     // Với mỗi sản phẩm: cộng thêm it.price * it.quantity (giá × số lượng).
    //     // acc (accumulator) là biến cộng dồn. Bắt đầu từ 0.
    //     // Kết quả cuối cùng là tổng số tiền tất cả sản phẩm.
    //     const sum = items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    //     return {
    //         // count: lại dùng reduce, nhưng lần này chỉ cộng số lượng sản phẩm (quantity).
    //         // → Ví dụ có 3 sản phẩm, số lượng lần lượt 2, 1, 5 → count = 8.
    //         // amount: chính là sum vừa tính ở trên → tổng số tiền.
    //         count: items.reduce((acc, it) => acc + it.quantity, 0),
    //         amount: sum
    //     };
    // }, [items]);

    const totals = useMemo(() => {
        // tổng gốc
        const original = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

        const applied = (useruudaimuahang ?? []).filter(Boolean);

        // totalFlat: cộng tất cả giakhuyenmai (chỉ giá > 0)
        const totalFlat = applied
            .map((u) => Number(u.giakhuyenmai ?? 0))
            .filter((v) => !isNaN(v) && v > 0)
            .reduce((a, b) => a + b, 0);

        // maxPct: lấy phần trăm lớn nhất (backend đang dùng max)
        const maxPct = applied
            .map((u) => {
                const p = Number(u.phantramkhuyenmai ?? 0);
                return isNaN(p) ? 0 : p;
            })
            .reduce((a, b) => Math.max(a, b), 0);

        // tiền giảm do phần trăm (áp dụng trên tổng gốc)
        const percentAmount = Math.max(0, (original * maxPct) / 100);

        // tổng sau: áp % trước rồi trừ flat
        let final = original - percentAmount - totalFlat;

        let tietkiem = percentAmount + totalFlat;
        if (final < 0) final = 0;

        return {
            count: items.reduce((acc, it) => acc + it.quantity, 0),
            original,
            maxPct,
            percentAmount,
            totalFlat,
            amount: final,
            tietkiem,
            applied,
        };
    }, [items, useruudaimuahang]);


    const giohang = useMemo(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("hn_checkout_selection") || "null");
        }
        return null;
    }, []);


    const fetchdathang = async () => {
        let products: any[] = [];

        if (Array.isArray(giohang)) {
            products = giohang;
        } else if (giohang?.products && Array.isArray(giohang.products)) {
            products = giohang.products;
        }

        const giohangIds = products.map((p: any) => p.giohangId).join(",");
        console.log("Danh sách giohangId:", giohangIds);

        if (!diachi || !ghichu) {
            setGeneralError("Vui lòng điền đầy đủ thông tin liên hệ và địa chỉ và ghi chú.");
            return;
        }

        try {
            const emails = user?.email;
            const tongtien = totals.amount;
            const itemsPayload = products.map((p: any) => ({
                giohangId: p.giohangId,
            }));
            const giohangIdsString = products.map((p: any) => p.giohangId).join(',');
            console.log(emails, diachi, ghichu, tongtien, giohangIdsString);
            const datadathang = await Thanhtoan.postGiohang(emails, diachi, ghichu, tongtien, giohangIdsString);
            console.log(datadathang)
        } catch {

        }
    }
    if (!items.length) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h1>
                <p className="mb-4">Chưa có sản phẩm nào. Vui lòng quay lại giỏ hàng để chọn sản phẩm.</p>
                <Link
                    href="/gio-hang"
                    className="inline-block px-4 py-2 rounded-md bg-black text-white"
                >
                    Quay lại giỏ hàng
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto w-4xl p-4 space-y-6 payment-thongtin">
            {generalerror && <div className="success-message">{generalerror}</div>}
            <div className='flex thongtin-payment-info'>
                <div className='thongtin-payment-info-link'>
                    <Link href="/giohang" className="px-4 py-2 rounded-md border">
                        Quay lại giỏ hàng
                    </Link>
                </div>
                <div className='thongtin-payment-info-h1'>
                    <h1 className="text-2xl font-semibold text-black text-center">Thông tin</h1>
                </div>
            </div>
            <div className="rounded-lg ">
                {items.map((it, idx) => (
                    <div key={idx} className="khungsanpham-thongtin flex items-center gap-5 p-4 border-b mt-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                            {it.hinhanh ? (
                                <img src={it.hinhanh} alt={`${it.tensanpham} - ${it.tenmausac}`} className="w-full h-full object-cover" />
                            ) : null}
                        </div>

                        <div className='tongfront-payment-info'>
                            <div className='font-normal text-xl truncate text-black'>{it.tensanpham} – {it.tenmausac}</div>
                            <div className='mt-3 flex thongtinsoluonggiasanpham'>
                                <div className='giasanphamkhuyenmai'>
                                    {it.khuyenmaisanpham > 0 ? (
                                        <div className="flex items-end gap-3 mt-1">
                                            <div className="text-red-500 font-bold text-xl">
                                                {new Intl.NumberFormat('vi-VN').format(it.price)}
                                            </div>
                                            <div className="text-gray-500 ml-2 line-through">
                                                {new Intl.NumberFormat('vi-VN').format(it.giasanphammau)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-red-500 font-bold text-xl mt-1">
                                            {new Intl.NumberFormat('vi-VN').format(it.giasanphammau)}
                                        </div>
                                    )}
                                </div>
                                <div className='text-black text-lg'>
                                    <p>Số lượng: {it.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='thongtintaikhoan'>
                <h2 className='text-xl text-stone-900'>THÔNG TIN KHÁCH HÀNG</h2>
                <div className='fromthongtinuser mt-2'>
                    <div className='taikhoannameuser'>
                        <div className='username_hangmuc'>
                            <div className='username_pay text-lg text-black font-semibold'>
                                {user?.username || "Chưa có tên"}
                            </div>
                            <div className='hangmuc_pay text-base text-red-600 font-bold'>
                                {user?.hangmuc || "Chưa có hạng mục"}
                            </div>
                        </div>
                        <div className='sdt_pay text-lg text-black'>
                            {user?.phone || "Chưa có số điện thoại"}
                        </div>
                    </div>
                    <div className='taikhoanemail mt-3'>
                        <h3 className='text-sm'>EMAIL</h3>
                        <div className='text-lg text-black mt-1 border-b-2 border-zinc-600'>{user?.email || "Email tài khoản"}</div>
                    </div>
                </div>
            </div>
            <div className='thongtinnhanhang'>
                <h2 className='text-xl text-stone-900'>THÔNG TIN KHÁCH HÀNG</h2>
                <div className='fromdiachi mt-2'>
                    <AddressPickerNoURL onChange={handleAddrChange} />
                    {/* Biến diachi đã tổng hợp sẵn để submit backend / hiển thị */}
                    <div className="mt-5 rounded-xl mb-3 bg-white text-sm">
                        <div><b>Địa chỉ (gộp):</b> {diachi || '—'}</div>
                    </div>
                    <div className='mt-4'>
                        <h4 className='text-black text-sm font-semibold'>Ghi chú</h4>
                        <input id="username" type="text" onChange={(e) => setGhichu(e.target.value)} placeholder='Nhập ghi chú khác' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                </div>
            </div>
            <div className='thongtinnhanhang mt-3'>
                <h2 className='text-xl text-stone-900'>ƯU ĐÃI KHÁCH HÀNG</h2>
                <div className='thongtinuudaiuser mt-3'>
                    {totals.applied.length > 0 && (
                        <div className="mt-2 text-sm">
                            <div className="text-lg text-red-600 font-extrabold ">Ưu đãi áp dụng:</div>
                            {totals.maxPct == 0 && (
                                <div className="text-base text-black mt-1">
                                    Hiện chưa có ưu đãi mua hàng đặc biệt cho hạng thành viên {user?.hangmuc || "Chưa có hạng mục"}
                                </div>
                            )}
                            <ul className="list-disc text-lg text-black pl-5">
                                {totals.applied
                                    .filter(u => u && (Number(u.phantramkhuyenmai || 0) > 0 || Number(u.giakhuyenmai || 0) > 0))
                                    .map((u) => {
                                        const pct = Number(u.phantramkhuyenmai ?? 0);
                                        const flat = Number(u.giakhuyenmai ?? 0);
                                        return (
                                            <li key={u.id ?? JSON.stringify(u)}>
                                                {u.noidunguudai ?? "Ưu đãi"}{" "}
                                                {/* {pct > 0 ? `- ${pct}%` : ""}{" "} */}
                                                {flat > 0 ? `- ${new Intl.NumberFormat('vi-VN').format(flat)} đ` : ""}{" "}
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
                    {totals.maxPct > 0 && (
                        <div className='from-thomgtinuudaikhachang mt-4'>

                            <div className='from-thomgtinuudaikhachang-1'>
                                <div className='giagoc'>
                                    {totals.original !== totals.amount && (
                                        <div className="text-lg font-extrabold text-black mt-2">
                                            Giá gốc:
                                        </div>
                                    )}
                                </div>
                                <div className='giakhuyenmai'>
                                    {totals.maxPct > 0 && (
                                        <div className="text-lg font-extrabold text-black mt-2">
                                            Giảm {totals.maxPct}%:
                                        </div>
                                    )}
                                </div>
                                <div className='giatrutructiep'>
                                    {totals.totalFlat > 0 && (
                                        <div className="text-lg font-extrabold text-black mt-2">
                                            Giảm tiền (ưu đãi cố định):
                                        </div>
                                    )}
                                </div>
                                <div className='giatrutructiep'>
                                    {(totals.totalFlat > 0 || totals.maxPct > 0) && (
                                        <div className="text-lg font-extrabold text-black mt-1">
                                            Tổng thanh toán
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='from-thomgtinuudaikhachang-2'>
                                <div className='giagoc'>
                                    {totals.original !== totals.amount && (
                                        <div className="text-lg text-red-600 font-medium mt-2 text-right">
                                            {new Intl.NumberFormat('vi-VN').format(totals.original)} VNĐ
                                        </div>
                                    )}
                                </div>
                                <div className='giakhuyenmai'>
                                    {totals.maxPct > 0 && (
                                        <div className="text-lg text-green-700 font-medium mt-2 text-right">
                                            - {new Intl.NumberFormat('vi-VN').format(Math.round(totals.percentAmount))} VNĐ
                                        </div>
                                    )}
                                </div>
                                <div className='giatrutructiep'>
                                    {totals.totalFlat > 0 && (
                                        <div className="text-lg text-green-700 font-medium mt-2 text-right">
                                            - {new Intl.NumberFormat('vi-VN').format(Math.round(totals.totalFlat))} VNĐ
                                        </div>
                                    )}
                                </div>
                                <div className='giatrutructiep'>
                                    {(totals.totalFlat > 0 || totals.maxPct > 0) && (
                                        <div className="text-lg font-extrabold text-red-600 mt-2">
                                            {new Intl.NumberFormat('vi-VN').format(totals.amount)} VNĐ
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {totals.tietkiem == 0 && (
                <div className='from-thanhtoansanpham mt-12 h-10'>
                </div>
            )}
            {totals.tietkiem > 0 && (
                <div className='from-thanhtoansanpham mt-12 h-16'>
                </div>
            )}
            <div className="fromthanhtoan rounded-lg">
                <div className="flex justify-between text-xl mt-2 ">
                    <span className='text-black'>Tổng thanh toán</span>
                    <span className="font-bold text-red-600">
                        {new Intl.NumberFormat('vi-VN').format(totals.amount)} VNĐ
                    </span>
                </div>
                {totals.tietkiem > 0 && (
                    <div className="text-base font-extrabold text-red-600 mt-1 text-right">
                        Tiết kiệm : {new Intl.NumberFormat('vi-VN').format(totals.tietkiem)} VNĐ
                    </div>
                )}
                <button
                    className="px-4 mt-3 w-full py-2 rounded-md bg-red-700 text-white hover:opacity-90 "
                    onClick={fetchdathang}
                >
                    Đặt hàng
                </button>
            </div>

        </div>
    );
}
