'use client'
import { useState, useEffect } from 'react';
import Danhmuc from "../../service/danhmuc"
import '../css/sanphamdienthoai.css'
import '../css/danhmucdienthoai.css'
import Link from 'next/link'

function Danhmucdienthoai() {
    const [danhmuc, setDanhmuc] = useState([])

    const getdanhmuc = async () => {
        try {
            const response = await Danhmuc.getAlldanhmucdienthoai();
            setDanhmuc(response.result)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }


    useEffect(() => {
        getdanhmuc()
    }, [])
    return (
        <div className='container_menu'>
            <section className=" relative bg-white">
                <div className=" text-center">
                    <div className="section">
                        {danhmuc.map((item, index) => (
                            <div key={item.id} className="logo-item">
                                <Link href={'home'}>
                                    <img className="object-contain" src={`${item.hinhanh}`} alt="" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Danhmucdienthoai