'use client'
import React from 'react'
import Post from './components/Post_menu'
import '@/components/css/menu.css'
import '@/components/css/Post_menu_dienthoai.css'
import Center from './components/Center_menu'
import Sidebar from './components/Sidebar_menu'
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Dienthoai"
import Head from "@/components/head/Headmenu";
import Navbar from "../navbar/Navbar";
function Menu() {
  return (
    <div>
        <div id="content" className="container_menu">
          <div className="post_menu"><Post/></div>
          <div className="center_menu"><Center /></div>
          <div className="sidebar_menu"><Sidebar /></div>
        </div>
        <div>
            <Menuphone />
          </div>
          <div>
            <Head/>
          </div>
          <div>
            <Dienthoai />
          </div>
          
    </div>
  )
}

export default Menu