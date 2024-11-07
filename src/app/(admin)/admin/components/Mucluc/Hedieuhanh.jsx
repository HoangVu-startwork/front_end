import React from 'react'
import { useEffect, useState } from 'react'
import apiHedieuhanh from '@/service/hedieuhanh'
import '@/app/(admin)/css/user.css'
import Mucluc from '@/service/mucluc'

function Hedieuhanh() {
  const [tenhedieuhanh, setHedieuhanh] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [getMessage, setgetMessage] = useState('');
  const [showHedieuhanh, setshowHedieuhanh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hetdieuhanh, sethedieuhanh] = useState(false);
  const [datahedieuhanh, setdatahedieuhanh] = useState("")

  const themHedieuhanh = async () => {
    try {
      if (!tenhedieuhanh) {
        setSuccessMessage("Không thể để trống");
      } else {
        const data = await apiHedieuhanh.postHedieuhanh(tenhedieuhanh)
        setSuccessMessage('Thêm hệ điều hành thành công')
        setHedieuhanh('')
        setLoading(false);
        setSuccessMessage('');
        getHedieuhanh();
      }
    } catch {
      setSuccessMessage('Thêm hệ điều hành không thành công')
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000)
    }
  }

  const getHedieuhanh = async () => {
    setLoading(true);
    try {
      const datahedieuhanh = await apiHedieuhanh.getHedieuhanh();
      setshowHedieuhanh(datahedieuhanh);
      setLoading(false); // Tắt loading ngay khi dữ liệu được trả về
    } catch {
      setSuccessMessage('Không truy vấn được dữ liệu');
      setTimeout(() => {
        setSuccessMessage("")
        setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
      }, 5000);
    }
  };

  const deleteHedieuhanh = async (id) => {
    try {
      const deleteHedieuhanhs = apiHedieuhanh.delete(id);
      setSuccessMessage('Xoá mục lục thành công')
      setHedieuhanh('')
      setTimeout(() => {
        getHedieuhanh()
        setSuccessMessage('');
      }, 3000)
    } catch {
      setgetMessage('Không truy vấn được dữ liệu')
    }
  }

  useEffect(() => {
    getHedieuhanh()
  }, [])


  const handMohethong = async (id) => {
    const hedieuhanh = showHedieuhanh.find(data => data.id === id);
    setdatahedieuhanh(hedieuhanh.tenhedieuhanh)
    sethedieuhanh(prev => ({ ...prev, [id]: true }));
  }

  const hanhdCapnhahethong = async (e) => {
    setdatahedieuhanh(e.target.value)
  }

  const handTachethong = async () => {
    sethedieuhanh(false)
  }

  const handCapnhat = async (id) => {
    setLoading(true);
    try {
      const datahedieu = await apiHedieuhanh.putHedieuhanh(id, datahedieuhanh);
      setSuccessMessage('Cập nhật dữ liệu thành công');
      getHedieuhanh()
      setTimeout(() => {
        setSuccessMessage("")
        setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
      }, 5000);
    } catch {
      setSuccessMessage('Không truy vấn được dữ liệu');
      setTimeout(() => {
        setSuccessMessage("")
        setLoading(false); // Tắt loading sau 5 giây nếu có lỗi
      }, 5000);
    }
  }




  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <section className=" p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-3">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">HỆ ĐIỀU HÀNH SÀN PHẢM ĐIỆN THOẠI</h1>
        <div>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-white dark:text-gray-200">Tên hệ điều hành</label>
              <input onChange={(e) => setHedieuhanh(e.target.value)} value={tenhedieuhanh} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={themHedieuhanh} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
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
                    Tên Hệ Điều Hành
                  </th>
                  <th className="px-6 text-red-600 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Xoá
                  </th>
                </tr>
              </thead>
              <tbody>
                {showHedieuhanh.map((hedieuhanh) => {
                  return (
                    <tr key={hedieuhanh.id}>
                      <th className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {hedieuhanh.id}
                      </th>
                      <td className="border-t-0 text-black px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {hedieuhanh.tenhedieuhanh}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {hetdieuhanh[hedieuhanh.id] && (
                          <div className="loading-hethong">
                            <div className='!z-5 relative loading-hethongs flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                              <div className='ml-auto'>
                                <div className='relative flex'>
                                  <div className="mb-3 text-right">
                                    <button onClick={handTachethong} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                                <h2 className='textthemmausac'>Chỉnh sửa thông tin hệ điều hành</h2>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                  <div>
                                    <label className="text-white dark:text-gray-200">Tên hệ điều hành</label>
                                    <input onChange={hanhdCapnhahethong} value={datahedieuhanh} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                  </div>
                                </div>
                                <div className='mt-9'>
                                  <button onClick={() => handCapnhat(hedieuhanh.id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật thông tin hệ điều hành</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <button onClick={() => handMohethong(hedieuhanh.id)} className="px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-gray-600">Cập nhập</button>
                        <button onClick={() => deleteHedieuhanh(hedieuhanh.id)} className="ml-5 px-1 py-1 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Xoá</button>
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

export default Hedieuhanh