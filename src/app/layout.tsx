"use client";
import { createContext, useState } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Image from "next/image";
import Menu from "@/components/menu/Menu";
import Headt from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Dienthoai"
import image from "../../public/img/l1.webp";
import img from "../../public/img/r1.webp";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { usePathname } from 'next/navigation';
config.autoAddCss = false


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSingupPage = pathname === '/singup' || pathname === '/signin';;

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className='Home'>
          {!isSingupPage && <Navbar />}
          <section className="content">
              <div id="page_loader">
                <div id="left" style={{ height: 800, width: 140 }}>
                {!isSingupPage &&<Image className="image" src={image} alt="Left Image" layout="responsive" width={180} height={800} />}
                </div>
              </div>
         
            <div id="center" >
              {children}
            </div>
        
              <div id="page_loader">
                <div id="right" style={{ height: 800, width: 140 }}>
                {!isSingupPage && <Image className="img" src={img} alt="Right Image" layout="responsive" width={180} height={800} />}
                </div>
              </div>
        
          </section>
        </div>
      </body>
    </html>
  );
}
