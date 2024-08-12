'use client'
import React from 'react'
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import image from "../../public/img/l1.webp";
import img from "../../public/img/r1.webp";
import Menu from "@/components/menu/Menu";
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Dienthoai"

export default function Home() {
  return (
    <div>
       <div className='mt-5'>
            <Menu/>
        </div> 
    </div>

  );
}
