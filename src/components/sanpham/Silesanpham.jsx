'use client'
import React, { useEffect, useState, useLayoutEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider from "react-slick";
import Link from 'next/link';
import _debounce from 'lodash/debounce';
import ServiceDienthoai from "@/service/dienthoai";
import { useParams } from "next/navigation";
import './css/silesanpham.css'



const Silesanpham = () => {
  const { id, mausacId} = useParams()
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [windowWidth, setWindowWidth] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setData] = useState([]);
  const [firstSlideId, setFirstSlideId] = useState(null);
  const [soluonghinhanhduyet, setsoluonghinhanhduyet] = useState(null);

  const fetchdienthoai = async () => {
    try {
      const data = await ServiceDienthoai.getChitietdienthoai(id, mausacId);
      setData(data.hinhanhduyet);
      setsoluonghinhanhduyet(data.hinhanhduyet.length)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {

    const handleResize = _debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100); // 100ms debounce delay for resize

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    fetchdienthoai();
  }, [slider1, slider2, id, mausacId]);

  useEffect(() => {
    if (slidesData.length > 0 && slider1) {
      // Lấy ID của slide đầu tiên khi slider đã được khởi tạo
      const firstSlideId = slidesData[0].id;
      setFirstSlideId(firstSlideId);
    }
  }, [slidesData, slider1]);

  const handleSlideChange = current => {
    setCurrentSlide(current);
  };

  const settingsMain = {
    slidesToShow: 1,
    autoplaySpeed: 9000,
    arrows: false,
    fade: true,
    autoplay: true,
    initialSlide: 0,
    infinite: true,
    dots: windowWidth < 521,
    dotsClass: "slick-dots custom-indicator",
    afterChange: handleSlideChange,
    customPaging: (index) => (
      <div className={currentSlide === index ? "custom-dot green-dot" : "custom-dot"}></div>
    ),
  };

  const settingsThumbs = {
    slidesToShow: soluonghinhanhduyet || 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    infinite: true,
    autoplaySpeed: 9000,
    asNavFor: nav1,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    dotsClass: "slick-dots custom-indicator",
    initialSlide: 0,
  };

  return (
    <div className="Canter_sanpham_css">
      <Slider className='Canter_menu_css_img'
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => setSlider1(slider)}
      >
        {slidesData.map((slide, index) =>
          <div key={index}>
            <Link href="#">
              <img className='img' src={slide} alt='' />
            </Link>
          </div>
        )}
      </Slider>
      <Slider className='Canter_sanpham_css_label center-menu-slider'
        {...settingsThumbs}
        asNavFor={nav1}
        ref={slider => setSlider2(slider)}
        style={{ overflowX: 'auto' }} 
      >
        {slidesData.map((slide, index) =>
          <div key={index} className='label_css'><img className='img' src={slide} alt='' /></div>

        )}
      </Slider>
    </div>
  );
};

export default Silesanpham;