import React from 'react'
import { useState, useEffect } from 'react';

function kiemtradn({ nurfelse }) {
    const [isLoadingDangnhap, setLoadingDangnhap] = useState(true);

    return (
        <div>
            {isLoadingDangnhap && <div className="flex flex-col justify-center items-center h-[100vh] duration-300 hover:rotate-1 lg:p-8">
                <div className='!z-5 max-w-[378px] max-h-[330px] relative flex h-full w-full bg-gray-900 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                    <div className='ml-auto'>
                        <div className='relative flex'>
                            <div className="mb-3 text-right">
                                <button onClick={nurfelse} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
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
                        <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                        <h4 className='mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white'>
                            Smember
                        </h4>
                        <p className='px-5 mt-4 text-center text-xl font-normal dark:text-white md:!px-0 xl:!px-8'>
                            Vui lòng đăng nhập tài khoản Smember để thêm sản phẩm yêu thích.
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                                Đăng nhập
                            </button>
                            <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}


export default kiemtradn