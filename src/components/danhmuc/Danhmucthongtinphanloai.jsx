'use client'
import { useState, useEffect } from 'react';
import Loaisanpham from "@/service/loaisanpham"
import Thongtinphanloai from "@/service/thongtinphanloai"
import '@/components/css/Danhmucloaisanpham.css'
import Link from 'next/link'

function Locloaisanpham({ id, idanhmuc }) {
    const [thongtinloaisanpham, setThongtinloaisanpham] = useState([]);
    const [loaisanpham, setLoaisanpham] = useState("")

    const getthongtinloaisanpham = async () => {
        try {
            const response = await Thongtinphanloai.getThongtinphanloaisanpham(id);
            setThongtinloaisanpham(response);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    const getloaisanpham = async () => {
        try {
            const response = await Loaisanpham.getId(id);
            setLoaisanpham(response)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }


    useEffect(() => {
        getthongtinloaisanpham()
        getloaisanpham()
    }, [])
    return (
        <section className="relative bg-white">
            <h2 className='text-3xl text-black mt-3'>{loaisanpham.tenloaisanpham}</h2>
            <div className="section-danhmuc-loaisanpham-dienthoai mt-3">
                <ul className="tendanhmuc-loaisanpham-dienthoai flex gap-4">
                    {thongtinloaisanpham.map((item, index) => (
                        <li key={item.id} className='text-lg border rounded-xl text-black border-black pt-1 pr-6 pl-6 pb-1'>
                            <Link href={`/danhmuc/${idanhmuc}/loaisanpham/${item.loaisanphamId}/thongtinphanloai/${item.id}`}>
                                {item.tenphanloai}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Locloaisanpham