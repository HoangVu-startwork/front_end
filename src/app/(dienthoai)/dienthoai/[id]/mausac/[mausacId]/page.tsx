'use client'
import { useState, useEffect } from 'react';
import Menu from "@/components/menu/Menu"
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Quancaothuonghieu"
import Danhmucdienthoai from "@/components/dienthoai/Danhmucdienthoai"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import '@/components/css/menu.css'
import '@/components/css/chitietdienthoai.css'
import Slider from "react-slick";
import ServiceDienthoai from "@/service/dienthoai";
import Sile from "@/components/sanpham/Silesanpham"
type Params = {
    id: string;
    mausacId: string;
};


function page() {
    const params = useParams() as Params;

    useEffect(() => {
        console.log('ID:', params.id);
        console.log('Màu sắc ID:', params.mausacId);
    }, [params.id, params.mausacId]);

  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   console.log("token - api eee 00000000 -- " + token);
  
  //   if (token && token.trim() !== "") {
  //     fetchTokenInfo();
  //   }
  // }, []);


  return (
    <div>
        <div id="content" className="container_menu">
        <div className="siledienthoai"><Sile/></div>
          <div className="thongtingia">hOANG</div>
        </div>
        {/* <div>
            <Menuphone/>
        </div>
        <div>
            <Dienthoai/>
        </div>
        <div>
          <Danhmucdienthoai />
        </div> */}
        {/* <h1>Điện thoại ID: {params.id}</h1>
            <h2>Màu sắc ID: {params.mausacId}</h2> */}
    </div>
  )
}

export default page;