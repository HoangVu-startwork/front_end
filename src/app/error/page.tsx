import React from 'react'
import Link from 'next/link'

function page() {
    return (
        <div>
            <div className=" w-full px-1 md:px-0 h-screen flex items-center justify-center">
                <div className="bg-white border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg">
                    <p className="text-7xl md:text-7xl lg:text-7xl font-bold tracking-wider text-red-600">404</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-500 mt-4 text-center">Bạn chắc đã nhập đúng đường dẫn chứ?</p>
                    <p className="text-gray-500 mt-4 pb-1 text-center">Đường dẫn bạn vừa nhập không còn tồn tại.</p>
                    <p className="text-gray-500 pb-4 border-b-2 text-center">Vui lòng liên hệ bộ phận hỗ trợ hoặc tham khảo thêm các chương trình khuyến mãi khác.</p>
                    <a href="/" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                        <span>Tham khảo sản phẩm</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default page