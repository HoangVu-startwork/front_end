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
import Thongtinphanloaisanpham from "@/components/dienthoai/Timkiemthongtinphanloaisanpham"
import { useParams } from "next/navigation";
import Thongtinloaisanpham from "@/components/danhmuc/Danhmucthongtinphanloai";
type Params = {
    id: string;
    idloaisanpham: string;
    idphanloai: string;
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
        <Thongtinloaisanpham idanhmuc={params.id} id={params.idloaisanpham}/>
      </div>
      <div>
        <Nhucau />
      </div>
      <div>
        <Thongtinphanloaisanpham id={params.id} idloaisanpham={params.idloaisanpham} idphanloai={params.idphanloai}/>
      </div>
    </div>
  )
}

export default page