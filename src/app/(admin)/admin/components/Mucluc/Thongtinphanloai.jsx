import React, { useState, useEffect } from 'react';
import Apidanhmuc from '@/service/danhmuc'
import Apiloaisanpham from '@/service/loaisanpham'
import Apithongtinphanloai from '@/service/thongtinphanloai'
import '@/app/(admin)/css/user.css'

function Thongtinphanloai() {
    const [dataloaisanpham, setdataloaisanpham] = useState([]);
    const [datathongtinphanloai, setdatathongtinphanloai] = useState([]);
    const [posttenthongtinphanloai, setposttenthongtinphanloai] = useState("");
    const [posttenloaisanpham, setposttenloaisanpham] = useState("");
    const [loading, setLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState("");
    const [capnhat, setCapnhat] = useState(false);
    const [tenphanloai, settenphanloai] = useState("");
    const [tenloaisanpham, settenloaisanpham] = useState("");
    const [idphanloai, setIdphanloai] = useState("");

    const onChanTenthongtinphanloai = (e) => {
        setposttenthongtinphanloai(e.target.value);
    }

    const onChanTenloaisanpham = (e) => {
        setposttenloaisanpham(e.target.value);
    }

    const onChanpotsThongtinphanloai = async () => {
        setLoading(true);
        try {
            if (!posttenthongtinphanloai || !posttenloaisanpham) {
                setSuccessMessage("Không thể để trống");
            } else {
            const data = await Apithongtinphanloai.postThongtinphanloai(posttenthongtinphanloai, posttenloaisanpham)
            getThongtinphanloais()
            setSuccessMessage("Thêm thông tin phân loại thành công")
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
        } catch {
            setSuccessMessage("Thêm dữ liệu không thành công")
        }
    }

    const getThongtinphanloais = async () => {
        setLoading(true);
        try {
            const getThongtinphanloaiList = await Apithongtinphanloai.getThongtinphanloai();
            const getthongtinphanloai = getThongtinphanloaiList.result;
            const LoaisanphamList = await Promise.all(getthongtinphanloai.map(async (data) => {
                const loaisanpham = await Apiloaisanpham.getId(data.loaisanphamId)
                return {
                    ...data,
                    LoaisanphamName: loaisanpham.tenloaisanpham,
                }
            }))
            console.log(LoaisanphamList)
            setdatathongtinphanloai(LoaisanphamList)
            if (LoaisanphamList) {
                setLoading(false)
            }
        } catch {
            setSuccessMessage('Không có thông tin');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    const getLoaisanpham = async () => {
        try {
            const getLoaisanpham = await Apiloaisanpham.getAllloaisanpham();
            setdataloaisanpham(getLoaisanpham.result)

        } catch {
            setSuccessMessage('Không có thông tin');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    const DeleteThongtinphanloai = async (id) => {
        setLoading(true);
        try {
            const deletethongtin = await Apithongtinphanloai.delete(id);
            getThongtinphanloais()
            setSuccessMessage('Xoá thông tin phân loại thành công');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        } catch {
            setSuccessMessage('Xoá thông tin phân loại không thành công');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    const getDanhmucId = async (id) => {
        setCapnhat(true)
        setLoading(true);
        try {
            const datathongtinphanloai = await Apithongtinphanloai.getThongtinphanloaiId(id);
            if (datathongtinphanloai) {
                const dataloaisanpham = await Apiloaisanpham.getId(datathongtinphanloai.loaisanphamId)
                settenloaisanpham(dataloaisanpham.tenloaisanpham)
                settenphanloai(datathongtinphanloai.tenphanloai)
                setIdphanloai(datathongtinphanloai.id)
                if (dataloaisanpham) {
                    setLoading(false)
                }
            }
        } catch {
            setTimeout(() => {
                setSuccessMessage('Không có dữ liệu')
            }, 5000);
        }
    }

    const onChanCapnhat = () => {
        setCapnhat(false)
    }

    const onchantenphanloai = (e) => {
        settenphanloai(e.target.value)
    }

    const onchantenloaisanpham = (e) => {
        settenloaisanpham(e.target.value)
    }

    const pushThongtinphanloai = async () => {
        setLoading(true);
        try {
            const deletethongtinphanloai = await Apithongtinphanloai.putThongtinphanloaiId(idphanloai, tenphanloai, tenloaisanpham)
            getThongtinphanloais()
            getDanhmucId()
            setSuccessMessage("Thêm thông tin phân loại thành công")
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        } catch {
            setSuccessMessage('Không có thông tin');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    useEffect(() => {
        getThongtinphanloais();
        getLoaisanpham()
    }, []);

    return (
        <div>
            {loading && <div className="loading-overlay">Loading...</div>}
            {SuccessMessage && <div className="success-message">{SuccessMessage}</div>}
            {capnhat && <div className="loading-overlay">
                {loading && <div className="loading-overlay">Loading...</div>}
                <div className="flex flex-col justify-center items-center h-[100vh] duration-300 hover:rotate-1 lg:p-8">
                    <div className='!z-5 max-w-[678px] max-h-[400px] relative flex h-full w-full bg-gray-900 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                        <div className='ml-auto'>
                            <div className='relative flex'>
                                <div className="mb-3 text-right">
                                    <button onClick={onChanCapnhat} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                        <div className='mb-auto flex-col items-center justify-center'>
                            <h2 className='text-rose-600 font-bold'>Cập nhật thông tin phân loại </h2>
                            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1">
                                <div className='w-full'>
                                    <label className="text-white dark:text-gray-200" htmlFor="username">Tên thông tin phân loại</label>
                                    <input id="username" value={tenphanloai} onChange={onchantenphanloai} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                </div>

                                <div className='w-full'>
                                    <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Loại sản phẩm</label>
                                    <select value={tenloaisanpham} onChange={onchantenloaisanpham} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                        <option hidden>Chọn loại sản phẩm</option>
                                        {dataloaisanpham.map((muclucdata) => {
                                            return (
                                                <option key={muclucdata.id} value={muclucdata.tenloaisanpham} >{muclucdata.tenloaisanpham}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button onClick={pushThongtinphanloai} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                            </div>
                        </div>
                        <div className='flex flex-col'>

                        </div>
                    </div>
                </div>
            </div>}
            <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-3">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">THÔNG TIN PHÂN LOẠI SÀN PHẢM ĐIỆN THOẠI</h1>
                {/* {error && <div className="success-message">{error}</div>} */}
                <div>
                    <div className="grid grid-cols-1 gap-6 mt-4">
                        <div>
                            <label className="text-white dark:text-gray-200">Tên thông tin phân loại</label>
                            <input value={posttenthongtinphanloai} onChange={onChanTenthongtinphanloai} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Loại sản phẩm</label>
                            <select value={posttenloaisanpham} onChange={onChanTenloaisanpham} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn loại sản phẩm</option>
                                {dataloaisanpham.map((muclucdata) => {
                                    return (
                                        <option key={muclucdata.id} value={muclucdata.tenloaisanpham} >{muclucdata.tenloaisanpham}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={onChanpotsThongtinphanloai} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </section>
            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                    <tr>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên Phân Loại
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên Loại Sản Phẩm
                        </th>
                        <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Xoá
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {datathongtinphanloai.map((danhmucdata) => {
                        return (
                            <tr key={danhmucdata.id}>
                                <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                    {danhmucdata.id}
                                </th>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {danhmucdata.tenphanloai}
                                </td>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {danhmucdata.LoaisanphamName}
                                </td>

                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <button onClick={() => getDanhmucId(danhmucdata.id)} className="px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-lime-500 rounded-md hover:bg-lime-800 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                    <button onClick={() => DeleteThongtinphanloai(danhmucdata.id)} className="ml-2 px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default Thongtinphanloai