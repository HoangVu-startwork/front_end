'use client'
import { useState, useEffect, useRef } from 'react';
import Giohang from '@/service/giohang';
import Auth from "@/service/auth";

function page() {
    const [data, setData] = useState([]);
    const [datacode, setDatacode] = useState<number | null>(null);

    const fetchgiohang = async () => {
        try {
            const data = await Giohang.getGiohang();
            console.log(data);
        } catch (error) {

        }
    }
    
    useEffect(() => {

    }, [])

    const fetchTokenInfo = async () => {
        try {
          const data = await Auth.gettoken();
          setDatacode(data.code);
        } catch (error) {
          console.error("Error fetching token info:", error);
        }
      };

    useEffect(() => {
        const timestampStr = window.localStorage.getItem("exp");
        const token = window.localStorage.getItem("tokenadmin");
        if (timestampStr) {
            const timestamp = parseInt(timestampStr, 10);
            const date = new Date(timestamp * 1000);
            const currentDate = new Date();
            if (date >= currentDate) {
                if (token && token.trim() !== "") {
                    fetchTokenInfo();
                } else {
                    window.localStorage.removeItem("tokenadmin");
                    window.localStorage.removeItem("exp");
                    window.location.href = "/signin";
                }
            } else {
                window.localStorage.removeItem("tokenadmin");
                window.localStorage.removeItem("exp");
                window.location.href = "/signin";
            }
        } else {
            window.localStorage.removeItem("tokenadmin");
            window.localStorage.removeItem("exp");
            window.location.href = "/signin";
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="block gap-[50px] flex-row flex-nowrap justify-start items-stretch content-stretch">
                <div className="grow">1</div>
                <div className="grow">2</div>
                <div className="grow">3</div>
            </div>
        </div>
    )
}

export default page