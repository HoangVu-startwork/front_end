import { useEffect, useState } from 'react';
import Apidienthoai from '@/service/dienthoai'
import ApiMausac from '@/service/mausac'
import ApiKhohang from '@/service/nhapkho'
import '@/app/(admin)/css/nhapkho.css'

function Nhapkho() {
  const [datadienthoai, setdatadienthoai] = useState([])
  const [datanhapkhohang, setdatanhapkhohang] = useState([])
  const [datamausac, setdatamausac] = useState([])
  const [iddienthoai, setiddienthoai] = useState('');
  const [idmausac, setidmausac] = useState('');
  const [themnhapkho, setthemnhapkho] = useState(false);
  const [soluong, setsoluong] = useState('');
  const [loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 50;
  const [searchTermDate, setSearchTermDate] = useState('');

  const [capnhatnhapkho, setcapnhatnhapkho] = useState(false);

  const handChaniddienthoai = (e) => {
    setiddienthoai(e.target.value)
    handMausac(e.target.value)
  }

  const handChanidmausac = (e) => {
    setidmausac(e.target.value)
  }

  const handgetdienthoai = async () => {
    try {
      const data = await Apidienthoai.getAlldienthoai()
      setdatadienthoai(data)
      console.log(data)
    } catch {
      console.error("Lỗi :", error)
    }
  }

  const handNhapkhohang = async () => {
    setLoading(true)
    try {
      const datanhapkhohang = await ApiKhohang.getNhaokhoKhodienthoai()
      setdatanhapkhohang(datanhapkhohang)
      setLoading(false)
      console.log(datanhapkhohang)
    } catch {

    }
  }

  const handMausac = async (id) => {
    try {
      const dataMausac = await ApiMausac.getMausac_DienthoaiId(id)
      setdatamausac(dataMausac)
      console.log(dataMausac)
    } catch {

    }
  }

  const handthemnhapkho = async () => {
    setthemnhapkho(true)
  }

  const handTatthemnhapkho = async () => {
    setthemnhapkho(false)
  }

  const themsoluongvaokho = async () => {
    setLoading(true)
    try {
      if (!iddienthoai || !idmausac || !soluong) {
        setMessage('Không thể để dữ liệu trống')
        setLoading(false)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      } else {
        const data = await ApiKhohang.postKhodienthoai(iddienthoai, idmausac, soluong)
        console.log(data)
        setMessage('Thêm thành công')
        handNhapkhohang()
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
    } catch {
      setMessage('Thêm không thành công')
      setTimeout(() => {
        setMessage('')
        setLoading(false)
      }, 5000);
    }
  }

  const capnhatsoluongvaokho = async () => {
    setLoading(true)
    try {
      if (!iddienthoai || !idmausac || !soluong) {
        setMessage('Không thể để dữ liệu trống')
        setLoading(false)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      } else {
        const data = await ApiKhohang.putKhodienthoai(iddienthoai, idmausac, soluong)
        setMessage('Cập nhật thành công')
        setLoading(false)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
    } catch {
      setMessage('Cập nhật không thành công')
      setLoading(false)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }
  }

  useEffect(() => {
    handgetdienthoai()
    handNhapkhohang()
  }, [])

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const filteredData = datanhapkhohang.filter(khohang => {
    const khohangDate = new Date(khohang.dob).toISOString().split('T')[0]; // Định dạng ngày từ dữ liệu
    const isDateMatch = khohangDate.includes(searchTermDate); // Kiểm tra ngày
    const isSearchTermMatch = khohang.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()); // Kiểm tra tìm kiếm

    return isDateMatch && isSearchTermMatch;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      {loading && <div className="loading-overlay-nhapkho">
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-56 w-56'></div>
      </div>}
      {Message && <div className="success-message">{Message}</div>}
      <h1 className="text-3xl mt-3 mb-2 font-bold text-center text-black capitalize dark:text-black">Lịch sử nhập kho</h1>
      <div className='mt-9'>
        <button onClick={handthemnhapkho} className="button-themthuonghieu px-8 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600">Thêm số lương điện thoại</button>
      </div>
      {themnhapkho && (
        <div className="loading-themnhapkho">
          <div className='!z-5 relative loading-themnhapkhos flex h-full w-full bg-slate-400 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
            <div className='ml-auto'>
              <div className='relative flex'>
                <div className="mb-3 text-right">
                  <button onClick={handTatthemnhapkho} className="text-gray-900 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
              <h2 className='text-2xl mt-3 mb-2 font-bold text-center text-zinc-700 capitalize dark:text-white'>Thêm số lượng điện thoại</h2>
              <div className='w-full mt-9'>
                <label className="text-xl text-zinc-700 dark:text-gray-200" htmlFor="passwordConfirmation">Chọn sản phẩm</label>
                <select value={iddienthoai} onChange={handChaniddienthoai} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option hidden>Chọn sản phẩm</option>
                  {datadienthoai.map((dienthoai) => {
                    return (
                      <option key={dienthoai.id} value={dienthoai.id} >{dienthoai.tensanpham}</option>
                    )
                  })}
                </select>
              </div>
              <div className='w-full mt-9'>
                <label className="text-xl text-zinc-700 dark:text-gray-200" htmlFor="passwordConfirmation">Chọn màu sắc</label>
                <select value={idmausac} onChange={handChanidmausac} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option hidden>Chọn màu sắc</option>
                  {datamausac.map((mausac) => {
                    return (
                      <option key={mausac.id} value={mausac.id} >{mausac.tenmausac}</option>
                    )
                  })}
                </select>
              </div>
              <div className='mt-9'>
                <label className="text-xl text-zinc-700 dark:text-gray-200" htmlFor="username">Số lượng</label>
                <input id="username" type="text" onChange={(e) => setsoluong(e.target.value)} placeholder='Số lượng' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>
              <div className='mt-9'>
                <button onClick={themsoluongvaokho} className="button-themthuonghieu px-8 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600">Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên sản phẩm..."
          className="px-3 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          className="px-3 py-2 border rounded w-full"
          value={searchTermDate}
          onChange={(e) => setSearchTermDate(e.target.value)}
        />
      </div>

      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse">
          <thead className="text-center">
            <tr className="justify-center">
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                STT
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Điện thoại
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Màu sắc
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Ngày nhập kho
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Số lượng vào kho
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Quản lý
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((nhapkho, index) => (
              <tr key={index}>
                <td className="border px-1 py-3 text-center text-black align-middle border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{indexOfFirstItem + index + 1}</td>
                <td className="border px-1 py-3 text-center text-black align-middle border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{nhapkho.tenSanPham}</td>
                <td className="border px-1 py-3 text-center text-lime-900 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{nhapkho.tenMauSac}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{formatDateTime(nhapkho.dob)}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{nhapkho.soluong}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">
                <button className="px-2 py-2 text-center leading-5 text-white transition-colors duration-200 transform bg-emerald-950 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nhapkho