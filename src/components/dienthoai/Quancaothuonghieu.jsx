'use client'
import { useState, useEffect } from 'react';
import ServiceDienthoai from "../../service/dienthoai"
import '../css/thuonghieudienthoai.css'
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Left_dienthoai from "../../../public/img/left-curved-arrow.png"
import Right_dienthoai from "../../../public/img/left-curved.png"

export default function Quancaothuonghieu() {

    const [data, setData] = useState([]);
    const [lastImage, setLastImage] = useState([]);

    const fetchdienthoai = async () => {
        try {
            const data = await ServiceDienthoai.getDienthoai();
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const fetchThuonghieu = async () => {
        try {
            const data = await ServiceDienthoai.getThuonghieu();
            setData(data)
            const sortedData = [...data].sort((a, b) => b.id - a.id);
            setLastImage(sortedData);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    useEffect(() => {

        fetchdienthoai();
        fetchThuonghieu();

    }, []);

    const sliderSettings_dienthoai = {
        initialSlide: 0,
        autoplay: true,
        centerMode: false,
        swipeToSlide: true,
        pauseOnDotsHover: true,
        rows: 1,
        draggable: true,
        slidesToShow: 1,
        shift: 10,
        dots: true,
        dotsClass: 'slick-dots1',
        infinite: true,
        wheel: true,
        speed: 500,
    };
    const sliderSettings_quancao = {
        initialSlide: 0,
        autoplay: true,
        centerMode: false,
        swipeToSlide: true,
        pauseOnDotsHover: true,
        rows: 1,
        draggable: true,
        slidesToShow: 1,
        shift: 10,
        dots: true,
        dotsClass: 'slick-dots1',
        infinite: true,
        wheel: true,
        speed: 500,
    };
    return (
        <div className='danhmuc_dienthoai'>
            {/* <section className="content_danhmuc_dienthoai">
                <div id="center_danhmuc_dienthoai">
                    <div className='center_quancao_dienthoai'>
                        <div className='center_quancao_dienthoai_quan'>
                            <Slider {...sliderSettings_dienthoai}>
                                {data.map((slide) =>
                                    <Link href={'home'}><img src={`${slide.hinhanh}`} alt='' /></Link>
                                )}
                            </Slider>
                        </div>
                        <div className='center_quancao_dienthoai_quan02'>
                            <Slider {...sliderSettings_quancao}>
                                {lastImage.map((slide) =>
                                    <Link href={'home'}><img src={`${slide.hinhanh}`} alt='' /></Link>
                                )}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section> */}
     
        </div>
    )
}
