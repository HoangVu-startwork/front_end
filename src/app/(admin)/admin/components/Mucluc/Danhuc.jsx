import React from 'react'
import { useEffect, useState } from 'react'
import '@/app/(admin)/css/user.css'
import Apihedieuhanh from '@/service/hedieuhanh'
import Apimucluc from '@/service/mucluc'
import Apidanhmuc from '@/service/danhmuc'


function Danhuc() {
    const [selectram, setselectram] = useState("");
    const [errorram, setErrorram] = useState("")

    const [selectbonhotrong, setselecbonhotrong] = useState("");
    const [mucluc, setMucluc] = useState([]);
    const [hedieuhanh, setHedieuhanh] = useState([]);

    const [muclucid, setMuclucid] = useState("");
    const [hedieuhanhid, setHedieuhanhid] = useState(""); 

    const [error, setError] = ("");

    const getmucluc = async () => {
        try {
            const datamucluc = await Apimucluc.getMucluc()
            setMucluc(datamucluc)
        } catch {
            setError("Không có dữ liệu")
        }
    }

    const gethedieuhanh = async () => {
        try{
            const datahedieuhanh = await Apihedieuhanh.getHedieuhanh()
            setHedieuhanh(datahedieuhanh)
        } catch {
            setError("Không có dữ liệu")
        }
    }

    const onchanmucluc = (e) => {
        setMuclucid(e.target.value)
    }

    const onchanhedieuhanh = (e) => {
        setHedieuhanhid(e.target.value)
    }

    const themdienthoai = () => {
        if (!selectram) {
            setErrorram("")
        }

        if (selectram || selectbonhotrong) {
            console.log("test")
        }
    }


    useEffect(() => {
        getmucluc()
        gethedieuhanh()
    }, [])

    return (
        <div>
            <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Account settings</h1>
                <div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="username">Tên danh mục</label>
                            <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Mục lục</label>
                            <select value={muclucid} onChange={onchanmucluc} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn mục lục</option>
                                {mucluc.map((muclucid) => {
                                    return (
                                       <option key={mucluc.id} value={muclucid.id} >{muclucid.tenmucluc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Hệ điều hành</label>
                            <select value={hedieuhanhid} onChange={onchanhedieuhanh} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option hidden>Chọn hệ điều hành</option>
                                {hedieuhanh.map((hedieuhanhid) => {
                                    return (
                                       <option key={hedieuhanhid.id} value={hedieuhanhid.id} >{hedieuhanhid.tenhedieuhanh}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button onClick={themdienthoai} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Danhuc