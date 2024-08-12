import React, { useEffect, useState } from 'react';
import '@/components/css/center_menu.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/components/css/Post_menu_dienthoai.css';
import Image from "next/image";
import Slider from "react-slick";
import Link from 'next/link';
import _debounce from 'lodash/debounce';
import ServiceDienthoai from "../../../service/dienthoai"

import anh1 from '../../../../public/img/s24-sliding-pha-gia.webp';
import anh2 from '../../../../public/img/rog6-batman-sliding.webp';
import anh3 from '../../../../public/img/asus unwrap.webp';
import anh4 from '../../../../public/img/may-chieu-sliding-new.webp';
import anh5 from '../../../../public/img/watch-gt-3-proo.webp';

const Center_menu = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [slider1Ready, setSlider1Ready] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


  const [slidesData, setData] = useState([]);
  const [lastImage, setLastImage] = useState([]);

  const fetchdienthoai = async () => {
      try {
          const data = await ServiceDienthoai.getThuonghieumenu();
          setData(data)
      } catch (error) {
          console.error("Error fetching token info:", error);
      }
  };

  useEffect(() => {
    fetchdienthoai();
    const handleResize = _debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100); // 100ms là thời gian chờ sau khi kích thước cửa sổ thay đổi

    window.addEventListener('resize', handleResize);

    // Set initial window width
    handleResize();

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  

  // const slidesData = [
  //   {
  //     id: 1,
  //     img: anh1,
  //     label: 'Z FLIP4|FOLD4',
  //     text: 'Hot sale giá sốc'

  //   },
  //   {
  //     id: 2,
  //     img: anh2,
  //     label: 'IPHONE 14 PRO MAX',
  //     text: 'Đủ màu giá tốt'
  //   },
  //   {
  //     id: 3,
  //     img: anh3,
  //     label: 'WATCH GT3 PRO',
  //     text: 'Siêu sale đón tết'
  //   },
  //   {
  //     id: 4,
  //     img: anh4,
  //     label: 'MÁY CHIẾU BEECUBE',
  //     text: 'Hàng xịn giá tốt'
  //   },
  //   {
  //     id: 5,
  //     img: anh5,
  //     label: 'ROG 6 BATMAN',
  //     text: 'Hàng xịn giá hời',
  //   },
  //   {
  //     id: 6,
  //     img: anh5,
  //     label: 'ROG 6 BATMAN 2',
  //     text: 'Hàng xịn giá hời',
  //   },
  // ];


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
    dotsClass: windowWidth < 521 ? "slick-dots custom-indicator" : "slick-dots custom-indicator",
    afterChange: handleSlideChange,
    customPaging: (index) => {
      return (
        <div className={currentSlide === index ? "custom-dot green-dot" : "custom-dot"}></div>
      );
    }
  };

  const settingsThumbs = {
    slidesToShow: windowWidth <= 700 ? 3 : 5, // Số slide tối đa cần hiển thị dựa trên kích thước màn hình
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
            <div>
              {dots}
            </div>
          ),
          customPaging: function (i) {
            return (
              <div>
                {slidesData[i].id <= 5 && (
                  <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
                )}
              </div>
            );
          }
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
          dotsClass: "slick-dots custom-indicator ",
          initialSlide: 0,
          appendDots: (dots) => (
            <div>
              {dots}
            </div>
          ),
          customPaging: function (i) {
            return (
              <div>
                {slidesData[i].id <= 3 && (
                  <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
                )}
              </div>
            );
          }
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 5,
          appendDots: (dots) => (
            <div>
              {dots}
            </div>
          ),
          customPaging: function (i) {
            return (
              <div>
                {slidesData[i].id <= 5 && (
                  <div key={slidesData[i].id} className='label_css'>{slidesData[i].label} <br /> {slidesData[i].text}</div>
                )}
              </div>
            );
          }
        }
      },
    ]
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const handleAutoplayStart = () => {
    setAutoplayActive(true);
  };

  const handleBeforeChange = () => {
    setAutoplayActive(false);
  };

  useEffect(() => {
    const slider = document.querySelector('.slick-slider');

    slider.addEventListener('autoplayStart', handleAutoplayStart);
    slider.addEventListener('beforeChange', handleBeforeChange);

    return () => {
      slider.removeEventListener('autoplayStart', handleAutoplayStart);
      slider.removeEventListener('beforeChange', handleBeforeChange);
    };
  }, []);

  return (
    <>
    <div className="Canter_menu_css">
      <Slider className='Canter_menu_css_img'
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => (setSlider1(slider))}
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
        ref={slider => (setSlider2(slider))}
      >
        {slidesData.filter((slide) => slide.id <= (windowWidth <= 540 ? 5 : windowWidth <= 720 ? 3 : 5)).map((slide) => (
          <div key={slide.id} className='label_css'>{slide.label} <br /> {slide.text}</div>
        ))}
      </Slider>
    </div>
    </>
  )
}

export default Center_menu
