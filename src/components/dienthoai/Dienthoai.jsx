'use client'
import { useState, useEffect, useContext } from 'react';
import ServiceDienthoai from "../../service/dienthoai"
import Auth from "../../service/auth"
import Yeuthich from "../../service/yeuthich"
import Danhgia from "../../service/danhgia"
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
import Loading from '@/components/loading/loading';
import Dangnhap from '@/components/loading/kiemtradn';


export default function Dienthoai() {
    const router = useRouter()
    var Left_dienthoai = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/xeex3nyll0le9ohzr4tx.png"
    var Right_dienthoai = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724195905/rspyb5qcjgdjtnzr0mbm.png"
    var img = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724251968/ngvixu1bdkmncuq7dfuu.svg";

    const [data, setData] = useState([]);
    const [datacode, setDatacode] = useState([])
    const [hover, setHover] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [yeuthich, setYeuthich] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDangnhap, setLoadingDangnhap] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [danhgiasao, setDanhgiasao] = useState([]);

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
            setDatacode(data.code);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const getDanhgia = async () => {
        try {
            const getdanhgia = await Danhgia.getAlldanhgia();
            setDanhgiasao(getdanhgia)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    // const fetchPostYeuthich = async (dienthoaiId, mausacId) => {
    //     try {
    //         const postyeuthich = await Yeuthich.post(dienthoaiId, mausacId);
    //         console.log(postyeuthich)
    //     } catch (error) {
    //         console.error("Error fetching token info:", error);
    //     }
    // }

    const fetchPostYeuthich = async (dienthoaiId, mausacId) => {
        try {
            if (datacode !== 1000) {
                console.log("Chưa đăng nhập")
                setLoadingDangnhap(true)
            } else {
                setIsLoading(true);
                const postyeuthich = await Yeuthich.post(dienthoaiId, mausacId);
                setTimeout(() => {
                    setSuccessMessage('Đã thêm vào danh sách yêu thích thành công!'); // Hiển thị thông báo
                    setIsLoading(false); // Kết thúc hiệu ứng loading sau 1 phút
                    fetchYeuthich()
                }, 2500);
            }
        } catch (error) {
            console.error("Error fetching token info:", error);
            setIsLoading(false);
        }
    }

    const deleteYeuthich = async (dienthoaiId, mausacId) => {
        try {
            setIsLoading(true);
            const itemToRemove = yeuthich.find(item => item.dienthoaiId === dienthoaiId && item.mausacId === mausacId);
            const deleteyeuthich = await Yeuthich.delete(itemToRemove.id);
            setTimeout(() => {
                setSuccessMessage('Đã xoá khỏi danh sách yêu thích thành công!'); // Hiển thị thông báo
                setIsLoading(false); // Kết thúc hiệu ứng loading sau 1 phút
                fetchYeuthich()
            },);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }


    const fetchYeuthich = async () => {
        try {
            const yeuthich = await Yeuthich.getYeuthich();
            setYeuthich(yeuthich);
            setTimeout(() => {
                setSuccessMessage(''); // Tắt thông báo sau 5 giây
            }, 2500);
            // yeuthich.forEach(item => {
            //     console.log(item.id);
            // });
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    //   useEffect(() => {
    //     const token = window.localStorage.getItem("token");
    //     if (datacode == 1000) {
    //       fetchTokenInfo();
    //       fetchYeuthich();
    //     }
    //   }, []);



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
                } else{
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
        if (datacode === 1000) {
            fetchYeuthich();
        }
        getDanhgia();
        fetchThuonghieu();
        fetchdienthoai();
    }, [datacode]);

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

    const handleCloseDangnhap = () => {
        setLoadingDangnhap(false);
    };

    return (
        <div>
            {isLoading && <div className="loading-overlay"><Loading /></div>}
            {isLoadingDangnhap && <div className="loading-overlay"><Dangnhap nurfelse={handleCloseDangnhap} /></div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
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

                        const isFavorite = yeuthich.some(item =>
                            item.dienthoaiId === card.id && item.mausacId === card.mausac_id
                        );


                        const danhGiaSaoItem = danhgiasao.find(item => item.dienthoaiId === card.id);
                        const rating = danhGiaSaoItem ? danhGiaSaoItem.tongsao : 0; // Nếu không tìm thấy thì giá trị mặc định là 0

                        const giadagiamgia = card.giaban - (card.giaban * (card.phantramkhuyenmai / 100))

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
                                        <div className="block-featured-text">{formatter.format(giadagiamgia)} {card.phantramkhuyenmai != null && (<span className='giachinh'>{formatter.format(card.giaban)}</span>)}</div>
                                        <div>{rating != 0 && (<RatingStars rating={rating} />)}</div>
                                        <div className='uudai'>
                                            {card.baohanh != null && (
                                                <div className='uudai'>
                                                    {card.title === undefined && <div className="block-featured-text_uudai">{card.baohanh}</div>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                                <div className='yeuthich'><YeuThichItem isFavorite={isFavorite}
                                    onClickAdd={() => fetchPostYeuthich(card.id, card.mausac_id)}
                                    onClickRemove={() => deleteYeuthich(card.id, card.mausac_id)}
                                /></div>
                            </div>

                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

function YeuThichItem({ isFavorite, onClickAdd, onClickRemove, isLoading }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`yeuthich-item ${isLoading ? 'disabled' : ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={isLoading ? null : (isFavorite ? onClickRemove : onClickAdd)} // Vô hiệu hóa click khi đang loading
        >
            <p>
                {isLoading ? '' : ''}
                {hover
                    ? <FavoriteRoundedIcon className="fa-heart-o" />
                    : (isFavorite ? <FavoriteRoundedIcon className="fa-heart-o" /> : <FavoriteBorderRoundedIcon className="fa-heart-o" />)
                }
            </p>
        </div>
    );
}
