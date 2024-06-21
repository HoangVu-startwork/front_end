import React from 'react'
import img from "../../../public/img/b2s-2024-1200x75_Special-Banner_B2S_06.gif";
import '@/components/css/Horizontal_css.css';
import Image from "next/image";

function Head_menu() {
  return (
    <div className='horizontal-banner'>
        <p className='horizontal-banner__item'>
          <Image src={img} className="logo" alt=''/>
        </p>
    </div>
  )
}

export default Head_menu