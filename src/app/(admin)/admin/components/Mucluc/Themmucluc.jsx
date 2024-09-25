'use client'
import React from "react";
import { useEffect, useState } from 'react'
import Mucluc from '@/service/mucluc'
import '@/app/(admin)/css/user.css'

function Themmucluc() {
  const [tenmucluc, setMucluc] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [getMessage, setgetMessage] = useState('');
  const [showMucluc, setshowMucluc] = useState([]);
  const [loading, setLoading] = useState(false);

  const themMucluc = async () => {
    try {
      const data = await Mucluc.postMucluc(tenmucluc)
      setSuccessMessage('Thêm vào mục lục thành công')
      setMucluc('')
        setLoading(false);
        setSuccessMessage('');
        getMucluc();
    } catch {
      setSuccessMessage('Thêm vào mục lục không thành công')
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000)
    }
  }

  const getMucluc = async () => {
    setLoading(true);
    try {
      const datamucluc = await Mucluc.getMucluc();
      setshowMucluc(datamucluc);
      console.log(datamucluc);
      setLoading(false); // Tắt loading ngay khi dữ liệu được trả về
    } catch {
      setSuccessMessage('Không truy vấn được dữ liệu');
      setTimeout(() => {
        setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
      }, 5000);
    }
  };
  

  const deleteMucluc = async (id) => {
    try {
      const deleteMuclucs = Mucluc.delete(id);
      setSuccessMessage('Xoá mục lục thành công')
      getMucluc()
      setMucluc('')
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000)
    } catch {
      setgetMessage('Không truy vấn được dữ liệu')
    }
  }

  useEffect(() => {
    getMucluc()
  }, [])


  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-3">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">MỤC LỤC SÀN PHẢM ĐIỆN THOẠI</h1>
        <div>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-white dark:text-gray-200">Tên mục lục</label>
              <input onChange={(e) => setMucluc(e.target.value)} value={tenmucluc} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={themMucluc} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </section>
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
                    Tên Mục Lục
                  </th>
                  <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Xoá
                  </th>
                </tr>
              </thead>

              <tbody>
                {showMucluc.map((mucluc) => {
                  return (
                      <tr key={mucluc.id}>
                        <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {mucluc.id}
                        </th>
                        <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {mucluc.tenmucluc}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => deleteMucluc(mucluc.id)} className="px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
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

export default Themmucluc