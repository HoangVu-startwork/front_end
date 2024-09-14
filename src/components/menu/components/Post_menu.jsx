'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import '@/components/css/styles.css';
import '@/components/css/Post_menu_dienthoai.css'
import Danhmuc from "../../../service/danhmuc";
import { ChevronRight, Smartphone, Laptop, Tablet, Headphones, Watch, Home, Unplug, PcCase, Airplay } from 'lucide-react';
const Post_menu = () => {

    const [danhmuc, setdanhmuc] = useState([])

    const fetchgetdanhmuc = async () => {
        try {
          const data = await Danhmuc.getAlldanhmuc();
          setdanhmuc(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchgetdanhmuc()
      }, [])

  return (
            <div className="war_menu"> 
                <div className="danhmuc_menu">
                    <ul>
                        <li><Link href=""><Smartphone className="fa fast fa-mobile"/><span className="menu_span">Điện thoại</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo hãng</span>
                                    <ul className="sub-menu-tap">
                                        <li><Link href="">Apple</Link></li>
                                        <li><Link href="">Samsung</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">OPPO</Link></li>
                                        <li><Link href="">Nokia</Link></li>
                                        <li><Link href="">realme</Link></li>
                                        <li><Link href="">Asus</Link></li>
                                        <li><Link href="">vivo</Link></li>
                                        <li><Link href="">OnePlus</Link></li>
                                        <li><Link href="">Nubia</Link></li>
                                        <li><Link href="">Tecno</Link></li>
                                        <li><Link href="">Điện thoại phổ thông</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo mức giá</span>
                                    <ul className="sub-menu-tap">
                                        <li><Link href="">Dưới 5 triệu</Link></li>
                                        <li><Link href="">Từ 10 - 15 triệu</Link></li>
                                        <li><Link href="">Từ 15 - 20 triệu</Link></li>
                                        <li><Link href="">Trên 20 triệu</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp tests'><span className="fron-ul">Loại điện thoại</span>
                                    <ul className="sub-menu-tap">
                                        <li><Link href="">Android</Link></li>
                                        <li><Link href="">iPhone (IOS)</Link></li>
                                        <li><Link href="">Điện thoại phổ thông</Link></li>
                                        <li></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo nhu cầu</span>
                                    <ul className="sub-menu-tap">
                                        <li><Link href="">Hỗ trở 5G</Link></li>
                                        <li><Link href="">Điện thoại Gaming</Link></li>
                                        <li><Link href="">Sạc không dây</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Laptop className="fa fast fa-laptop"/><span className="menu_span">Laptop</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu1 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo hãng</span>
                                    <ul className="sub-menu-tap1">
                                        <li><Link href="">Mac</Link></li>
                                        <li><Link href="">HP</Link></li>
                                        <li><Link href="">Dell</Link></li>
                                        <li><Link href="">ASUS</Link></li>
                                        <li><Link href="">Lenovo</Link></li>
                                        <li><Link href="">Microsoft Surface</Link></li>
                                        <li><Link href="">Acer</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">LG</Link></li>
                                        <li><Link href="">Huawei</Link></li>
                                        <li><Link href="">MSI</Link></li>
                                        <li><Link href="">Gigabyte</Link></li>
                                        <li><Link href="">Fujitsu</Link></li>
                                        <li><Link href="">Intel</Link></li>
        
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo nhu cầu</span>
                                    <ul className="sub-menu-tap1">
                                        <li><Link href="">Văn phòng</Link></li>
                                        <li><Link href="">Gaming</Link></li>
                                        <li><Link href="">Mỏng nhẹ</Link></li>
                                        <li><Link href="">Đồ hoạ - kỹ thuật</Link></li>
                                        <li><Link href="">Sinh viên</Link></li>
                                        <li><Link href="">Cảm ứng</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo mức giá</span>
                                    <ul className="sub-menu-tap1">
                                        <li><Link href="">Dưới 5 triệu</Link></li>
                                        <li><Link href="">Từ 10 - 15 triệu</Link></li>
                                        <li><Link href="">Từ 15 - 20 triệu</Link></li>
                                        <li><Link href="">Trên 20 triệu</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul fron-hot">Chọn theo kích thước màn hình</span>
                                    <ul className="sub-menu-tap1">
                                        <li><Link href="">Laptop 12 inch</Link></li>
                                        <li><Link href="">Laptop 13 inch</Link></li>
                                        <li><Link href="">Laptop 14 inch</Link></li>
                                        <li><Link href="">Laptop 15.6 inch</Link></li>
                                        <li><Link href="">Laptop 16 inch</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Tablet className="fa fast fa-tablet"/><span className="menu_span">Máy tính bảng</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu2 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo hãng</span>
                                    <ul className="sub-menu-tap2">
                                        <li><Link href="">iPad</Link></li>
                                        <li><Link href="">SamSum</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">Lenovo</Link></li>
                                        <li><Link href="">Nokia</Link></li>
                                        <li><Link href="">Alcatel</Link></li>
                                        <li><Link href="">Kindle</Link></li>
                                        <li><Link href="">Máy đọc sách</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo mức giá</span>
                                    <ul className="sub-menu-tap2">
                                        <li><Link href="">Dưới 3 triệu</Link></li>
                                        <li><Link href="">Từ 3 - 6 triệu</Link></li>
                                        <li><Link href="">Từ 6 - 9 triệu</Link></li>
                                        <li><Link href="">Từ 9 - 12 triệu</Link></li>
                                        <li><Link href="">Trên 12 triệu</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Chọn theo nhu cầu</span>
                                    <ul className="sub-menu-tap2">
                                        <li><Link href="">Chơi game</Link></li>
                                        <li><Link href="">Học tập - văn phòng</Link></li>
                                        <li><Link href="">Giải trí</Link></li>
                                        <li><Link href="">Đồ hoạ - sáng tạo</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test tews'><span className="fron-ul fron-hot">Chọn theo kích thước màn hình</span>
                                    <ul className="sub-menu-tap2">
                                        <li><Link href="">7 - 8 inch (nhỏ gọn)</Link></li>
                                        <li><Link href="">10 - 12 inch (trung bình)</Link></li>
                                        <li><Link href="">12 inch (kích thước lớn)</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Headphones className="fa fast fa-headphones"/><span className="menu_span">Âm thanh</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu3 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Chọn loại tai nghe</span>
                                    <ul className="sub-menu-tap3">
                                        <li><Link href="">Bluetooth</Link></li>
                                        <li><Link href="">Chụp tai</Link></li>
                                        <li><Link href="">Có dây</Link></li>
                                        <li><Link href="">Thể thao</Link></li>
                                        <li><Link href="">Gaming</Link></li>
                                        <li><Link href="">Xem tất cả tai nghe</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Hãng tai nghe</span>
                                    <ul className="sub-menu-tap3">
                                        <li><Link href="">Apple</Link></li>
                                        <li><Link href="">JBL</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">Samsung</Link></li>
                                        <li><Link href="">Sony</Link></li>
                                        <li><Link href="">LG</Link></li>
                                        <li><Link href="">Soundpeats</Link></li>
                                        <li><Link href="">Huawel</Link></li>
                                        <li><Link href="">Havit</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn loại loa</span>
                                    <ul className="sub-menu-tap3">
                                        <li><Link href="">Loa Bluetooth</Link></li>
                                        <li><Link href="">Loa mini</Link></li>
                                        <li><Link href="">Loa Karaoke</Link></li>
                                        <li><Link href="">Loa Soundpeats</Link></li>
                                        <li><Link href="">Xem tất cả loa</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Hãng loa</span>
                                    <ul className="sub-menu-tap3">
                                        <li><Link href="">JBL</Link></li>
                                        <li><Link href="">LG</Link></li>
                                        <li><Link href="">Sony</Link></li>
                                        <li><Link href="">Marshall</Link></li>
                                        <li><Link href="">Harman Kardon</Link></li>
                                        <li><Link href="">Huawei</Link></li>
                                        <li><Link href="">Anker</Link></li>
                                        <li><Link href="">B&O</Link></li>
                                        <li><Link href="">Bose</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Watch className="fa fast fa-clock"/><span className="menu_span">Đồng hồ</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu4 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Loại đồng hồ</span>
                                    <ul className="sub-menu-tap4">
                                        <li><Link href="">Đồng hồ thông minh</Link></li>
                                        <li><Link href="">Vòng đeo tay thông minh</Link></li>
                                        <li><Link href="">Đồng hồ định vị trẻ em</Link></li>
                                        <li><Link href="">Dây đeo</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo thương hiệu</span>
                                    <ul className="sub-menu-tap4">
                                        <li><Link href="">Apple Watch</Link></li>
                                        <li><Link href="">Samsung</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">Huawei</Link></li>
                                        <li><Link href="">Coros</Link></li>
                                        <li><Link href="">Garmin</Link></li>
                                        <li><Link href="">Huami</Link></li>
                                        <li><Link href="">Oppo</Link></li>
                                        <li><Link href="">Soundpeats</Link></li>
                                        <li><Link href="">Haylou</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Kích cỡ mặt đồng hồ</span>
                                    <ul className="sub-menu-tap4">
                                        <li><Link href="">Cho nam 42 - 47 mm</Link></li>
                                        <li><Link href="">cho nữ  42 mm</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Tính năng</span>
                                    <ul className="sub-menu-tap4">
                                        <li><Link href="">Hỗ trợ Esim</Link></li>
                                        <li><Link href="">Màn hình luôn bật</Link></li>
                                        <li><Link href="">Đo oxy trong máu SpO2</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Home className="fa fast fa-laptop-house"/><span className="menu_span">Nhà thông minh</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu5 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Gia dụng thông minh</span>
                                    <ul className="sub-menu-tap5">
                                        <li><Link href="">Robot hút bụi</Link></li>
                                        <li><Link href="">Máy hút bụi</Link></li>
                                        <li><Link href="">Đồ gia dụng</Link></li>
                                        <li><Link href="">Quạt thông minh</Link></li>
                                        <li><Link href="">Đèn thông minh</Link></li>
                                        <li><Link href="">Ổ cấm điện</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp test'><span className="fron-ul">Giải trí tại gia</span>
                                    <ul className="sub-menu-tap5">
                                        <li><Link href="">TV Box</Link></li>
                                        <li><Link href="">Máy chiếu</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chăm sóc sức khoẻ</span>
                                    <ul className="sub-menu-tap5">
                                        <li><Link href="">Máy lọc không khí</Link></li>
                                        <li><Link href="">Cân sức khoẻ</Link></li>
                                        <li><Link href="">Ghế công thái học</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Thiết bị an ninh</span>
                                    <ul className="sub-menu-tap5">
                                        <li><Link href="">Khoá thông minh</Link></li>
                                        <li><Link href="">Cảm biến</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Unplug className="fa fast fa-keyboard"/><span className="menu_span">Phụ kiện</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu6 post-taille">
                                <li className='fron-hotsp test'><span className="fron-ul">Phụ kiện di động</span>
                                    <ul className="sub-menu-tap6">
                                        <li><Link href="">Phụ kiện Apple</Link></li>
                                        <li><Link href="">Dán màn hình</Link></li>
                                        <li><Link href="">Ốp lưng - Bao da</Link></li>
                                        <li><Link href="">Thẻ nhớ</Link></li>
                                        <li><Link href="">Apple Care</Link></li>
                                        <li><Link href="">Sim 4G số đẹp</Link></li>
                                        <li><Link href="">Cáp, sạc</Link></li>
                                        <li><Link href="">Pin dư phòng</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Phụ kiện Laptop</span>
                                    <ul className="sub-menu-tap6">
                                        <li><Link href="">Chuột, bàn phím</Link></li>
                                        <li><Link href="">Ba lô - Túi xách</Link></li>
                                        <li><Link href="">Phần mềm</Link></li>
                                        <li><Link href="">Webcam</Link></li>
                                        <li><Link href="">Giá đỡ</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Thiết bị mạng</span>
                                    <ul className="sub-menu-tap6">
                                        <li><Link href="">Thiết bị phát sóng WiFi</Link></li>
                                        <li><Link href="">Bộ phát wifi di động</Link></li>
                                        <li><Link href="">Bộ kích sóng WiFi</Link></li>
                                        <li><Link href="">Xem tất cả thiết bị mạng</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Camera</span>
                                    <ul className="sub-menu-tap6">
                                        <li><Link href="">Camera hành trình</Link></li>
                                        <li><Link href="">Camera an ninh</Link></li>
                                        <li><Link href="">Gimbal</Link></li>
                                        <li><Link href="">Xem tất cả Camera</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Phụ kiện khác</span>
                                    <ul className="sub-menu-tap6">
                                        <li><Link href="">Dây đeo đồng hồ</Link></li>
                                        <li><Link href="">Dây đeo Airtag</Link></li>
                                        <li><Link href="">Phụ kiện tiện ích</Link></li>
                                        <li><Link href="">Phụ kiện ô tô</Link></li>
                                        <li><Link href="">Đồ chơi trẻ em</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><PcCase className="fa fast fa-desktop"/><span className="menu_span">PC - Màn hình</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu7 post-taille">
                                <li className='fron-hotsp'> <span className="fron-ul">Máy tính để bàn</span>
                                    <ul className="sub-menu-tap7">
                                        <li><Link href="">PC ráp sẵn CPS</Link></li>
                                        <li><Link href="">Máy tính All In One</Link></li>
                                        <li><Link href="">PC đồng bộ</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Linh kiện máy tính</span>
                                    <ul className="sub-menu-tap7">
                                        <li><Link href="">CPU</Link></li>
                                        <li><Link href="">Mainboard</Link></li>
                                        <li><Link href="">RAM</Link></li>
                                        <li><Link href="">Ổ cứng</Link></li>
                                        <li><Link href="">Nguồn máy tính</Link></li>
                                        <li><Link href="">Card màn hình</Link></li>
                                        <li><Link href="">Tản nhiệt</Link></li>
                                        <li><Link href="">Case máy tính</Link></li>
                                        <li><Link href="">Xem tất cả linh kiện</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn màng hình theo hãng</span>
                                    <ul className="sub-menu-tap7">
                                        <li><Link href="">ASUS</Link></li>
                                        <li><Link href="">LG</Link></li>
                                        <li><Link href="">Samsung</Link></li>
                                        <li><Link href="">DELL</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">ViewSonic</Link></li>
                                        <li><Link href="">HUAWEI</Link></li>
                                        <li><Link href="">HP</Link></li>
                                        <li><Link href="">HKC</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn màng hình theo nhu cầu</span>
                                    <ul className="sub-menu-tap7">
                                        <li><Link href="">Màng hình Gaming</Link></li>
                                        <li><Link href="">Màn hình văn phòng</Link></li>
                                        <li><Link href="">Màn hình đồ hoạ</Link></li>
                                        <li><Link href="">Xem tất cả màn hình</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Thiết bị văn phòng</span>
                                    <ul className="sub-menu-tap7">
                                        <li><Link href="">Giá treo màn hình</Link></li>
                                        <li><Link href="">Máy in</Link></li>
                                        <li><Link href="">Phần mềm</Link></li>
                                        <li><Link href="">Gaming Gear</Link></li>
                                        <li><Link href="">Bàn - ghế công thái học</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><Link href=""><Airplay className="fa fast fa-tv"/><span className="menu_span">Tivi</span><ChevronRight className="material-symbols-rounded"/></Link>
                            <ul className="sub post-auto-menu8 post-taille">
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo hãng</span>
                                    <ul className="sub-menu-tap8">
                                        <li><Link href="">Samsung</Link></li>
                                        <li><Link href="">LG</Link></li>
                                        <li><Link href="">Xiaomi</Link></li>
                                        <li><Link href="">Coocaa</Link></li>
                                        <li><Link href="">Casper</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo mức giá</span>
                                    <ul className="sub-menu-tap8">
                                        <li><Link href="">Từ 9 - 12 triệu</Link></li>
                                        <li><Link href="">Từ 12 - 15 triệu</Link></li>
                                        <li><Link href="">Trên 15 triệu</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Loại tivi</span>
                                    <ul className="sub-menu-tap8">
                                        <li><Link href="">Smart tivi</Link></li>
                                        <li><Link href="">Tivi LED</Link></li>
                                        <li><Link href="">Tivi NamoCell</Link></li>
                                        <li><Link href="">Tivi QLED</Link></li>
                                        <li><Link href="">Tivi thiết kế đặt biệt</Link></li>
                                    </ul>
                                </li>
                                <li className='fron-hotsp'><span className="fron-ul">Chọn theo kích thước</span>
                                    <ul className="sub-menu-tap8">
                                        <li><Link href="">32 inch</Link></li>
                                        <li><Link href="">43 inch</Link></li>
                                        <li><Link href="">50 inch</Link></li>
                                        <li><Link href="">55 inch</Link></li>
                                        <li><Link href="">65 inch</Link></li>
                                        <li><Link href="">85 inch</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
    // </div>
  )
}

export default Post_menu