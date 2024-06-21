import React from 'react'
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import image from "../../../../public/img/l1.webp";
import img from "../../../../public/img/r1.webp";
import Menu from "@/components/menu/Menu"
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"


function page() {
  return (
    <div>
        <div className='mt-5'>
            <Menu/>
        </div>
        <div>
            <Head/>
        </div>
        <div>
            <Menuphone/>
        </div>
      {/* <section className="content">
        <div id="page_loader">
          <div id="left" style={{ height: 800, width: 170 }}>
            <Image className="image" src={image} alt="Left Image" layout="responsive" width={180} height={800} />
          </div>
        </div>
        <div id="center" className='mt-5'>
            <Menu/>
        </div>
        <div id="page_loader">
          <div id="right" style={{ height: 800, width: 170 }}>
            <Image className="img" src={img} alt="Right Image" layout="responsive" width={180} height={800} />
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default page