'use client'
import { useState, useEffect } from 'react';
import Menu from "@/components/menu/Menu"
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Quancaothuonghieu"
import Danhmucdienthoai from "@/components/dienthoai/Danhmucdienthoai"
import Nhucau from "@/components/dienthoai/Nhucaudienthoai"
import Timkiemdienthoai from "@/components/dienthoai/Timkiemdienthoai"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Auth from "../../../service/auth"

function page() {

  const fetchTokenInfo = async () => {
    try {
      const data = await Auth.gettoken();
      console.log("User info:", data);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   console.log("token - api eee 00000000 -- " + token);

  //   if (token && token.trim() !== "") {
  //     fetchTokenInfo();
  //   }
  // }, []);


  return (
    <div>
      <div>
        <Menuphone />
      </div>
      <div>
        <Dienthoai />
      </div>
      <div>
        <Danhmucdienthoai />
      </div>
      <div>
        <Nhucau />
      </div>
      <div>
        <Timkiemdienthoai />
      </div>
      <div>nlkn</div>
    </div>
  )
}

export default page