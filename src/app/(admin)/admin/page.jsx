"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { CIcon } from '@coreui/icons-react';
import { cilAppsSettings, cilStorage, cilBank, cilSpreadsheet, cilShieldAlt, cilApple, cilBurn, cilAperture, cilArrowThickFromBottom, cilTruck, cilMemory } from '@coreui/icons';
import { Helmet } from 'react-helmet';
import ThemDt from './components/Dienthoai/Datadienthoai'
import Danhmuc from './components/Mucluc/Danhuc'
import khuyenmai from './components/Khuyenmai'
import Tongdl from './components/Tongdl'
import Themmucluc from './components/Mucluc/Themmucluc'
import Hedieuhanh from './components/Mucluc/Hedieuhanh'
import LoaisanphamDt from './components/Mucluc/Loaisanphamdt'
import Thongtinphanloai from './components/Mucluc/Thongtinphanloai'
import Auth from '@/service/auth'

import Themdienthoai from './components/Dienthoai/Themdienthoai'
import Link from 'next/link'

const Page = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeSection, setActiveSection] = useState('tongso');
  const [khuyenmai, setKhuyenmai] = useState('khuenmai');

  const fetchTokenInfo = async () => {
    try {
        const data = await Auth.gettoken();
    } catch (error) {
        console.error("Error fetching token info:", error);
    }
};

  useEffect(() => {
    const timestampStr = window.localStorage.getItem("exp");
    const token = window.localStorage.getItem("tokenadmin");
    if (timestampStr) {
        const timestamp = parseInt(timestampStr, 10);
        const date = new Date(timestamp * 1000);
        const currentDate = new Date();
        if (date >= currentDate) {
            if (token && token.trim() !== "") {
                fetchTokenInfo();
            } else{
                window.localStorage.removeItem("tokenadmin");
                window.localStorage.removeItem("exp");
                window.location.href = "/signin";
            }
        } else {
            window.localStorage.removeItem("tokenadmin");
            window.localStorage.removeItem("exp");
            window.location.href = "/signin";
        }
    } else {
        window.localStorage.removeItem("tokenadmin");
        window.localStorage.removeItem("exp");
        window.location.href = "/signin";
    }
}, []);

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <div className="flex h-screen w-full bg-gray-800">
        <aside className="w-20 relative z-20 flex-shrink-0 px-2 overflow-y-auto bg-indigo-600 sm:block">
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-white mt-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                  className="rounded-full w-auto"
                  alt="User"
                />
              </div>
            </div>
            <div>
              <ul className="mt-6 leading-10 px-4">
                <li
                  className="mb-3 p-1 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer"
                  onClick={() => {
                    setOpenMenu(openMenu !== 3 ? 3 : null);
                    setActiveSection('tongso');
                  }}
                >
                  <CIcon className='text-white' icon={cilSpreadsheet} size="xl" />
                </li>
                <li
                  className="mb-3 p-1 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer"
                  onClick={() => {
                    setOpenMenu(openMenu !== 4 ? 4 : null);
                  }}
                >
                  <CIcon className='text-white' icon={cilStorage} size="xl" />
                </li>
                <li
                  className="mb-3 p-1 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer"
                  onClick={() => {
                    setOpenMenu(openMenu !== 1 ? 1 : null);
                  }}
                >
                  <CIcon className='text-white' icon={cilApple} size="xl" />
                </li>
                <li className='mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer'
                  onClick={() => {
                    setOpenMenu(openMenu !== 2 ? 2 : null);
                    setActiveSection('calculator')
                  }}>
                  <CIcon className='text-white' icon={cilBank} size="xl" />
                </li>
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer">
                  <CIcon className='text-white' icon={cilAperture} size="xl" />
                </li>
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer">
                  <CIcon className='text-white' icon={cilAperture} size="xl" />
                </li>
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer bottom-0 mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer">
                  <CIcon className='text-white' icon={cilAppsSettings} size="xl" />
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <aside
          className="animate__animated animate__fadeInLeft w-52 relative z-0 flex-shrink-0 hidden px-4 overflow-y-auto bg-gray-100 sm:block"
          style={{ display: openMenu === 1 ? 'block' : 'none' }}
        >
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 grid-cols-2 mt-6">
              <div
                className={`p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer ${activeSection === 'dashboard' ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setActiveSection('dashboard')}
              >
                <CIcon className='text-indigo-600 size-6' icon={cilAppsSettings} size="xl" onClick={() => setActiveSection('dashboard')}/>
                <p className="text-xs mt-1 text-center font-semibold">Dashboard</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themdulieudienthoai')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm ĐT</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilBurn} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Màu sắc</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilTruck} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Nhập kho</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilMemory} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thông số kỹ thuật</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilShieldAlt} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Tình trang máy</p>
              </div>
            </div>
          </div>
        </aside>
        <aside
          className="animate__animated animate__fadeInLeft w-52 relative z-0 flex-shrink-0 hidden px-4 overflow-y-auto bg-gray-100 sm:block"
          style={{ display: openMenu === 2 ? 'block' : 'none' }}
        >
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 grid-cols-2 mt-6">
              <div
                className={`p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer ${activeSection === 'dashboard' ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setActiveSection('dashboard')}
              >
                <CIcon className='text-indigo-600 size-6' icon={cilAppsSettings} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Dashboard 44</p>
              </div>
              <div
                className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themdulieu')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm ĐT</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilBurn} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Màu sắc</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilTruck} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Nhập kho</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilMemory} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thông số kỹ thuật</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <CIcon className='text-indigo-600 size-6' icon={cilShieldAlt} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Tình trang máy</p>
              </div>
            </div>
          </div>
        </aside>
        <aside
          className="animate__animated animate__fadeInLeft w-52 relative z-0 flex-shrink-0 hidden px-4 overflow-y-auto bg-gray-100 sm:block"
          style={{ display: openMenu === 4 ? 'block' : 'none' }}
        >
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 grid-cols-2 mt-6">
              <div
                className={`p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer ${activeSection === 'dashboard' ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setActiveSection('themhedieuhanh')}
              >
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm hệ điều hành</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themmucluc')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm mục lục</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themdanhmuc')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm danh muc</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themloaisanpham')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thêm loại sản phẩm</p>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer" onClick={() => setActiveSection('themthongtinphanloai')}>
                <CIcon className='text-indigo-600 size-6' icon={cilArrowThickFromBottom} size="xl" />
                <p className="text-xs mt-1 text-center font-semibold">Thông tin phân loại</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          <main className="relative z-0 flex-1 pb-8 px-6 bg-white">
            {activeSection === 'tongso' && <Tongdl />}
            {activeSection === 'dashboard' && <ThemDt />}
            {activeSection === 'themdulieudienthoai' && <Themdienthoai />}

            {/* Mục lục */}
            {activeSection === 'themhedieuhanh' && <Hedieuhanh />}
            {activeSection === 'themmucluc' && <Themmucluc />}
            {activeSection === 'themdanhmuc' && <Danhmuc />}
            {activeSection === 'themloaisanpham' && <LoaisanphamDt/>}
            {activeSection === 'themthongtinphanloai' && <Thongtinphanloai />}
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
