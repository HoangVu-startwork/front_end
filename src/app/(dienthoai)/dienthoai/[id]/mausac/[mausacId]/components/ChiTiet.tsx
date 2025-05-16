import React from "react";
import '@/app/(dienthoai)/css/chietsanpham.css'
interface ChiTietProps {
    data: any;
}

const ChiTiet: React.FC<ChiTietProps> = ({ data }) => {
    return (
        <>
            <div className="textchitiet"
            
                dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.chitiet || "" }}
            />
        </>
    )
}


export default ChiTiet;