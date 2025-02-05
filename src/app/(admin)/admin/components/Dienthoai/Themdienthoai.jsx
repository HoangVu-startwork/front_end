import { useEffect, useState } from 'react'
import axios from "axios";
import Image from "next/image";
import Apithongtinphanloai from '@/service/thongtinphanloai'
import Apihinhanh from "@/service/hinhanh"
import Apidienthoai from "@/service/dienthoai"
import '@/app/(admin)/css/dienthoai.css'

function Themdienthoai() {
    const [selectram, setselectram] = useState("");
    const [errorram, setErrorram] = useState("")
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [image, setimage] = useState(null);
    const [selectbonhotrong, setselecbonhotrong] = useState("");
    const [datathongttinphanloai, setdatathongttinphanloai] = useState([]);
    const [tendienthoai, settendienthoai] = useState("");
    const [giaban, setgiaban] = useState("");
    const [Message, setMessage] = useState("");
    const [thongtinphanloai, setthongtinphanloai] = useState("");
    const [tinhtrangs, settinhtrang] = useState("");
    const [loading, setLoading] = useState(false);

    const onchanram = (e) => {
        setselectram(e.target.value)
    }

    const onChantinhtrang = (e) => {
        settinhtrang(e.target.value);
    }

    const onChantendienthoai = (e) => {
        settendienthoai(e.target.value)
    }

    const onChanthongtinphanloai = (e) => {
        setthongtinphanloai(e.target.value)
    }


    const onChangiaban = (e) => {
        setgiaban(e.target.value)
    }

    const onchanbonhotrong = (e) => {
        setselecbonhotrong(e.target.value)
    }

    const getThongtinphanloai = async () => {
        try {
            const getThongtinphanloai = await Apithongtinphanloai.getThongtinphanloai();
            setdatathongttinphanloai(getThongtinphanloai.result)

        } catch {
            setSuccessMessage('Không có thông tin');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    const handleFileChange1s = (event) => {
        setimage(event.target.files[0]);
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleThemdienthoai = async () => {
        setLoading(true)
        let hinhanhs = null;
        let hinhdanhduyets = null
        try {
            if (!image) {
                setMessage('Please select a file first!');
                return;
            }

            if (!tendienthoai || !giaban || !selectram || !thongtinphanloai || !selectbonhotrong || !image || !selectedFiles || !tinhtrangs) {
                setMessage('Không thể có dữ liệu trống')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            } else {
                const hinhanhdienthoai = await Apihinhanh.postanhdienthoai(image);
                const hinhanhdienthoais = hinhanhdienthoai.data;
                hinhanhs = hinhanhdienthoai.data;
                if (hinhanhdienthoai.data) {
                    const formData = new FormData();
                    for (let i = 0; i < selectedFiles.length; i++) {
                        formData.append("images", selectedFiles[i]);
                    }
                    const hinhanhduyetdienthoai = await Apihinhanh.posthinhanhduyet(formData)
                    const hinhdanhduyet = hinhanhduyetdienthoai.data
                    hinhdanhduyets = hinhanhduyetdienthoai.data
                    if (hinhanhduyetdienthoai.data) {
                        const themdienthoai = await Apidienthoai.postdienthoai(tendienthoai, giaban, selectram, thongtinphanloai, selectbonhotrong, hinhanhdienthoais, hinhdanhduyet, tinhtrangs)
                        setMessage('Thêm thành công')
                        setTimeout(() => {
                            setLoading(false)
                        }, 5000);
                        setTimeout(() => {
                            setMessage('')
                        }, 8000);
                    }
                }
            }
        } catch {
            try {
                const hinhanhdienthoai = await Apihinhanh.deleteanh(hinhanhs);
                if (hinhanhdienthoai.data) {
                    const hinhanhdienthoai = await Apihinhanh.deletehinhanhduyet(hinhdanhduyets);
                    setMessage('Thêm điện thoại không thành công')
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
            } catch {
                setMessage('Thêm điện thoại không thành công')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        }
    };



    useEffect(() => {
        getThongtinphanloai()
    }, [])



    return (
        <div>
            {loading && <div className="loading-overlay-khuyenmai">
                <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-56 w-56'></div>
            </div>}
            {Message && <div className="success-message">{Message}</div>}
            <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">THÊM SẢN PHẨM ĐIỆN THOẠI</h1>
                <div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Tên điện thoại</label>
                            <input value={tendienthoai} onChange={onChantendienthoai} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Giá bán cố định</label>
                            <input value={giaban} onChange={onChangiaban} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Ram</label>
                            <select value={selectram} onChange={onchanram} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn ram</option>
                                <option value={2}>2GB</option>
                                <option value={4}>4GB</option>
                                <option value={6}>6GB</option>
                                <option value={8}>8GB</option>
                                <option value={12}>12GB</option>
                                <option value={16}>16GB</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Bộ nhớ trong</label>
                            <select value={selectbonhotrong} onChange={onchanbonhotrong} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn bộ nhớ trong</option>
                                <option value={64}>64GB</option>
                                <option value={128}>128GB</option>
                                <option value={256}>256GB</option>
                                <option value={512}>512GB</option>
                                <option value={1}>1TB</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Loại sản phẩm</label>
                            <select value={thongtinphanloai} onChange={onChanthongtinphanloai} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn loại sản phẩm</option>
                                {datathongttinphanloai.map((thongtinphanloai) => {
                                    return (
                                        <option key={thongtinphanloai.id} value={thongtinphanloai.tenphanloai} >{thongtinphanloai.tenphanloai}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh điện thoại</label>
                            <input onChange={handleFileChange1s} type="file" className="block w-full px-1 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh trình bày điện thoại</label>
                            <input multiple onChange={handleFileChange} type="file" className="block w-full px-1 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Trạng khái hiện thị điện thoại</label>
                            <select value={tinhtrangs} onChange={onChantinhtrang} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn tình trạng hiện thị máy</option>
                                <option value="Mở">Mờ</option>
                                <option value="Ẩn">Ẩn</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button onClick={handleThemdienthoai} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Themdienthoai