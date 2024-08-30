'use client'
import { useState, useEffect } from 'react';
import ServiceDienthoai from "../../service/dienthoai"
import Auth from "../../service/auth"
import Yeuthich from "../../service/yeuthich"
import Slider from 'react-slick'
import '../css/sanphamdienthoai.css'
import '../css/menu.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import RatingStars from '../../components/stars/RatingStars'
import { Heart } from 'lucide-react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
// import Left_dienthoai from "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/xeex3nyll0le9ohzr4tx.png"
// import Right_dienthoai from "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/rspyb5qcjgdjtnzr0mbm.png"
// import img from "https://res.cloudinary.com/du6ybb3by/image/upload/v1724251968/ngvixu1bdkmncuq7dfuu.svg"; 

export default function Dienthoai() {
    const router = useRouter()
    var Left_dienthoai = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/xeex3nyll0le9ohzr4tx.png"
    var Right_dienthoai = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/rspyb5qcjgdjtnzr0mbm.png"
    var img = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724251968/ngvixu1bdkmncuq7dfuu.svg";

    const [data, setData] = useState([]);
    const [hover, setHover] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const fetchdienthoai = async () => {
        try {
            const data = await ServiceDienthoai.getDienthoai();
            setData(data)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const fetchThuonghieu = async () => {
        try {
            const thuonghieu = await ServiceDienthoai.getThuonghieu();
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const fetchTokenInfo = async () => {
        try {
          const data = await Auth.gettoken();
          console.log("User info:", data);
        } catch (error) {
          console.error("Error fetching token info:", error);
        }
      };

    const fetchYeuthich = async () => {
        try{
            const yeuthich = await Yeuthich.getYeuthich();
        } catch (error){

            
        }
    }
      
      // useEffect(() => {
      //   const token = window.localStorage.getItem("token");
      //   console.log("token - api eee 00000000 -- " + token);
      
      //   if (token && token.trim() !== "") {
      //     fetchTokenInfo();
      //   }
      // }, []);


    

    useEffect(() => {
        fetchdienthoai();
        fetchThuonghieu();
        fetchTokenInfo()
    }, []);

    const ok = [
        {
            id_danhmuc: 1,
            id_tensanpham: '1',
            danhmuc: 'Apple',
        },
        {
            id_danhmuc: 2,
            id_tensanpham: '1',
            danhmuc: 'Samsung',
        },
        {
            id_danhmuc: 3,
            id_tensanpham: '1',
            danhmuc: 'Xiaomi',
        },
        {
            id_danhmuc: 4,
            id_tensanpham: '1',
            danhmuc: 'OPPO',
        },
        {
            id_danhmuc: 5,
            id_tensanpham: '1',
            danhmuc: 'Vivo',
        },
        {
            id_danhmuc: 6,
            id_tensanpham: '1',
            danhmuc: 'realme',
        },
        {
            id_danhmuc: 7,
            id_tensanpham: '1',
            danhmuc: 'Nokia',
        },
        {
            id_danhmuc: 8,
            id_tensanpham: '1',
            danhmuc: 'ASUS',
        },
        {
            id_danhmuc: 9,
            id_tensanpham: '1',
            danhmuc: 'Tecno',
        }
    ]
    const SlickArrowLeftdienthoai = ({ currentSlide, slideCount, ...props }) => (
        <img src={Left_dienthoai} alt="prevArrow" {...props} className="SlickArrowLeft" />
    );

    const SlickArrowRightdienthoai = ({ currentSlide, slideCount, ...props }) => (
        <img src={Right_dienthoai} alt="nextArrow" {...props} className="SlickArrowRight" />
    );
    const sliderSettings_dienthoai = {
        slidesToShow: windowWidth <= 1135 ? 4 : 5,
        initialSlide: 0,
        autoplay: true,
        centerMode: false,
        swipeToSlide: true,
        pauseOnDotsHover: true,
        arrows: true,
        rows: 2,
        draggable: true,
        slidesToShow: 5,
        shift: 10,
        dots: false,
        infinite: true,
        wheel: true,
        speed: 500,
        prevArrow: <SlickArrowLeftdienthoai />,
        nextArrow: <SlickArrowRightdienthoai />,
        responsive: [
            {
              breakpoint: 1135.5,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 980.5,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 540,
              settings: {
                slidesToShow: 2,          
              }
            },
          ]
    };
    return (
        <div>
            <div className='container_menu'>
                <div className='sanpham_danhmuc_tensanpham text-2xl' >ĐIỆN THOẠI</div>
                <div className='block_featured_product'>
                    {/* {ok.map((slide) =>
                        <Link href={'info1'}>
                            <div className='sanpham_danhmuc_loaidanhmuc'>{slide.danhmuc}</div></Link>
                    )} */}
                    <Link href={'home'}>
                        <div className='sanpham_danhmuc_loaidanhmuc'>Xem tất cả</div></Link>
                </div>
            </div>
            <div className='sanpham'>
                <Slider {...sliderSettings_dienthoai}>
                    {data.map((card) => {
                        const formatter = new Intl.NumberFormat('vi', {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0
                        })
                        return (

                            <div key="{index}" className="block-featured-product">
                                <Link href={`/dienthoai/${card.id}/mausac/${card.mausac_id}`}>
                                    {card.phantramkhuyenmai != null && (
                                        <div
                                            className='product_price--percent'
                                            style={{
                                                backgroundImage: `url(${img})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "contain"
                                            }}
                                        >
                                            <p>Giảm {card.phantramkhuyenmai}%</p>
                                        </div>
                                    )}

                                    <img className="img01" alt={card.title} src={`${card.hinhanh}`} />
                                    <div className="block-featured-product-body">
                                        <div className="block-featured-title"><h3>{card.tensanpham}</h3></div>
                                        <div className="block-featured-text">{formatter.format(card.giaban)}</div>
                                        <div><RatingStars rating={4.7} /></div>
                                        <div className='uudai'>
                                            {card.baohanh != null && (
                                                <div className='uudai'>
                                                    {card.title === undefined && <div className="block-featured-text_uudai">{card.baohanh}</div>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                                <div className='yeuthich'><YeuThichItem /></div>
                            </div>

                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

function YeuThichItem() {
    const [hover, setHover] = useState(false);
  
    return (
      <div
        className="yeuthich-item"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p>
          Yêu thích
          {hover ? <FavoriteRoundedIcon className="fa-heart-o"/> : <FavoriteBorderRoundedIcon className="fa-heart-o"/>}
        </p>
      </div>
    );
  }