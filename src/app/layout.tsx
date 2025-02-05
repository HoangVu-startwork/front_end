"use client";
import { createContext, useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';
config.autoAddCss = false


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignupPage = pathname === '/signup' || pathname === '/signin';
  const isAdminPage = pathname === '/admin';
  const isErrorPage = pathname === '/error';
  
  useEffect(() => {
    const timestampStr = window.localStorage.getItem("exp");
    const token = window.localStorage.getItem("token");
    if (timestampStr) {
      const timestamp = parseInt(timestampStr, 10);
      const date = new Date(timestamp * 1000);
      const currentDate = new Date();
      if (date >= currentDate) {
        if (token && token.trim() !== "") {
        } else {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("exp");
        }
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("exp");
      }
    } else {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("exp");
    }
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
      {isAdminPage || isErrorPage ? (
          <div id="center-admin">
            {children}
          </div>
        ) : (
          <div className="Home">
            {!isSignupPage && <Navbar />}
            <section className="content">
              <div id="page_loader">
                <div id="left" style={{ height: 800, width: 140 }}>
                  {!isSignupPage && (
                    <Image
                      className="image"
                      src={image}
                      alt="Left Image"
                      layout="responsive"
                      width={180}
                      height={800}
                    />
                  )}
                </div>
              </div>
              <div id="center">{children}</div>
              <div id="page_loader">
                <div id="right" style={{ height: 800, width: 140 }}>
                  {!isSignupPage && (
                    <Image
                      className="img"
                      src={img}
                      alt="Right Image"
                      layout="responsive"
                      width={180}
                      height={800}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </body>
    </html>
  );
}
