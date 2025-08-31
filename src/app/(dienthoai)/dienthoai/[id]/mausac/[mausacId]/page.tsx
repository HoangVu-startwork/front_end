'use client'
import { useState, useEffect, useRef } from 'react';
import Menu from "@/components/menu/Menu"
import Head from "@/components/head/Headmenu";
import Menuphone from "@/components/menuphone/Menuphone"
import Dienthoai from "@/components/dienthoai/Quancaothuonghieu"
import Danhmucdienthoai from "@/components/dienthoai/Danhmucdienthoai"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import '@/components/css/menu.css'
import '@/components/css/chitietdienthoai.css'
import '@/app/(dienthoai)/css/chietsanpham.css'
import Slider from "react-slick";
import Link from 'next/link'
import ServiceDienthoai from "@/service/dienthoai";
import Yeuthich from "@/service/yeuthich";
import Auth from "@/service/auth";
import Sile from "@/components/sanpham/Silesanpham"
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Yeuthichfrom from './components/yeuthich';
import Loading from '@/components/loading/loading';
import Dangnhap from '@/components/loading/kiemtradn';
import Thongsokythuat from './components/ThongSoKyThuat';
import Chitiet from './components/ChiTiet';
import Giohang from '@/service/giohang';
import Dacdiemnoibat from './components/Dacdiemnoibat';

type Params = {
  id: string;
  mausacId: string;
};

interface Thongtindienthoai {
  baohanh: string;
  thietbidikem: string;
  tinhtrangmay: string;
}

interface Thongtinkythuatso {
  bluetooth: string;
  cacloaicambien: string;
  cambienvantai: string;
  camerasau: string;
  cameratruoc: string;
  chatlieukhungvien: string;
  chatlieumatlung: string;
  chipset: string;
  chisokhangnuocbui: string;
  chitiet: string;
  congghenfc: string;
  congnghemanghinh: string;
  congnghesac: string;
  congsac: string;
  dacdiennoibat: string;
  dophangiai: string;
  gps: string;
  gpu: string;
  hedieuhang: string;
  hongngoai: string;
  hotromang: string;
  jacktainghe: string;
  khecamthenho: string;
  kichthuoc: string;
  kichthuocmanhinh: string;
  kieumanhinh: string;
  loaicpu: string;
  pin: string;
  quayvideo: string;
  quayvideotruoc: string;
  tansoquet: string;
  thesim: string;
  tinhnagcamera: string;
  tinhnangdacbiet: string;
  tinhnangmanghinh: string;
  trongluong: string;
  wifi: string;
  bonho: string;
  tuongthich: string;
  ram: string;
}

interface Dienthoai {
  tensanpham: string;
  bonho: string;
  ram: string;
  thongtindienthoai: Thongtindienthoai;
  thongsokythuats: Thongtinkythuatso;
  baohanh: string;
  thietbidikem: string;
  tinhtrangmay: string;
  // Các thuộc tính khác...
}

