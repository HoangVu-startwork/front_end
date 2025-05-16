import React from "react";
import '@/app/(dienthoai)/css/chietsanpham.css'

interface DacdiemnoibatProps {
    data: any;
}

const Dacdiemnoibat: React.FC<DacdiemnoibatProps> = ({ data }) => {
    return (
        <>
            <div
            
                dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.dacdiennoibat || "" }}
            />
        </>
    )
}


export default Dacdiemnoibat;