'use client'
import { useState, useEffect, useRef } from 'react';
import Menu from "@/components/menu/Menu"
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Quancaothuonghieu"
import Danhmucdienthoai from "@/components/dienthoai/Danhmucdienthoai"
import Nhucau from "@/components/dienthoai/Nhucaudienthoai"
import Danhmuctimkiemdienthoai from "@/components/dienthoai/Timkiemdienthoaidanhmuc"
import Danhmucloaisanpham from "@/components/danhmuc/Danhmucloaisanpham"
import { useParams } from "next/navigation";

type Params = {
    id: string;
};

function page() {

  const params = useParams() as Params;

  return (
    <div>
      <div>
        <Menuphone />
      </div>
      <div>
        <Dienthoai />
      </div>
      <div>
        <Danhmucloaisanpham id={params.id}  />
      </div>
      <div>
        <Nhucau />
      </div>
      <div>
        <Danhmuctimkiemdienthoai id={params.id}/>
      </div>
    </div>
  )
}

export default page