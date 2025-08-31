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
            const response = await Danhmuc.getAlldanhmuc();
            setDanhmuc(response.result);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }


    useEffect(() => {
        getdanhmuc()
    }, [])
    return (
            <section className="relative bg-white">
                    <div className="section-danhmuc-dienthoai">
                        {danhmuc.map((item, index) => (
                            <ul key={item.id} className="tendanhmuc-dienthoai">
                                <li>
                                <Link href={`/danhmuc/${item.id}`}>
                                    {item.tendanhmuc}
                                </Link>
                                </li>
                            </ul>
                        ))}
                </div>
            </section>
    )
}

export default Danhmucdienthoai