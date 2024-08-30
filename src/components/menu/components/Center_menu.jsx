import React, { useEffect, useState, useLayoutEffect } from 'react';
import '@/components/css/center_menu.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/components/css/Post_menu_dienthoai.css';
import Image from "next/image";
import Slider from "react-slick";
import Link from 'next/link';
import _debounce from 'lodash/debounce';
import ServiceDienthoai from "../../../service/dienthoai";

const Center_menu = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [windowWidth, setWindowWidth] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setData] = useState([]);
  const [firstSlideId, setFirstSlideId] = useState(null);

  const fetchdienthoai = async () => {
    try {
      const data = await ServiceDienthoai.getThuonghieumenu();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {
    fetchdienthoai();

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
  }, [slider1, slider2]);

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
    slidesToShow: windowWidth <= 700 ? 3 : 5,
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
    responsive: [
      {
        breakpoint: 720.5,
        settings: {
          slidesToShow: 5,
          appendDots: (dots) => (
            <div>{dots}</div>
          ),
          customPaging: (i) => (
            <div>
              {slidesData[i]?.id <= 5 && (
                <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
              )}
            </div>
          )
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
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
          appendDots: (dots) => (
            <div>{dots}</div>
          ),
          customPaging: (i) => (
            <div>
              {slidesData[i]?.id <= 3 && (
                <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
              )}
            </div>
          )
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 5,
          appendDots: (dots) => (
            <div>{dots}</div>
          ),
          customPaging: (i) => (
            <div>
              {slidesData[i]?.id <= 5 && (
                <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
              )}
            </div>
          )
        }
      },
    ]
  };

  return (
    <div className="Canter_menu_css">
      <Slider className='Canter_menu_css_img'
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => setSlider1(slider)}
      >
        {slidesData.filter((slide) => slide.id <= (windowWidth <= 540 ? 5 : windowWidth <= 720 ? 3 : 5)).map((slide) => (
          <div key={slide.id}>
            <Link href="#">
              <img className='img' src={`${slide.hinhanh}`} alt='' />
            </Link>
          </div>
        ))}
      </Slider>
      <Slider className='Canter_menu_css_label center-menu-slider'
        {...settingsThumbs}
        asNavFor={nav1}
        ref={slider => setSlider2(slider)}
      >
        {slidesData.filter((slide) => slide.id <= (windowWidth <= 540 ? 5 : windowWidth <= 720 ? 3 : 5)).map((slide) => (
          <div key={slide.id} className='label_css'>{slide.label} <br /> {slide.text}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Center_menu;