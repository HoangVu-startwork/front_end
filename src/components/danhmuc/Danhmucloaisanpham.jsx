'use client'
import { useState, useEffect } from 'react';
import Loaisanpham from "@/service/loaisanpham"
import Danhmuc from "@/service/danhmuc"
import '@/components/css/Danhmucloaisanpham.css'
import Link from 'next/link'

function Danhmucloaisanpham({ id }) {
    const [danhmucloaisanpham, setDanhmucloaisanpham] = useState([]);
    const [danhmuc, setDanhmuc] = useState("")

    const getdanhmucloaisanpham = async () => {
        try {
            const response = await Loaisanpham.getdanhmucloaisanpham(id);
            setDanhmucloaisanpham(response.result);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    const getdanhmuc = async () => {
        try {
            const response = await Danhmuc.getDanhmuc(id);
            setDanhmuc(response.result)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }


    useEffect(() => {
        getdanhmucloaisanpham()
        getdanhmuc()
    }, [])
    return (
        <section className="relative bg-white">
            <h2 className='text-3xl text-black mt-3'>{danhmuc.tendanhmuc}</h2>
            <div className="section-danhmuc-loaisanpham-dienthoai mt-3">
                <ul className="tendanhmuc-loaisanpham-dienthoai flex gap-4">
                    {danhmucloaisanpham.map((item, index) => (
                        <li key={item.id} className='text-lg border rounded-xl text-black border-black pt-1 pr-6 pl-6 pb-1'>
                            <Link href={`/danhmuc/${id}/loaisanpham/${item.id}`}>
                                {item.tenloaisanpham}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Danhmucloaisanpham