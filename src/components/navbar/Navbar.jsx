'use client'
import React from "react";
import Image from "next/image";
import '@/components/css/Post_menu_dienthoai.css'
import Link from 'next/link'
import ServiceUser from "../../service/auth"

export default function Navbar() {
  var image = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724913048/ogdynlsr19kklrng9aut.jpg"
  var logo = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724915193/hsdeq2vweyoxqez6nt4g.png"
  var logotest = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724915806/vutgzevznfdmbwn6lsxy.png"
  return (
    <div className="navbar bg-red-700 z-50 test_object_contain">
      <div className="navbar z-50 text_navbar">
        <div className="flex-1">
          <a className=" btn-ghost text-xl">
            <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src={logotest} alt="Transistor" width="100%" height="100%"/>
          </a>
        </div>
        <div className="flex-none ">
          <div className="dropdown dropdown-end relative">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={image} width={30} height={30}/>
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-0">
              <li>
                <Link href="/giohang" className="justify-between">
                  Giỏ hàng
                  <span className="badge">0</span>
                </Link>
              </li>
              <li><a>Tài khoản</a></li>
              <li><Link href="/signin">Đăng nhập</Link></li>
              <li><Link href="/singup">Đăng ký</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
