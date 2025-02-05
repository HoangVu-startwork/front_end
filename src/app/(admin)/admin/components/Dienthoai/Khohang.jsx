import { useEffect, useState } from 'react';
import Apikhohang from '@/service/nhapkho';
import Apidienthoai from '@/service/dienthoai';
import ApiMausac from '@/service/mausac';
import '@/app/(admin)/css/quancao.css'

function Khohang() {
  const [dataKhohang, setDataKhohang] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 50;

  const getKhohang = async () => {
    setLoading(true)
    try {
      const datakhohang = await Apikhohang.getKhodienthoai();
      const datadienthoais = await Apidienthoai.getAlldienthoai();
      const dataMausac = await ApiMausac.getMausac();

      const result = datakhohang.map(khohang => {
        const phone = datadienthoais.find(phone => phone.id === khohang.dienthoaiId);
        const mausac = dataMausac.find(mausac => mausac.id === khohang.mausacId);
        return {
          ...khohang,
          tensanpham: phone ? phone.tensanpham : 'Không tìm thấy tên sản phẩm',
          tenmausac: mausac ? mausac.tenmausac : 'Không tìm thấy màu sản phẩm'
        };
      });
      setDataKhohang(result);
      if (result) {
        setLoading(false)
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  useEffect(() => {
    getKhohang();
  }, []);

  const filteredData = dataKhohang.filter(khohang =>
    khohang.tensanpham.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      {loading && <div className="loading-overlay-quancao">
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-56 w-56'></div>
      </div>}
      <h1 className="text-3xl mt-3 mb-2 font-bold text-center text-black capitalize dark:text-black">KHO ĐIỆN THOẠI</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên sản phẩm..."
          className="px-3 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
                Tổng sản phẩm
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Sản phẩm còn
              </th>
              <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                Đã bán
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((khohang, index) => (

              <tr key={khohang.dienthoaiId + '-' + khohang.mausacId}>
                <td className="border px-1 py-3 text-center text-black align-middle border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{indexOfFirstItem + index + 1}</td>
                <td className="border px-1 py-3 text-center text-black align-middle border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{khohang.tensanpham}</td>
                <td className="border px-1 py-3 text-center text-lime-900 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{khohang.tenmausac}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{khohang.tongsoluong}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">{khohang.soluong}</td>
                <td className="border px-1 py-3 text-center text-red-700 align-middle font-semibold border-gray-200 text-xs whitespace-nowrap text-blueGray-700">
                  {khohang.tongsoluong - khohang.soluong}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}

export default Khohang;
