'use client'
import React from "react";
import { useEffect, useState } from 'react'
import Uudaixephanguser from "@/service/uudaimuahang";
import Severxephanguser from '@/service/xephanguser'
import '@/app/(admin)/css/uudaixephang.css'

function Uudaixephang() {

    const [themuudaiuser, setThemuudaiuser] = useState(false);
    const [noidunguudai, setNoidunguudai] = useState('');
    const [dieukienuudai, setDieukienuudai] = useState('');
    const [phantramkhuyenmai, setPhantramkhuyenmai] = useState('');
    const [giakhuyenmai, setGiakhuyenmai] = useState('');
    const [dieukienthucthi, setDieukienthucthi] = useState('');
    const [xephanguser, setXephanguser] = useState([]);
    const [idxephanguser, setIdxephanguser] = useState('');
    const [Message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [xemuudaixephang, setXemuudaixephang] = useState(false);
    const [hienthiuudaixephang, setHienthiuudaixephang] = useState([])

    const handHienfrom = async () => {
        setNoidunguudai('')
        setDieukienuudai('')
        setPhantramkhuyenmai('')
        setGiakhuyenmai('')
        setDieukienthucthi('')
        setThemuudaiuser(true)
    }

    const handTatHienfrom = async () => {
        setThemuudaiuser(false)
    }


    const handTatthiuudai = async () => {
        setXemuudaixephang(false);
    }

    const getAllXephanguser = async () => {
        setLoading(true);
        try {
            const dataxephanguser = await Severxephanguser.getAllXephanguser();
            setXephanguser(dataxephanguser)
            setLoading(false);
        } catch {
            setSuccessMessage('Không truy vấn được dữ liệu');
            setTimeout(() => {
                setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
            }, 5000);
        }
    };

    const handThemuudaixephang = async () => {
        try {
            if (!noidunguudai && !dieukienuudai && !phantramkhuyenmai && !giakhuyenmai && !dieukienthucthi) {
                setMessage("Không đề trống dữ liệu")
            } else {
                const data = await Uudaixephanguser.postUudaixephang(noidunguudai, dieukienuudai, phantramkhuyenmai, giakhuyenmai, dieukienthucthi, idxephanguser)
                setMessage("Thêm ưu đãi xếp hạng thành công")
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        } catch {

        }
    }

    const getIDUudaixephang = async (id) => {
        setXemuudaixephang(true)
        try {
            const datagetuudaixephang = await Uudaixephanguser.getXephanguserUudai(id);
            setHienthiuudaixephang(datagetuudaixephang)
        } catch {

        }
    }

    const handXephanguser = (e) => {
        setIdxephanguser(e.target.value)
    }

    const handxoauudaixephang = async (id, xephanguserId) => {
        try {
            const datauudai = await Uudaixephanguser.deleteUudaixephang(id);
            setMessage("Xoá ưu đãi xếp hạng");
            setTimeout(() => {
                setMessage('')
            }, 5000);
            const data = await Uudaixephanguser.getXephanguserUudai(xephanguserId);
            setHienthiuudaixephang(data)
        } catch {
            setMessage("Xoá ưu đãi xếp hạng")
        }
    }

    useEffect(() => {
        getAllXephanguser()
    }, [])
    return (
        <div>
            {Message && <div className="success-message">{Message}</div>}
            {xemuudaixephang && (
                <div className="loading-hienthiuudaixephangid">
                    <div className="loading-hienthiuudaixephangids">
                        <div className='ml-auto'>
                            <div className='relative flex'>
                                <div className="mb-3 text-right">
                                    <button onClick={handTatthiuudai} className="text-slate-950 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-auto flex-col items-center justify-center">
                            <h2 className='textthemquancao uppercase'>Ưu đãi xếp hạng</h2>
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID
                                        </th>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Nội dụng ưu đãi
                                        </th>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Giá tiền giảm
                                        </th>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Phần trăm giảm
                                        </th>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Điều kiện ưu đãi
                                        </th>
                                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Điều kiện thực thi
                                        </th>
                                        <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Xoá
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {hienthiuudaixephang.map((uudaixephang) => {
                                        return (
                                            <tr key={uudaixephang.id}>
                                                <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {uudaixephang.id}
                                                </th>
                                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                    {uudaixephang.noidunguudai}
                                                </td>
                                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                    {uudaixephang.giakhuyenmai} vnđ
                                                </td>
                                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                    {uudaixephang.phantramkhuyenmai} %
                                                </td>
                                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                    {uudaixephang.dieukienuudai}
                                                </td>
                                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                    {uudaixephang.dieukienthucthi} vnđ
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button onClick={() => handxoauudaixephang(uudaixephang.id, uudaixephang.xephanguserId)} className="px-3 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {themuudaiuser && (
                <div className="loading-uudaixephang">
                    <div className="loading-uudaixephangs flex h-full w-full bg-slate-950 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
                        <div className='ml-auto'>
                            <div className='relative flex'>
                                <div className="mb-3 text-right">
                                    <button onClick={handTatHienfrom} className="text-slate-950 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-auto flex-col items-center justify-center">
                            <h2 className='textthemquancao uppercase'>Thêm ưu đãi xếp hạng</h2>
                            <div className='mt-2'>
                                <label className="text-xl text-black dark:text-gray-200" htmlFor="username">Nội dung ưu đãi</label>
                                <input id="username" type="text" onChange={(e) => setNoidunguudai(e.target.value)} placeholder='Nội dung ưu đãi' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='mt-2'>
                                <label className="text-xl text-black dark:text-gray-200" htmlFor="username">Giá áp dụng</label>
                                <input id="username" type="text" onChange={(e) => setGiakhuyenmai(e.target.value)} placeholder='Giá áp dụng' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='mt-2'>
                                <label className="text-xl text-black dark:text-gray-200" htmlFor="username">Điều kiện thực thi (giá tiền hoá để thực hiện ưu đãi)</label>
                                <input id="username" type="text" onChange={(e) => setDieukienuudai(e.target.value)} placeholder='Điểu kiện ưu đãi' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='mt-2'>
                                <label className="text-xl text-black dark:text-gray-200" htmlFor="username">Phần trăm khuyến mãi</label>
                                <input id="username" type="text" onChange={(e) => setPhantramkhuyenmai(e.target.value)} placeholder='Phần trăm khuyến mãi' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='mt-2'>
                                <label className="text-xl text-black dark:text-gray-200" htmlFor="username">Điều kiện ưu đãi (muahang)</label>
                                <input id="username" type="text" onChange={(e) => setDieukienthucthi(e.target.value)} placeholder='Điều kiện thực thi (giá tiền hoá để thực hiện ưu đãi)' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='w-full mt-2'>
                                <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Chọn xếp hạng</label>
                                <select value={idxephanguser} onChange={handXephanguser} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option hidden>Chọn xếp hạng</option>
                                    {xephanguser.map((xephangusers) => {
                                        return (
                                            <option key={xephangusers.id} value={xephangusers.id} >{xephangusers.hangmuc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mt-6'>
                                <button onClick={handThemuudaixephang} className="button-themthuonghieu px-8 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600">Thêm ưu đãi xếp hạng</button>
                            </div>
                        </div>
                    </div>
                </div>)}
            <div className="justify-center items-center mb-auto">
                <h2 className='text-xl mt-3 mb-3 uppercase'>Thêm ưu đãi xếp hạng user</h2>
                <div>
                    <button onClick={handHienfrom} className="button-themquancao uppercase text-xl px-3 py-4 leading-5 text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300">Thêm quản cáo điện thoại</button>
                </div>
            </div>
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-2">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Page Visits</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        {loading && <div className="loading-overlay">Loading...</div>}
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ID
                                    </th>
                                    <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Hạng
                                    </th>
                                    <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Giá tiền hạng mức
                                    </th>
                                    <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Xoá
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {xephanguser.map((xephanguser) => {
                                    return (
                                        <tr key={xephanguser.id}>
                                            <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {xephanguser.id}
                                            </th>
                                            <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                {xephanguser.hangmuc}
                                            </td>
                                            <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 ">
                                                {xephanguser.giatien}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <button onClick={() => deleteXephang(xephanguser.id)} className="px-3 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
                                                <button onClick={() => getIDUudaixephang(xephanguser.id)} className="px-3 ml-3 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-gray-600">Xem ưu đãi xếp hạng</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uudaixephang