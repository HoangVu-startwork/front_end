'use client'
import { useState, useEffect } from 'react';
import ServiceDienthoai from "../../service/dienthoai"
import '../css/sanphamdienthoai.css'
import Link from 'next/link'
import Left_dienthoai from "../../../public/img/left-curved-arrow.png"
import Right_dienthoai from "../../../public/img/left-curved.png"

export default function Dienthoai() {

    const fetchdienthoai = async () => {
        try {
            const data = await ServiceDienthoai.getDienthoai();
            console.log("User info:", data);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const fetchThuonghieu = async () => {
        try {
            const data = await ServiceDienthoai.getThuonghieu();
            console.log("User:", data);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    useEffect(() => {

        fetchdienthoai();
        fetchThuonghieu();

    }, []);

    const ok = [
        {
            id_danhmuc: 1,
            id_tensanpham: '1',
            danhmuc: 'Apple',
        },
        {
            id_danhmuc: 2,
            id_tensanpham: '1',
            danhmuc: 'Samsung',
        },
        {
            id_danhmuc: 3,
            id_tensanpham: '1',
            danhmuc: 'Xiaomi',
        },
        {
            id_danhmuc: 4,
            id_tensanpham: '1',
            danhmuc: 'OPPO',
        },
        {
            id_danhmuc: 5,
            id_tensanpham: '1',
            danhmuc: 'Vivo',
        },
        {
            id_danhmuc: 6,
            id_tensanpham: '1',
            danhmuc: 'realme',
        },
        {
            id_danhmuc: 7,
            id_tensanpham: '1',
            danhmuc: 'Nokia',
        },
        {
            id_danhmuc: 8,
            id_tensanpham: '1',
            danhmuc: 'ASUS',
        },
        {
            id_danhmuc: 9,
            id_tensanpham: '1',
            danhmuc: 'Tecno',
        }
    ]
    const SlickArrowLeftdienthoai = ({ currentSlide, slideCount, ...props }) => (
        <img src={Left_dienthoai} alt="prevArrow" {...props} className="SlickArrowLeft" />
    );

    const SlickArrowRightdienthoai = ({ currentSlide, slideCount, ...props }) => (
        <img src={Right_dienthoai} alt="nextArrow" {...props} className="SlickArrowRight" />
    );
    const sliderSettings_dienthoai = {
        initialSlide: 0,
        autoplay: true,
        centerMode: false,
        swipeToSlide: true,
        pauseOnDotsHover: true,
        arrows: true,
        rows: 2,
        draggable: true,
        slidesToShow: 5,
        shift: 10,
        dots: false,
        infinite: true,
        wheel: true,
        speed: 500,
        prevArrow: <SlickArrowLeftdienthoai />,
        nextArrow: <SlickArrowRightdienthoai />,
    };
    return (
        <div>
            <div className='sanpham_danhmuc'>
                <div className='sanpham_danhmuc_tensanpham text-2xl' >ĐIỆN THOẠI</div>
                <div className='block_featured_product'>
                    {/* {ok.map((slide) =>
                        <Link href={'info1'}>
                            <div className='sanpham_danhmuc_loaidanhmuc'>{slide.danhmuc}</div></Link>
                    )} */}
                    <Link href={'home'}>
                        <div className='sanpham_danhmuc_loaidanhmuc'>Xem tất cả</div></Link>
                </div>
            </div>
        </div>
    )
}
