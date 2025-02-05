import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apidanhmuc from '@/service/danhmuc'
import Apiloaisanpham from '@/service/loaisanpham'
import '@/app/(admin)/css/user.css'

function Loaisanphamdt() {
  const [datadanhmuc, setdatadanhmuc] = useState([]);
  const [dataloaisanpham, setdataloaisanpham] = useState([])
  const [datatendanhmuc, setdatatendanhmuc] = useState([])
  const [valuedanhmuc, setvaluedanhmuc] = useState("")
  const [error, seterror] = useState("")
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tenloaisanpham, settenloaisanpham] = useState("");
  const [capnhat, setCapnhat] = useState(false);

  const [puttenloaisanpham, setputtenloaisanpham] = useState("");
  const [puttendanhmuc, setputtendanhmuc] = useState("");
  const [idloaisanpham, setidloaisanpham] = useState("");

  const getdanhmuc = async () => {
    setLoading(true);
    try {
      const response = await Apidanhmuc.getAlldanhmucdienthoai();
      setdatadanhmuc(response.result);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }

  const getloaisanpham = async () => {
    setLoading(true);
    try {
      const responsets = await Apiloaisanpham.getAllloaisanpham();
      const loaisanphamList = responsets.result;
      const loaisanphamWithDanhmuc = await Promise.all(loaisanphamList.map(async (danhmucdata) => {
        const danhmuc = await Apidanhmuc.getDanhmucId(danhmucdata.danhmucId);

        return {
          ...danhmucdata,
          danhmucName: danhmuc.tendanhmuc,
        };
      }));
      setdatatendanhmuc(loaisanphamWithDanhmuc);
      setdataloaisanpham(responsets.result);
      if (loaisanphamWithDanhmuc) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  const postloaisanpham = async () => {
    setLoading(true);
    try {
      if (!valuedanhmuc && !tenloaisanpham) {
        seterror("Không có dữ liệu")
      } else {
        const response = await Apiloaisanpham.postloaisanpham(valuedanhmuc, tenloaisanpham)
        seterror("Thêm thành công")
        if (response) {
          getloaisanpham()
        }
        setTimeout(() => {
          setSuccessMessage('')
          seterror('')
        }, 3000);
      }
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  const deleteloaisanpham = async (id) => {
    setLoading(true);
    try {
      const response = await Apiloaisanpham.delete(id)
      setSuccessMessage('Xoá danh mục thành công');
      getloaisanpham();
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }

  useEffect(() => {
    getdanhmuc();
    getloaisanpham();
  }, [])

  const onchandanhmuc = (e) => {
    setvaluedanhmuc(e.target.value)
  }

  const onchantenloaisanpham = (e) => {
    settenloaisanpham(e.target.value);
  }

  const onChanCapnhat = () => {
    setCapnhat(false)
  }

  const onGetIdloaisanpham = async (id) => {
    setCapnhat(true)
    setLoading(true);
    try {
      const getId = await Apiloaisanpham.getId(id)
      if (getId) {
        const getIddanhmuc = await Apidanhmuc.getDanhmucId(getId.danhmucId)
        setidloaisanpham(getId.id)
        setputtenloaisanpham(getId.tenloaisanpham)
        setputtendanhmuc(getIddanhmuc.tendanhmuc)
        if (getIddanhmuc) {
          setLoading(false);
        }
      }
    } catch {
      console.error("Error fetching token info:", error);
    }
  }

  const Puttenloaisanpham = (e) => {
    setputtenloaisanpham(e.target.value)
  }

  const Puttendanhmuc = (e) => {
    setputtendanhmuc(e.target.value)
  }

  const onCapnhatloaisanpham = async () => {
    setCapnhat(true)
    try {
      const putLoading = await Apiloaisanpham.putloaisanpham(idloaisanpham, puttenloaisanpham, puttendanhmuc)
      setSuccessMessage('Cập nhật thành công');
      getloaisanpham();
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000);
    } catch {
      setSuccessMessage('Cập nhật không thành công');
      getloaisanpham();
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000);
    }
  }



  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {loading && <div className="loading-overlay">Loading...</div>}
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
                  <input id="username" value={puttenloaisanpham} onChange={Puttenloaisanpham} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                </div>

                <div className='w-full'>
                  <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Danh mục</label>
                  <select value={puttendanhmuc} onChange={Puttendanhmuc} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    <option hidden>Chọn danh mục</option>
                    {datadanhmuc.map((muclucdata) => {
                      return (
                        <option key={muclucdata.id} value={muclucdata.tendanhmuc} >{muclucdata.tendanhmuc}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={onCapnhatloaisanpham} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
              </div>
            </div>
            <div className='flex flex-col'>

            </div>
          </div>
        </div>
      </div>}
      <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-3">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">LOẠI SÀN PHÂM ĐIỆN THOẠI</h1>
        {error && <div className="success-message">{error}</div>}
        <div>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-white dark:text-gray-200">Tên loại sản phẩm</label>
              <input value={tenloaisanpham} onChange={onchantenloaisanpham} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Danh mục</label>
              <select value={valuedanhmuc} onChange={onchandanhmuc} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option hidden>Chọn danh mục</option>
                {datadanhmuc.map((muclucdata) => {
                  return (
                    <option key={muclucdata.id} value={muclucdata.tendanhmuc} >{muclucdata.tendanhmuc}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={postloaisanpham} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
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
                Tên Loại Sản Phẩm
              </th>
              <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Tên Danh Mục
              </th>
              <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Xoá
              </th>
            </tr>
          </thead>

          {datatendanhmuc && <tbody>
            {datatendanhmuc.map((danhmucdata) => {
              return (
                <tr key={danhmucdata.id}>
                  <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {danhmucdata.id}
                  </th>
                  <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {danhmucdata.tenloaisanpham}
                  </td>
                  <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {danhmucdata.danhmucName}
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button onClick={() => onGetIdloaisanpham(danhmucdata.id)} className="px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-lime-500 rounded-md hover:bg-lime-800 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                    <button onClick={() => deleteloaisanpham(danhmucdata.id)} className="ml-2 px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
                  </td>
                </tr>
              )
            })}
          </tbody>}

        </table>
      </div>
    </div>
  );
}

export default Loaisanphamdt;
