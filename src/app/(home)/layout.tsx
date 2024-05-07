import React from 'react'
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import image from "../../../public/img/l1.webp";
import img from "../../../public/img/r1.webp";
import Menu from "@/components/menu/Menu"

export default function Home({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <Navbar />
      <section className="content">
        <div id="page_loader">
          <div id="left" style={{ height: 800, width: 170 }}>
            <Image className="image" src={image} alt="Left Image" layout="responsive" width={180} height={800} />
          </div>
        </div>
        <div id="center">
          {children}
        </div>
        <div id="page_loader">
          <div id="right" style={{ height: 800, width: 170 }}>
            <Image className="img" src={img} alt="Right Image" layout="responsive" width={180} height={800} />
          </div>
        </div>
      </section>
    </div>
  )
}