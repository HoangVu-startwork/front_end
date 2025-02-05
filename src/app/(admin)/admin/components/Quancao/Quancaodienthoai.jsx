import { useEffect, useState } from 'react'
import ApiQuancao from '@/service/quancaodienthoai'
import Apidienthoai from '@/service/dienthoai'
import Apihinhanh from '@/service/hinhanh'
import '@/app/(admin)/css/quancao.css'

function Quancaodienthoai() {
    const [dataquancao, setdataquancao] = useState([])
    const [searchTerm, setSearchTerm] = useState('') // State lưu giá trị tìm kiếm
    const [filteredData, setFilteredData] = useState([]) // State lưu kết quả tìm kiếm
    const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
    const itemsPerPage = 15 // Số mục trên mỗi trang
    const [themquancao, setthemquancao] = useState(false);
    const [datadienthoai, setdatadienthoai] = useState([]);
    const [iddienthoai, setiddienthoai] = useState('');
    const [image, setimage] = useState(null);
    const [tinhtrangs, settinhtrang] = useState('');
    const [tenthuonghieu, settenthuonghieu] = useState('');
    const [loading, setLoading] = useState(false);
    const [Message, setMessage] = useState("");

    const onChantinhtrang = (e) => {
        settinhtrang(e.target.value);
    }

    const handgetQuancao = async () => {
        setLoading(true)
        try {
            const data = await ApiQuancao.getThuonghieudienthoai()
            setdataquancao(data)
            setLoading(false)
            setFilteredData(data) // Ban đầu hiển thị toàn bộ dữ liệu
        } catch (error) {
            console.error("Lỗi :", error)
        }
    }

    const handgetdienthoai = async () => {
        try {
            const data = await Apidienthoai.getAlldienthoai()
            setdatadienthoai(data)
        } catch {
            console.error("Lỗi :", error)
        }
    }

    useEffect(() => {
        handgetQuancao()
        handgetdienthoai()
    }, [])

    useEffect(() => {
        // Lọc dữ liệu dựa trên từ khóa tìm kiếm
        const filtered = dataquancao.filter((quancao) =>
            quancao.tenthuonghieu.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredData(filtered)
        setCurrentPage(1) // Reset lại trang hiện tại khi tìm kiếm
    }, [searchTerm, dataquancao]) // Cập nhật khi searchTerm hoặc dataquancao thay đổi

    // Tính toán các mục hiển thị dựa trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    // Tổng số trang
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    // Hàm chuyển trang
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const handChaniddienthoai = (e) => {
        setiddienthoai(e.target.value)
    }

    const handHienfrom = async () => {
        setiddienthoai('')
        settenthuonghieu('')
        settinhtrang('')
        setimage('')
        setthemquancao(true)
    }

    const handTatHienfrom = async () => {
        setthemquancao(false)
    }

    const handleFileChange = (event) => {
        setimage(event.target.files[0]);
    };



    const handThemthuonghieu = async () => {
        setLoading(true)
        try {
            if (!image && !tinhtrangs && !tenthuonghieu && !iddienthoai) {
                setMessage('Không thể để dữ liệu trống')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            } else {
                const dataimage = await Apihinhanh.postthuonghieu(image)
                if (dataimage) {
                    const images = dataimage.data
                    const datathuonghieu = await ApiQuancao.postThuonghieudienthoai(images, tinhtrangs, tenthuonghieu, iddienthoai)
                    setMessage('Thêm thương hiệu thành công')
                    handgetQuancao()
                    setLoading(false)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
            }


            // const data = await Apihinhanh.postthuonghieu(image)
            // if (data) {

            //     setMessage('Thêm thành công')
            //     setTimeout(() => {
            //         setLoading(false)
            //     }, 5000);
            // }
        } catch {

        }
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const [suaquancao, setsuaquancao] = useState(false);
    const [datacapnhatquancao, setdatacapnhatquancao] = useState([]);


    const getIdquancaothuonghieu = async (id) => {
        setLoading(true)
        try {
            const datathuonghieu = await ApiQuancao.getIdThuonghieudienthoai(id)
            setiddienthoai(datathuonghieu.result.dienthoaiId)
            settenthuonghieu(datathuonghieu.result.tenthuonghieu)
            settinhtrang(datathuonghieu.result.tinhtrang)
            setimage(datathuonghieu.result.hinhanh)
            setdatacapnhatquancao(datathuonghieu.result)
            setLoading(false)
        } catch {

        }
    }

    const handchinhsuathuonghieu = async (id) => {
        setsuaquancao(prev => ({ ...prev, [id]: true }));
        getIdquancaothuonghieu(id)
    }

    const handTatchinhsuathuonghieu = async () => {
        setsuaquancao(false)
    }

    const putchinhsuathuonghieub = async (id) => {
        setLoading(true)
        try {
            if (image === undefined || image === datacapnhatquancao.hinhanh) {
                const capnhathinhanh = datacapnhatquancao.hinhanh;
                const responsecanhat = await ApiQuancao.putThuonghieudienthoai(id, tinhtrangs, tenthuonghieu, iddienthoai, capnhathinhanh);
                setMessage('Cập nhật thương hiệu thành công')
                setTimeout(() => {
                    handgetQuancao()
                    setMessage('')
                }, 5000);

            } else if (image !== undefined && image !== datacapnhatquancao.hinhanh) {
                const responsedelete = await Apihinhanh.deleteanh(datacapnhatquancao.hinhanh);
                if (responsedelete) {
                    const responsehinhanh = await Apihinhanh.postthuonghieu(image);
                    if (responsehinhanh) {
                        const capnhathinhanh = responsehinhanh.data;
                        const responsecanhat = await ApiQuancao.putThuonghieudienthoai(id, tinhtrangs, tenthuonghieu, iddienthoai, capnhathinhanh);
                            setMessage('Cập nhật thương hiệu thành công')
                            handgetQuancao()
                            setTimeout(() => {
                                setMessage('')
                            }, 5000);
                    }
                }
            }
        } catch {
            setMessage('Cập nhật thương hiệu không thành công')
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    const handdelete = async (id, hinhanh) => {
        setLoading(true)
        try {
            const responsedelete = await Apihinhanh.deleteanh(hinhanh);
            if (responsedelete) {
                const deletethuonghieu = await ApiQuancao.deleteThuonghieudienthoai(id)
                setMessage('Xoá thương hiệu thành công')
                handgetQuancao()
                setTimeout(() => {
                    setMessage('')
                    setLoading(false)
                }, 5000);
            }
        } catch {
            setMessage('Xoá thương hiệu không thành công')
            handgetQuancao()
            setTimeout(() => {
                setLoading(false)
                setMessage('')
            }, 5000);
        }
    }


    return (
        <div>
            {loading && <div className="loading-overlay-quancao">
                <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-56 w-56'></div>
            </div>}
            {Message && <div className="success-message">{Message}</div>}
            <div>
                <h2 className='text-4xl mt-3 mb-3'>Quản cáo thương hiệu điện thoại</h2>
            </div>
            {themquancao && (
                <div className="loading-themquancao">
                    <div className='!z-5 relative loading-themquancaos flex h-full w-full bg-slate-950 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                        <div className='ml-auto'>
                            <div className='relative flex'>
                                <div className="mb-3 text-right">
                                    <button onClick={handTatHienfrom} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                            <h2 className='textthemquancao'>Thêm thương hiệu điện thoại</h2>
                            <div className='mt-9'>
                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Tên thương hiệu</label>
                                <input id="username" type="text" onChange={(e) => settenthuonghieu(e.target.value)} placeholder='Tên thương hiệu' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='mt-9'>
                                <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh</label>
                                <input onChange={handleFileChange} type="file" className="block w-full text-lg px-1 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='w-full mt-9'>
                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Chọn sản phẩm</label>
                                <select value={iddienthoai} onChange={handChaniddienthoai} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option hidden>Chọn sản phẩm của thương hiệu</option>
                                    {datadienthoai.map((dienthoai) => {
                                        return (
                                            <option key={dienthoai.id} value={dienthoai.id} >{dienthoai.tensanpham}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mt-9'>
                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Trạng khái hiện thị điện thoại</label>
                                <select value={tinhtrangs} onChange={onChantinhtrang} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                    <option hidden>Chọn tình trạng hiện thị máy</option>
                                    <option value="Mở">Mờ</option>
                                    <option value="Ẩn">Ẩn</option>
                                </select>
                            </div>
                            <div className='mt-9'>
                                <button onClick={handThemthuonghieu} className="button-themthuonghieu px-8 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <h2 className='text-xl mt-3 mb-3'>Thêm quản cáo thương hiệu điện thoại</h2>
                <div>
                    <button onClick={handHienfrom} className="button-themquancao text-2xl px-3 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300">Thêm quản cáo điện thoại</button>
                </div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên thương hiệu"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead className="text-center">
                        <tr className="justify-center">
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                ID
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Điện thoại
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle border-r border-gray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Hình ảnh
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Thương hiệu
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Tình trạng
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Ngày thêm thương hiệu
                            </th>
                            <th className="px-1 border text-black bg-blueGray-50 text-blueGray-500 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-center">
                                Quản lý
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((quancao) => (
                            <tr key={quancao.id}>
                                <td className="border text-black px-1 align-middle border-gray-200 text-base whitespace-nowrap text-left text-blueGray-700">
                                    {quancao.id}
                                </td>
                                <td className="border text-black px-1 align-middle border-gray-200 text-base whitespace-nowrap text-left text-blueGray-700">
                                    {quancao.tenSanPham}
                                </td>
                                <td className="border text-black px-2 p-2 align-middle border-gray-200 text-xs whitespace-nowrap text-left text-blueGray-700">
                                    <img src={quancao.hinhanh} alt={quancao.tenthuonghieu} className="img-quancao" />
                                </td>
                                <td className="border text-black px-1 align-middle border-gray-200 text-base whitespace-nowrap text-left text-blueGray-700">
                                    {quancao.tenthuonghieu}
                                </td>
                                <td
                                    className={`border text-black px-1 align-middle border-gray-200 text-base whitespace-nowrap text-left text-blueGray-700 ${quancao.tinhtrang === 'Mở' ? 'text-emerald-500' : 'text-red-500'
                                        } ${quancao.tinhtrang === 'Đóng' ? 'hidden' : ''}`}
                                >
                                    {quancao.tinhtrang}
                                </td>
                                {/* <td className="border text-black px-6 align-middle border-gray-200 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                    {quancao.tinhtrang}
                                </td> */}
                                <td className="border text-black px-1 align-middle border-gray-200 text-base whitespace-nowrap p-4 text-left text-blueGray-700">
                                    {formatDateTime(quancao.dob)}
                                </td>

                                <td className="border text-black px-1 align-middle border-gray-200 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                    {suaquancao[quancao.id] && (
                                        <div className="loading-themquancao">
                                            <div className='!z-5 relative loading-themquancaos flex h-full w-full bg-slate-950 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                <div className='ml-auto'>
                                                    <div className='relative flex'>
                                                        <div className="mb-3 text-right">
                                                            <button onClick={handTatchinhsuathuonghieu} className="text-stone-900 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                                                    <h2 className='textthemquancao'>Cập nhật thương hiệu điện thoại</h2>
                                                    <div className='mt-9'>
                                                        <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Tên thương hiệu</label>
                                                        <input id="username" value={tenthuonghieu} type="text" onChange={(e) => settenthuonghieu(e.target.value)} placeholder='Tên thương hiệu' className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                    </div>

                                                    <div className='mt-9'>
                                                        <label className="text-white text-xl dark:text-gray-200" htmlFor="username">Chọn hình ảnh</label>
                                                        <div className='mt-2'>
                                                            <img className="img-thuonghieu" src={datacapnhatquancao.hinhanh} />
                                                        </div><br />
                                                        <input onChange={handleFileChange} type="file" className="block w-full text-lg px-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                    </div>
                                                    <div className='w-full mt-9'>
                                                        <label className="text-white text-xl dark:text-gray-200" htmlFor="passwordConfirmation">Chọn sản phẩm</label>
                                                        <select value={iddienthoai} onChange={handChaniddienthoai} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                            <option hidden>Chọn sản phẩm của thương hiệu</option>
                                                            {datadienthoai.map((dienthoai) => {
                                                                return (
                                                                    <option key={dienthoai.id} value={dienthoai.id} >{dienthoai.tensanpham}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className='mt-9'>
                                                        <label className="text-white text-xl dark:text-gray-200" htmlFor="passwordConfirmation">Trạng khái hiện thị điện thoại</label>
                                                        <select value={tinhtrangs || ''} onChange={onChantinhtrang} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                            <option hidden>Chọn tình trạng hiện thị máy</option>
                                                            <option value="Mở">Mờ</option>
                                                            <option value="Ẩn">Ẩn</option>
                                                        </select>
                                                    </div>
                                                    <div className='mt-9'>
                                                        <button onClick={() => putchinhsuathuonghieub(datacapnhatquancao.id)} className="button-themthuonghieu px-8 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button onClick={() => handchinhsuathuonghieu(quancao.id)} className="button-quancao px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-emerald-950 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Sửa</button>
                                    <button onClick={() => handdelete(quancao.id, quancao.hinhanh)} className="button-quancao px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Xoá</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Phân trang */}
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}

export default Quancaodienthoai