function page() {


  const params = useParams() as Params;
  // const [data, setData] = useState('');
  const [data, setData] = useState<Dienthoai | null>(null);
  const [tensanpham, setTensanpham] = useState('');
  const [loadings, setloadings] = useState('');
  const [giasanpham, setgiasanpham] = useState('');
  const [giasanphamgiam, setgiasanphamgiam] = useState('');
  const [thongtinphanloai, setThongtinphanloai] = useState([]);
  const [thongtinphanloaiid, setThongtinphanloaiid] = useState('');
  const [khuyenmai, setkhuyenmai] = useState('');
  const [idmausac, setidmausac] = useState([]);
  const [thongsokythuats, setThongsokythuats] = useState(false);
  const [thongtindienthoai, setThongtindienthoai] = useState<Thongtindienthoai | null>(null);

  const formatCurrency = (value: number): string => {
    // Định dạng số với dấu phân cách hàng nghìn
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Thêm đơn vị tiền tệ
    return `${formattedValue} đ`;
  };

  const getkiemdienthoai = async () => {
    try {
      const datadienthoai = await ServiceDienthoai.getKiemtradienthoai(params.id, params.mausacId)
      if (datadienthoai == "Không") {
        window.location.href = "/error";
      }
    } catch {

    }
  }

   const [generalError, setGeneralError] = useState("");

  const postGiohang = async () => {
    try {
      const datagiohang = await Giohang.postGiohang(params.id, params.mausacId)
      setGeneralError("Thêm vào giỏ hàng thành công");
    } catch(error) {
      if (typeof error === "object" && error !== null) {
        if ('code' in error && 'message' in error) {
          setGeneralError(`${error.message}`); // Hiển thị thông báo lỗi cho người dùng
        } else if (error instanceof Error) {
          setGeneralError(error.message);
        }
      } else {
        console.error("An unknown error occurred.");
        setGeneralError("An unknown error occurred.");
      }
    }
  }



  const fetchdienthoai = async () => {
    setIsLoading(true);
    try {
      const data = await ServiceDienthoai.getChitietdienthoai(params.id, params.mausacId);
      console.log(data)
      // Tìm màu sắc phù hợp
      const selectedColor = data.mausacs.find((mausac: { id: number; }) => mausac.id === parseInt(params.mausacId));
      const formattedPrice = formatCurrency(selectedColor.giaban);
      // Kiểm tra xem data.khuyenmais có tồn tại và không null
      if (data.khuyenmais) {
        const giadagiamgia = selectedColor.giaban - (selectedColor.giaban * (data.khuyenmais.phantramkhuyenmai / 100));
        const formattedgiamgai = formatCurrency(giadagiamgia);
        setkhuyenmai(data.khuyenmais.phantramkhuyenmai);
        setgiasanphamgiam(formattedgiamgai);
      }

      setData(data);
      setgiasanpham(formattedPrice);
      // Kiểm tra xem data.mausacs có tồn tại và không rỗng
      setidmausac(data.mausacs)
      setThongtindienthoai(data.thongtindienthoai);
      setThongtinphanloaiid(data.thongtinphanloai.id);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdienthoai()
    window.scrollTo(0, 0);
  }, [params.id, params.mausacId]);

  const fetachgetthongtinphanloai = async () => {
    if (!thongtinphanloaiid) {
      console.error("Thongtinphanloaiid is not set");
      return;
    }
    try {
      const data = await ServiceDienthoai.getThongtinphanloai(thongtinphanloaiid);
      setThongtinphanloai(data.result)
      setIsLoading(false);
      // Lấy ID của màu sắc đầu tiên từ mảng mausacs của sản phẩm đầu tiên
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [yeuthich, setYeuthich] = useState<any[]>([]);
  const [datacode, setDatacode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDangnhap, setLoadingDangnhap] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [danhgiasao, setDanhgiasao] = useState([]);

  const fetchTokenInfo = async () => {
    try {
      const data = await Auth.gettoken();
      setDatacode(data.code);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  const fetchYeuthich = async () => {
    try {
      const yeuthich = await Yeuthich.getYeuthich();
      setYeuthich(yeuthich);
      setTimeout(() => {
        setSuccessMessage(''); // Tắt thông báo sau 5 giây
      }, 5000);
      // yeuthich.forEach(item => {
      //     console.log(item.id);
      // });
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }

  const fetchPostYeuthich = async () => {
    try {
      if (datacode != 1000) {
        setLoadingDangnhap(true)
      } else {
        setIsLoading(true);
        const postyeuthich = await Yeuthich.post(params.id, params.mausacId);
        setTimeout(() => {
          setSuccessMessage('Đã thêm vào danh sách yêu thích thành công!'); // Hiển thị thông báo
          setIsLoading(false); // Kết thúc hiệu ứng loading sau 1 phút
          fetchYeuthich()
        }, 5000);
      }
    } catch (error) {
      console.error("Error fetching token info:", error);
      setIsLoading(false);
    }
  }

  const itemToRemove = yeuthich.find(item => {
    return item.dienthoaiId == params.id && item.mausacId == params.mausacId;
  });

  const deleteYeuthich = async () => {
    try {
      setIsLoading(true);
      const deleteyeuthich = await Yeuthich.delete(itemToRemove.id);
      console.log(itemToRemove.id)
      setTimeout(() => {
        setSuccessMessage('Đã xoá khỏi danh sách yêu thích thành công!'); // Hiển thị thông báo
        setIsLoading(false); // Kết thúc hiệu ứng loading sau 1 phút
        fetchYeuthich()
      }, 5000);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }

  useEffect(() => {
    const timestampStr = window.localStorage.getItem("exp");
    const token = window.localStorage.getItem("token");
    if (timestampStr) {
      const timestamp = parseInt(timestampStr, 10);
      const date = new Date(timestamp * 1000);
      const currentDate = new Date();
      if (date >= currentDate) {
        if (token && token.trim() !== "") {
          fetchTokenInfo();
        } else {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("exp");
        }
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("exp");
      }
    } else {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("exp");
    }
  }, []);

  useEffect(() => {
    getkiemdienthoai()
    window.scrollTo(0, 0);
    if (datacode === 1000) {
      fetchYeuthich();
    }
  }, [datacode]);

  const isFavorite = yeuthich.some(item => {

    return item.dienthoaiId == params.id && item.mausacId == params.mausacId;
  });


  useEffect(() => {
    if (thongtinphanloaiid) {
      fetachgetthongtinphanloai();
    }
  }, [params.id, thongtinphanloaiid, khuyenmai])

  const handleCloseDangnhap = () => {
    setLoadingDangnhap(false);
  };

  const handleThongsokythuat = () => {
    setThongsokythuats(true)
  }

  const handleThongsokythuattat = () => {
    setThongsokythuats(false)
  }

  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className=''>
      {isLoading && <div className="loading-overlay-from"><Loading /></div>}
      {isLoadingDangnhap && <div className="loading-overlay"><Dangnhap nurfelse={handleCloseDangnhap} /></div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className='mt-2'>
        <h2 className='text-black text-2xl font-bold ml-2'>{data?.tensanpham}</h2>
      </div>
      <div id="content" className="container_menu">
        <div className="siledienthoai"><Sile />
          {data && (
            <>
              <div className='shadow-lg rounded-lg notification-box p-2'>
                <h3 className='text-gray-700 text-xl font-bold ml-2'>Thông tin sản phẩm</h3>
                <div className="mt-3 flex">
                  <div className="pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>Stockholm-icons / Devices / iPhone-X</title>
                      <desc>Created with Sketch.</desc>
                      <defs />
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <path d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z" fill="#000000" opacity="0.3" />
                        <path d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z M8,1 L16,1 C17.5187831,1 18.75,2.23121694 18.75,3.75 L18.75,20.25 C18.75,21.7687831 17.5187831,23 16,23 L8,23 C6.48121694,23 5.25,21.7687831 5.25,20.25 L5.25,3.75 C5.25,2.23121694 6.48121694,1 8,1 Z M9.5,1.75 L14.5,1.75 C14.7761424,1.75 15,1.97385763 15,2.25 L15,3.25 C15,3.52614237 14.7761424,3.75 14.5,3.75 L9.5,3.75 C9.22385763,3.75 9,3.52614237 9,3.25 L9,2.25 C9,1.97385763 9.22385763,1.75 9.5,1.75 Z" fill="#000000" fillRule="nonzero" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <div className="text-baohanh text-sm pb-2">
                      <p>{data?.thongtindienthoai.baohanh}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex">
                  <div className="pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>Stockholm-icons / Shopping / Box2</title>
                      <desc>Created with Sketch.</desc>
                      <defs />
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z" fill="#000000" />
                        <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z" fill="#000000" opacity="0.3" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <div className="text-thietbidikem text-sm pb-2">
                      <p>{data?.thongtindienthoai.thietbidikem}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex">
                  <div className="pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>Stockholm-icons / Shopping / Box3</title>
                      <desc>Created with Sketch.</desc>
                      <defs />
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <path d="M20.4061385,6.73606154 C20.7672665,6.89656288 21,7.25468437 21,7.64987309 L21,16.4115967 C21,16.7747638 20.8031081,17.1093844 20.4856429,17.2857539 L12.4856429,21.7301984 C12.1836204,21.8979887 11.8163796,21.8979887 11.5143571,21.7301984 L3.51435707,17.2857539 C3.19689188,17.1093844 3,16.7747638 3,16.4115967 L3,7.64987309 C3,7.25468437 3.23273352,6.89656288 3.59386153,6.73606154 L11.5938615,3.18050598 C11.8524269,3.06558805 12.1475731,3.06558805 12.4061385,3.18050598 L20.4061385,6.73606154 Z" fill="#000000" opacity="0.3" />
                        <polygon fill="#000000" points="14.9671522 4.22441676 7.5999999 8.31727912 7.5999999 12.9056825 9.5999999 13.9056825 9.5999999 9.49408582 17.25507 5.24126912" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <div className="text-thietbidikem text-sm pb-2">
                      <p>{data?.thongtindienthoai.tinhtrangmay}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="thongtingia">
          <h2 className='text-black text-2xl font-bold ml-2'>{khuyenmai == '' && (<span className='giadagiam'>{giasanpham}</span>)} {khuyenmai != '' && (<><span className='giadagiam'>{giasanphamgiam}</span> <span className='giachinh'>{giasanpham}</span></>)}</h2>
          <div className=" text-white py-1">
            <div className="container mx-auto padimg-to-bttom">
              <div className="grid grid-cols-3 gap-2">
                {thongtinphanloai.map((product: any, index: number) => {
                  const formattedPrice = formatCurrency(product.giaban);
                  const isMatchingId = product.id === parseInt(params.id);
                  const randomMausacId = product.mausacs.length > 0 ? product.mausacs[0].id : null; // Hoặc chọn ngẫu nhiên
                  return (
                    <Link key={product.id} href={`/dienthoai/${product.id}/mausac/${randomMausacId}`}>
                      <div key={index} className={`col-span-3 md:col-span-1 ${isMatchingId ? 'border-2 border-red-600' : ''} p-1 rounded-lg text-center border-2 text-black`}>
                        <h2 className="text-sm test-with">{product.bonho} {product.bonho != 1 && (<>GB</>)} {product.bonho == 1 && (<>TB</>)}</h2>
                        <p className="text-sm test-with">{formattedPrice} </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" text-black py-1">
            <h3 className='text-1xl font-bold ml-2'>Chọn màu để xem giá</h3>
            <div className="container mx-auto padimg-to-bttom">
              <div className="grid grid-cols-3 gap-2">
                {idmausac.map((product: any, index: number) => {
                  const formattedPrice = formatCurrency(product.giaban);
                  const isMatchingId = product.id === parseInt(params.mausacId);
                  return (
                    <Link key={product.id} href={`/dienthoai/${params.id}/mausac/${product.id}`}>
                      <div key={index} className={`col-span-3 md:col-span-1 ${isMatchingId ? 'border-2 border-red-600' : ''} p-1 rounded-lg text-center border-2 text-black`}>
                        <h2 className="text-sm test-with">{product.tenmausac}</h2>
                        <p className="text-sm test-with">{formattedPrice} </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {generalError && <p className="text-red-500 text-center font-bold leading-9 tracking-tight text-sm max-w-md mx-auto">{generalError}</p>}
          <div className='flex'>
            <button onClick={postGiohang} className="text-button text-white font-bold h-14 ml-2 rounded border-b-2 bg-red-600 hover:bg-red-700 shadow-md items-center justify-center">
              <span className="mr-2 text-1xl">Thêm vào giỏ hàng</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </button>
            <div className="text-button-yeuthich text-white font-bold h-14 rounded items-center justify-center bg-red-lightest border-4 border-red-600 text-red-dark">
              <div className='yeuthich-from'>
                <Yeuthichfrom
                  isFavorite={isFavorite}
                  onClickAdd={fetchPostYeuthich}
                  onClickRemove={deleteYeuthich}
                  isLoading={isLoading}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className='thongtinchitiet'>
        <div className='chitietsanpham_data'>
          <div className="chitietsanpham" style={{
            height: expanded ? "auto" : "550px",
            overflow: "hidden",
            transition: "height 0.3s ease-in-out"
          }}>
            <div className={`chitietsanpham-mota ${expanded ? "expanded" : ""}`}>
              <div className='noidungdiemnoibat'>
                <div className='textdacdiemnoibat'>
                  Đặc điểm nổi bật của {data?.tensanpham}
                </div>
                <Dacdiemnoibat data={data} />
              </div>
              <Chitiet data={data} />
            </div>
            <button className='button-thongtinkythuat' onClick={() => setExpanded(!expanded)}>
              <span>{expanded ? "Thu gọn" : "Xem thêm"}</span>
            </button>
          </div>
          <div>text</div>
        </div>
        <div className='thongsodienthoai'>
          <div className='thongsodienthoai-kythuat m-3'>
            <div className='text-lg text-black font-semibold'>Thông số kỹ thuật</div>
            <table className="min-w-full mt-2 thongsodienthoai-kythuat-chitiet">
              <thead className="">
              </thead>
              <tbody className="">
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.kichthuocmanhinh &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Kích thước màn hình</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.kichthuocmanhinh} inches</td>
                    </>
                  }
                </tr>
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.congnghemanghinh &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Công nghệ màn hình</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congnghemanghinh || "" }}></td>
                    </>
                  }
                </tr>
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.camerasau &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Camera sau</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.camerasau || "" }}></td>
                    </>
                  }
                </tr>
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.cameratruoc &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Camera trước</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.cameratruoc || "" }}></td>
                    </>
                  }
                </tr>
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.tinhnagcamera &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Tính năng Camera</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnagcamera || "" }}></td>
                    </>
                  }
                </tr>
                <tr className="bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {data?.thongsokythuats.chipset &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Chipset</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.chipset}</td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.congghenfc &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Công nghệ NFC</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.congghenfc || "" }}></td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.bonho && (
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Bộ nhớ trong</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">
                        {/* {data?.bonho === 1 || data?.bonho === 2 || data?.bonho === 1.5 ? `${data.bonho} TB` : `${data.bonho} GB`} */}
                        {[1, 2, 1.5].includes(parseFloat(data.bonho)) ? `${data.bonho} TB` : `${data.bonho} GB`}
                      </td>
                    </>
                  )}
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.thesim &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Thẻ SIM</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.thesim}</td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.hedieuhang &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Hệ điều hành</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.hedieuhang}</td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.dophangiai &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Độ phân giải màn hình</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.dophangiai}</td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.tinhnangmanghinh &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Tính năng màn hình</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnangmanghinh || "" }}></td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.loaicpu &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Loại CPU</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words">{data?.thongsokythuats.loaicpu}</td>
                    </>
                  }
                </tr>
                <tr className='bg-gray-100 px-6 py-4 whitespace-no-wrap border-b border-gray-300'>
                  {data?.thongsokythuats.tinhnangdacbiet &&
                    <>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4">Tính năng đặc biệt</td>
                      <td className="w-1/3 text-left text-sm text-slate-900 py-3 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.thongsokythuats?.tinhnangdacbiet || "" }}></td>
                    </>
                  }
                </tr>

              </tbody>
            </table>
            <div>
              {thongsokythuats && (
                <div className='loading-thongsokythuatdienthoai'>
                  <div className='!z-5 relative loading-thongsokythuatdienthoai flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                    <div className='mb-auto flex-col items-center justify-center text-thongsokythuat-dilay'>
                      <h2 className='textthemmausac'>THÔNG SỐ KỸ THUẬT</h2>
                      <div className="mb-3 text-right">
                        <button onClick={handleThongsokythuattat} className="text-slate-950 transition-all duration-300 hover:scale-110 hover:text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <Thongsokythuat data={data} />
                  </div>
                </div>
              )}
              <button className='button-thongtinkythuat' onClick={handleThongsokythuat}>
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                  </div>
                </div>
                <span>Xem cấu hình chi tiết</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default page;

