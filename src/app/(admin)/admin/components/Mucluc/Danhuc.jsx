import React from 'react'
import { useEffect, useState } from 'react'
import '@/app/(admin)/css/user.css'
import Apihedieuhanh from '@/service/hedieuhanh'
import Apimucluc from '@/service/mucluc'
import Apidanhmuc from '@/service/danhmuc'
import Apihinhanh from '@/service/hinhanh'


function Danhuc() {
    const [error, setError] = useState("")
    const [muclucdata, setMucluc] = useState([]);
    const [hedieuhanhdata, setHedieuhanh] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const [mucluc, setMuclucid] = useState("");
    const [hedieuhanh, setHedieuhanhid] = useState("");
    const [tendanhmuc, setTendanhmuc] = useState("");
    const [hinhanh, setHinhanh] = useState("");
    const [image, setimage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [danhmuc, setDanhmuc] = useState([])

    const getdanhmuc = async () => {
        setLoading(true);
        try {
            const response = await Apidanhmuc.getAlldanhmucdienthoai();
            const danhmucList = response.result;

            const DatadanhmucList = await Promise.all(danhmucList.map(async (danhmucdata) => {
                const mucluc = await Apimucluc.getMuclucId(danhmucdata.muclucId);
                const hedieuhanh = await Apihedieuhanh.getHedieuhanhId(danhmucdata.hedieuhanhId)

                return {
                    ...danhmucdata,
                    hedieuhanhName: hedieuhanh.tenhedieuhanh,
                    muclucName: mucluc.tenmucluc
                }
            }))
            setDanhmuc(DatadanhmucList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    const getmucluc = async () => {
        try {
            const datamucluc = await Apimucluc.getMucluc()
            setMucluc(datamucluc)
        } catch {
            setError("Không có dữ liệu")
        }
    }

    const gethedieuhanh = async () => {
        try {
            const datahedieuhanh = await Apihedieuhanh.getHedieuhanh()
            setHedieuhanh(datahedieuhanh)
        } catch {
            setError("Không có dữ liệu")
        }
    }

    const onchanmucluc = (e) => {
        setMuclucid(e.target.value)
    }

    const onchantendanhmuc = (e) => {
        setTendanhmuc(e.target.value)
    }

    const onchanhedieuhanh = (e) => {
        setHedieuhanhid(e.target.value)
    }

    const handleFileChange = (event) => {
        setimage(event.target.files[0]);
    };

    const handledanhmuc = async () => {
        setLoading(true);
        try {
            if (!image) {
                setMessage('Please select a file first!');
                return;
            }
            // Tải ảnh lên và đợi kết quả
            const response = await Apihinhanh.postanh(image);
            setHinhanh(response.data);

            // Sau khi ảnh đã được tải lên và state hinhanh đã được cập nhật, kiểm tra các trường khác
            if (!hedieuhanh || !mucluc || !tendanhmuc) {
                setError("Không thể để trống");
            } else {
                // Tất cả các trường hợp hợp lệ, gọi API thêm danh mục
                const data = await Apidanhmuc.postdanhmuc(tendanhmuc, response.data, mucluc, hedieuhanh);
                getdanhmuc()
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    const handexoaDanhmuc = async (id, hinhanh) => {
        setLoading(true);
        try {
            const responsedelete = await Apihinhanh.deleteanh(hinhanh);
            if (responsedelete) {
                const response = await Apidanhmuc.delete(id);
                setSuccessMessage('Xoá danh mục thành công');
                getdanhmuc();
                setTimeout(() => {
                    setSuccessMessage('')
                }, 3000);

            }
        } catch {
            setSuccessMessage('Xoá danh mục không thành công');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    useEffect(() => {
        getmucluc()
        gethedieuhanh()
        getdanhmuc()
    }, [])

    const [capnhat, setCapnhat] = useState(false);
    const [danhmucId, setDanhmucId] = useState([]);
    const [capnhatdanhmuc, setcapnhatdanhmuc] = useState("");
    const [capnhatmucluc, setCapnhatmucluc] = useState("");
    const [capnhathedieuhanh, setCapnhathedieuhanh] = useState("");
    const [capnhathinhanh, setcapnhathinhanh] = useState("");

    const onCapnhat = () => {
        setCapnhat(true)
    }

    const onCapnhatt = () => {
        setCapnhat(false)
        setLoading(true)
        setTimeout(() => {
            setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
        }, 2000);
    }

    const getDanhmucId = async (id) => {
        setCapnhat(true)
        setLoading(true)
        try {
            const response = await Apidanhmuc.getDanhmuc(id);
            if (response && response.result) {
                const responsemucluc = await Apimucluc.getMuclucId(response.result.muclucId);
                const responsehedieuhanh = await Apihedieuhanh.getHedieuhanhId(response.result.hedieuhanhId)
                setDanhmucId(response.result);
                setcapnhatdanhmuc(response.result.tendanhmuc);
                // setCapnhatmucluc(responsemucluc.result);
                // setCapnhathedieuhanh(responsehedieuhanh.result);
                setcapnhathinhanh(response.result.hinhanh);
                if (responsemucluc && responsehedieuhanh) {
                    setCapnhatmucluc(responsemucluc.tenmucluc)
                    setCapnhathedieuhanh(responsehedieuhanh.tenhedieuhanh)
                    setLoading(false);
                } else {
                    setSuccessMessage("không dữ liệu 66")
                }
            } else {
                setSuccessMessage("Dữ liệu không đúng định dạng.");
            }
        } catch {
            setError("Không dữ liệu")
            setLoading(false);
        }
    }

    const onchantendanhmucId = (e) => {
        setcapnhatdanhmuc(e.target.value)
    }

    const onchanmuclucId = (e) => {
        setCapnhatmucluc(e.target.value)
    }

    const onchanhethongmuc = (e) => {
        setCapnhathedieuhanh(e.target.value)
    }

    const handlecapnhatFileChange = (event) => {
        setcapnhathinhanh(event.target.files[0]);
    };


    const capnhatdanhmucid = async () => {
        setLoading(true);
        try {
            if (capnhathinhanh === undefined) {
                const capnhathinhanh = danhmucId.hinhanh;
                const responsecanhat = await Apidanhmuc.putdanhmuc(danhmucId.id, capnhatdanhmuc, capnhatmucluc, capnhathedieuhanh, capnhathinhanh);
                if (responsecanhat) {
                    getdanhmuc();
                }
            } else if (capnhathinhanh !== undefined && capnhathinhanh !== danhmucId.hinhanh) {
                const responsedelete = await Apihinhanh.deleteanh(danhmucId.hinhanh);
                if (responsedelete) {
                    const responsehinhanh = await Apihinhanh.postanh(capnhathinhanh);
                    if (responsehinhanh) {
                        const capnhathinhanh = responsehinhanh.data;
                        const responsecanhat = await Apidanhmuc.putdanhmuc(danhmucId.id, capnhatdanhmuc, capnhatmucluc, capnhathedieuhanh, capnhathinhanh);
                        if (responsecanhat) {
                            getdanhmuc();
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <div className="loading-overlay">Loading...</div>}
            {capnhat && <div className="loading-overlay">
                {loading && <div className="loading-overlay">Loading...</div>}
                <div className="flex flex-col justify-center items-center h-[100vh] duration-300 hover:rotate-1 lg:p-8">
                    <div className='!z-5 max-w-[678px] max-h-[400px] relative flex h-full w-full bg-gray-900 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                        <div className='ml-auto'>
                            <div className='relative flex'>
                                <div className="mb-3 text-right">
                                    <button onClick={onCapnhatt} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                        <div className='mb-auto flex flex-col items-center justify-center'>
                            <h2 className='text-rose-600 font-bold'>Cập nhật dữ liệu danh mục</h2>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-white dark:text-gray-200" htmlFor="username">Tên danh mục</label>
                                    <input id="username" value={capnhatdanhmuc} onChange={onchantendanhmucId} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                </div>
                                <div>
                                    <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh</label>
                                    <input onChange={handlecapnhatFileChange} type="file" className="block w-full px-1 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                </div>
                                <div>
                                    <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Mục lục</label>
                                    <select value={capnhatmucluc} onChange={onchanmuclucId} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                        <option hidden>Chọn mục lục</option>
                                        {muclucdata.map((muclucdata) => {

                                            return (
                                                <option key={muclucdata.id} value={muclucdata.tenmucluc} >{muclucdata.tenmucluc}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Hệ điều hành</label>
                                    <select value={capnhathedieuhanh} onChange={onchanhethongmuc} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                        <option hidden>Chọn hệ điều hành</option>
                                        {hedieuhanhdata.map((hedieuhanhdata) => {
                                            return (
                                                <option key={hedieuhanhdata.id} value={hedieuhanhdata.tenhedieuhanh} >{hedieuhanhdata.tenhedieuhanh}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button onClick={capnhatdanhmucid} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                            </div>
                        </div>
                        <div className='flex flex-col'>

                        </div>
                    </div>
                </div>
            </div>}
            <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Thêm danh mục</h1>
                {error && <div className="success-message">{error}</div>}
                <div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Tên danh mục</label>
                            <input id="username" value={tendanhmuc} onChange={onchantendanhmuc} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh</label>
                            <input onChange={handleFileChange} type="file" className="block w-full px-1 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Mục lục</label>
                            <select value={mucluc} onChange={onchanmucluc} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn mục lục</option>
                                {muclucdata.map((muclucdata) => {
                                    return (
                                        <option key={muclucdata.id} value={muclucdata.tenmucluc} >{muclucdata.tenmucluc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Hệ điều hành</label>
                            <select value={hedieuhanh} onChange={onchanhedieuhanh} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn hệ điều hành</option>
                                {hedieuhanhdata.map((hedieuhanhdata) => {
                                    return (
                                        <option key={hedieuhanhdata.id} value={hedieuhanhdata.tenhedieuhanh} >{hedieuhanhdata.tenhedieuhanh}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button onClick={handledanhmuc} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </div>
            </section>
            <div className='block w-full overflow-x-auto'>
            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                    <tr>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên Danh Mục
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Hình ảnh
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên Hệ Điều Hành
                        </th>
                        <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên Mục Lục
                        </th>
                        <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Xoá
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {danhmuc.map((danhmucdata) => {
                        return (
                            <tr key={danhmucdata.id}>
                                <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                    {danhmucdata.id}
                                </th>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {danhmucdata.tendanhmuc}
                                </td>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <img className="img-danhmuc" alt={danhmucdata.tendanhmuc} src={`${danhmucdata.hinhanh}`} />
                                </td>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {danhmucdata.hedieuhanhName}
                                </td>
                                <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {danhmucdata.muclucName}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <button onClick={() => getDanhmucId(danhmucdata.id)} className="px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-lime-500 rounded-md hover:bg-lime-800 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                    <button onClick={() => handexoaDanhmuc(danhmucdata.id, danhmucdata.hinhanh)} className="ml-2 px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            </div>
        </div>
    )
}

export default Danhuc