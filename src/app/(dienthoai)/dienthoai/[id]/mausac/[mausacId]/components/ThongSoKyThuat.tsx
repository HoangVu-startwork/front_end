import React from "react";

interface ThongSoKyThuatProps {
    data: any;
}

const ThongSoKyThuat: React.FC<ThongSoKyThuatProps> = ({ data }) => {
    return (
        <div className='mb-auto flex-col items-center justify-center text-thongsokythuat-dilay-thongso'>
            <div className='manghinh'>
                <div className='manghinhp'>Màng hình</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Kích thước màn hình</div>
                        <div className="with-dt text-slate-900 break-words">{data?.thongsokythuats.kichthuocmanhinh}</div>
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Công nghệ màn hình</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congnghemanghinh || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Độ phân giải màn hình</div>
                        <div className="with-dt text-slate-900 break-words">{data?.thongsokythuats.dophangiai}</div>
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Tính năng màn hình</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnangmanghinh || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Tần số quét</div>
                        <div className="with-dt text-slate-900 break-words">{data?.thongsokythuats.tansoquet}</div>
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Kiểu màn hình</div>
                        <div className="with-dt text-slate-900 break-words">{data?.thongsokythuats.kieumanhinh}</div>
                    </div>
                </div>
            </div>
            <div className='manghinh mt-3'>
                <div className='manghinhp'>Camera sau</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Camera sau</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.camerasau || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Quay video</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.quayvideo || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Tính năng camera</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnagcamera || "" }}
                        />
                    </div>
                </div>
            </div>
            <div className='manghinh mt-3'>
                <div className='manghinhp'>Camera trước</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Camera trước</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.cameratruoc || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Quay video trước</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.quayvideotruoc || "" }}
                        />
                    </div>
                </div>
            </div>
            <div className='manghinh mt-3'>
                <div className='manghinhp'>Camera trước</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Camera trước</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.cameratruoc || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Quay video trước</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.quayvideotruoc || "" }}
                        />
                    </div>
                </div>
            </div>
            <div className='manghinh mt-3'>
                <div className='manghinhp'>Giao tiếp & kết nối</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Công nghệ NFC</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congghenfc || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Thẻ SIM</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.thesim || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Hỗ trợ mạng</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.hotromang || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">GPS</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.gps || "" }}
                        />
                    </div>
                </div>
            </div>
            <div className='manghinh mt-3'>
                <div className='manghinhp'>Thiết kế & Trọng lượng</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Chất liệu mặt lưng</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.chatlieumatlung || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Chất liệu khung viền</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.chatlieukhungvien || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>RAM & lưu trữ</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Dung lượng RAM</div>
                        <div className="with-dt text-slate-900 break-words">{data?.ram} GB</div>
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Bộ nhớ trong</div>
                        <div className="with-dt text-slate-900 break-words">
                            {data?.bonho} {data?.bonho === 1 || data?.bonho === 2 ? "TB" : "GB"}
                        </div>
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Thông số khác</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Tương thích</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tuongthich || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Chỉ số kháng nước, bụi</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.chisokhangnuocbui || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Công nghệ âm thanh</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.jacktainghe || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Công nghệ - Tiện ích</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.cambienvantai || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Pin & công nghệ sạc</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Công nghệ sạc</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congnghesac || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Cổng sạc</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congsac || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Tiện ích khác</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Tính năng đặc biệt</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnangdacbiet || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Vi xử lý & đồ họa</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Chipset</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.chipset || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">GPU</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.gpu || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Bộ xử lý & Đồ họa</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Loại CPU</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.loaicpu || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">GPU</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.gpu || "" }}
                        />
                    </div>
                </div>
            </div>

            <div className='manghinh mt-3'>
                <div className='manghinhp'>Kích thước & Trọng lượng</div>
                <div className='thongtinkt mt-1'>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Kích thước</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.kichthuoc || "" }}
                        />
                    </div>
                    <div className="thongtinktmh w-full bg-gray-100 whitespace-no-wrap border-b border-gray-300">
                        <div className="with-kt text-slate-900">Trọng lượng</div>
                        <div
                            className="with-dt text-slate-900 break-words"
                            dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.trongluong || "" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongSoKyThuat;
