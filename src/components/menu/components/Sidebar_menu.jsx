import React from 'react'
import '@/components/css/center_menu.css';
import Link from 'next/link';
import Image from "next/image";
import anh1 from '../../../../public/img/22490-fold.webp'
import anh2 from '../../../../public/img/airpod2-259.webp'
import anh3 from '../../../../public/img/RightBanner_690x300_ASUS-VIVOBOOK.webp'
import '@/components/css/Post_menu_dienthoai.css'
const Sidebar_menu = () => {
    const slidesData = [
    {
        id: 1,
        img: anh1,
        
    },
    {
        id: 2,
        img: anh2,

    },
    {
        id: 3,
        img: anh3,
    }
];
  return (
    <div className='right-banner'>
            <Link className='right-banner__item' href="#">
                {/* <img className='right-banner__img' /> */}
                {slidesData.map((slide) =>
    <div key={slide.id}>
        <Image className='right-banner__img' src={slide.img} alt=''/>
    </div>
)}
            </Link>
    </div>
  )
}

export default Sidebar_menu