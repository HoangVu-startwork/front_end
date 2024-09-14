import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Danhmuc from "../../service/danhmuc"
import Link from 'next/link'
import '../css/menu.css'
import '../css/nhucaudienthoai.css'

export default function Nhucaudienthoai() {

    const [nhucaudienthoai, setNhucaudienthoai] = useState([]);

    const getnhucaudienthoai = async () => {
        try {
            const nhucaudienthoai = await Danhmuc.getAllnhucau();
            setNhucaudienthoai(nhucaudienthoai.result)
        } catch (error) {
            console.error("Error get nhu cầu điện thoại")
        }
    }
    useEffect(() => {
        getnhucaudienthoai();
    }, [])

    const sliderSettings_linhkienmaytinh = {
        initialSlide: 9,
        autoplay: true,
        centerMode: false,
        swipeToSlide: true,
        pauseOnDotsHover: true,
        arrows: true,
        rows: 1,
        draggable: true,
        slidesToShow: 9,
        shift: 9,
        dots: false,
        infinite: true,
        wheel: true,
        speed: 500,
    };

    return (
        <div className='container_menu'>
            <div className='linhkienmaytinh'>
                <div className='linhkienmaytinh_kung'>
                    <Slider {...sliderSettings_linhkienmaytinh}>
                        {nhucaudienthoai.map((card) => {
                            return (
                                <div key="{index}" className="block-phukien">
                                    <Link href={'home'}>
                                        <div className="img-linhkienmaytinh" style={{ backgroundImage: `url(${card.hinhanh})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundColor: `${card.mausac}` }}><div className="block-phukien-text">{card.tennhucau}</div></div>
                                    </Link>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
