'use client'
import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { useParams } from "next/navigation";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { editorConfig } from '@/app/Config/EditorConfig'
import Apidienthoai from "@/service/dienthoai"
import '@/app/(admin)/css/dienthoai.css'
import Apihinhanh from "@/service/hinhanh"
import Apimausac from "@/service/mausac"
import Apikhuyenmai from '@/service/khuyenmai'
import Apithongtin from '@/service/thongtinvsthongsokythuat'
import Apithongtinphanloai from '@/service/thongtinphanloai'

function Datadienthoai() {
    const [soLuongData, setsoLuongData] = useState("")
    const [soLuongDataAn, setsoLuongDataAn] = useState("")
    const [soLuongDataMo, setsoLuongDataMo] = useState("")
    const [soLuongiphone, setsoLuongiphone] = useState("")
    const [soLuongandroid, setsoLuongandroid] = useState("")
    const [tinhtrangdienthoai, settinhtrangdienthoai] = useState("")
    const [timkiemtendienthoai, settimkiemtendienthoai] = useState("")
    const [data, setdata] = useState([]);
    const [loadinghinhanh, setLoadinghinhanh] = useState(false);
    const [loadingmausac, setLoadingmausac] = useState(false);
    const [themmausac, setthemmausac] = useState(false);
    const [Message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentImageId, setCurrentImageId] = useState(null);
    const [MausacId, setMausacId] = useState(null);
    const [IDdienthoai, seIDdienthoai] = useState(null);
    const [tenmausac, settenmausac] = useState("");
    const [giaban, setgiaban] = useState("");
    const [kuyenmai, setkuyenmai] = useState(false);
    const [chinhsuakuyenmai, setchinhsuakuyenmai] = useState(false);
    const [themkuyenmai, setthemkuyenmai] = useState(false);
    const [datakhuenmai, setdatakhuyenmai] = useState(null);
    const [suadatakhuyenmai, setsuadatakhuyenmai] = useState("");
    const [suangaybatdau, setsuangaybatdau] = useState("");
    const [suanoidung, setsuanoidung] = useState("");
    const [suaphantram, setsuaphantram] = useState("");

    const [datakhuyenmaidienthoai, setdatakhuyenmaidienthoai] = useState([])

    const filters = useMemo(() => ({
    }), []);
    const fetchdienthoai = async (filters) => {
        try {
            const data = await Apidienthoai.getadmindienthoai(filters);
            setsoLuongData(data.length);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const filtertinhtrang = useMemo(() => ({
        tinhtrang: "Ẩn"
    }), []);

    const fetchdienthoaiTinhtrang = async (filtertinhtrang) => {
        try {
            const data = await Apidienthoai.getadmindienthoai(filtertinhtrang);
            setsoLuongDataAn(data.length)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const filtertinhtrangmo = useMemo(() => ({
        tinhtrang: "Mở"
    }), []);

    const fetchdienthoaiTinhtrangmo = async (filtertinhtrangmo) => {
        try {
            const data = await Apidienthoai.getadmindienthoai(filtertinhtrangmo);
            setsoLuongDataMo(data.length)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const filteriphone = useMemo(() => ({
        hedieuhanh: "iPhone"
    }), []);

    const fetchdienthoaiiphone = async (filteriphone) => {
        try {
            const data = await Apidienthoai.getadmindienthoai(filteriphone);
            setsoLuongiphone(data.length)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const filteriandroid = useMemo(() => ({
        hedieuhanh: "Android"
    }), []);

    const fetchdienthoaiandroid = async (filteriandroid) => {
        try {
            const data = await Apidienthoai.getadmindienthoai(filteriandroid);
            setsoLuongandroid(data.length)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const onChanTinhtrang = (e) => {
        settinhtrangdienthoai(e.target.value)
    }

    const onChantendienthoai = (e) => {
        settimkiemtendienthoai(e.target.value)
    }

    const filteridata = useMemo(() => ({
        tensanpham: timkiemtendienthoai,
        tinhtrang: tinhtrangdienthoai
    }), [timkiemtendienthoai, tinhtrangdienthoai]);

    const fetchdatadienthoai = async (filteridata) => {
        setLoading(true)
        try {
            const data = await Apidienthoai.getadmindienthoai(filteridata);
            setLoading(false)
            setdata(data)
            console.log(data)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    useEffect(() => {
        fetchdienthoai(filters);
        fetchdienthoaiTinhtrang(filtertinhtrang)
        fetchdienthoaiTinhtrangmo(filtertinhtrangmo)
        fetchdienthoaiiphone(filteriphone)
        fetchdienthoaiandroid(filteriandroid)
        fetchdatadienthoai(filteridata)
    }, [filteridata])

    // Các chức năng khuyến mãi và màu sắc
    const handlehinhdienthoai = async (id) => {
        setCurrentImageId(id);
        setLoadinghinhanh(prev => ({ ...prev, [id]: true }));
    }
    const handleTathinhdienthoai = async () => {
        setLoadinghinhanh(false)
    }

    const handTenmausac = async (e) => {
        settenmausac(e.target.value);
    }

    const handGiaban = async (e) => {
        setgiaban(e.target.value);
    }

    const handlemausacdienthoai = async (id) => {
        const phone = data.find(dienthoai => dienthoai.id === id);
        setMausacId(phone)
        setLoadingmausac(prev => ({ ...prev, [id]: true }));
    }

    const handleTatmausacdienthoai = async () => {
        setLoadingmausac(false)
    }

    const handThemmausac = async (id) => {
        seIDdienthoai(id)
        setthemmausac(prev => ({ ...prev, [id]: true }));
    }

    const handTatThemmausac = async () => {
        setthemmausac(false);
    }


    const formatCurrency = (value) => {
        // Ép kiểu thành số nếu giá trị không phải là số
        const numericValue = typeof value === 'number' ? value : parseFloat(value);
        // Xử lý trường hợp không phải là số
        if (isNaN(numericValue)) return '0 đ';
        // Định dạng số với dấu phân cách hàng nghìn và thêm đơn vị tiền tệ
        const formattedValue = numericValue.toLocaleString('vi-VN');
        return `${formattedValue} đ`;
    };

    const [image, setimage] = useState(null);

    const handleFileChange1s = (event) => {
        setimage(event.target.files[0]);
    };

    const handTanghinhanh = async (id) => {
        let hinhanhdienthoaiData = null;
        try {
            const hinhanhdienthoai = await Apihinhanh.postanh(image);
            const hinhanhs = hinhanhdienthoai.data
            hinhanhdienthoaiData = hinhanhdienthoai.data
            if (hinhanhdienthoai.data) {
                const mausacs = await Apimausac.postmausac(id, hinhanhs, tenmausac, giaban)
                setMessage('Thêm màu thành công')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        } catch (error) {
            try {
                const hinhanhdienthoai = await Apihinhanh.deleteanh(hinhanhdienthoaiData);
                setMessage('Thêm màu không thành công')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            } catch {
                setMessage('Thêm màu không thành công')
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        }
    }

    const handKhuyenmai = async (id) => {
        setkuyenmai(prev => ({ ...prev, [id]: true }));
        if (id != 0) {
            getKhuyemmai(id);
        } else {
            setdatakhuyenmai(null)
        }
    }

    const handChinhsuakhuyenmai = async () => {
        setchinhsuakuyenmai(false)
    }

    const handThemkhuyenmai = async (id) => {
        setsuadatakhuyenmai("");
        setsuangaybatdau("");
        setsuanoidung("");
        setsuaphantram("")
        setthemkuyenmai(prev => ({ ...prev, [id]: true }));
    }

    const handTatThemkhuyenmai = async () => {
        setthemkuyenmai(false)
    }

    const handtatkhuenmai = async () => {
        setkuyenmai(false)
    }

    const handchinhsuakhuyenmai = async (id) => {
        setchinhsuakuyenmai(prev => ({ ...prev, [id]: true }));
    }

    const getKhuyemmai = async (id) => {
        setLoading(true)
        try {
            const datakhuyenmai = await Apikhuyenmai.getKhuyenmai(id);
            setdatakhuyenmai(datakhuyenmai)
            setsuadatakhuyenmai(datakhuyenmai.ngayketkhuc)
            setsuangaybatdau(datakhuyenmai.ngaybatdau)
            setsuanoidung(datakhuyenmai.noidungkhuyenmai)
            setsuaphantram(datakhuyenmai.phantramkhuyenmai)
            setLoading(false)
        } catch {
        }
    }

    const [datakuyenmai, setdatakuyenmai] = useState(false);

    const handdatakhuyenmai = async (id) => {
        setdatakuyenmai(prev => ({ ...prev, [id]: true }));
        handXemkhuyenmai(id)
    }

    const handTatdatakhuyenmai = async () => {
        setdatakuyenmai(false)
    }
    // 
    const handXemkhuyenmai = async (id) => {
        setLoading(true)
        try {
            const datalichsukhuyenmai = await Apikhuyenmai.getKhuyenmaidienthoai(id)
            setdatakhuyenmaidienthoai(datalichsukhuyenmai)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }
    // 

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const postKhuyenmai = async (id) => {
        setLoading(true)
        try {
            if (!suangaybatdau || !suadatakhuyenmai || !suanoidung || !suaphantram) {
                setMessage('Không thể có dữ liệu trống')
                setLoading(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            } else {
                const putkhuyenmai = await Apikhuyenmai.postKhuyenmai(id, suangaybatdau, suadatakhuyenmai, suanoidung, suaphantram)
                if (putkhuyenmai) {
                    setMessage('Thêm khuyến mãi thành công')
                    fetchdatadienthoai(filteridata)
                    setLoading(false)
                    setthemkuyenmai(false)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
            }
        } catch {
            setMessage('Thêm khuyến mãi không thành công')
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    const handleNoidung = (event) => {
        setsuanoidung(event.target.value);
    }

    const handlePhantram = (event) => {
        setsuaphantram(event.target.value);
    }

    const handleDateTimeChange = (event) => {
        const input = event.target.value;
        const [currentDate, currentTime] = suangaybatdau.split(" ");
        const [inputDate, inputTime] = input.split("T");
        // Giữ nguyên ngày nếu inputDate không thay đổi
        const finalDate = inputDate === currentDate ? currentDate : inputDate;
        const formattedDateTime = `${finalDate} ${inputTime}`;
        setsuadatakhuyenmai(formattedDateTime);
    };

    const handleNgaybatdau = (event) => {
        const input = event.target.value;
        // Tách phần ngày và giờ từ suangaybatdau
        const [currentDate, currentTime] = suangaybatdau.split(" ");
        const [inputDate, inputTime] = input.split("T");
        // Giữ nguyên ngày nếu inputDate không thay đổi
        const finalDate = inputDate === currentDate ? currentDate : inputDate;
        const formattedDateTime = `${finalDate} ${inputTime}`;
        setsuangaybatdau(formattedDateTime);
    }

    const putCapnhatkhiuenmai = async (id) => {
        setLoading(true)
        try {
            const putkhuyenmai = await Apikhuyenmai.putKhuyenmai(id, suangaybatdau, suadatakhuyenmai, suanoidung, suaphantram)
            if (putkhuyenmai) {
                setMessage('Cập nhật thành công')
                getKhuyemmai(id);
                setLoading(false)
                setdatakuyenmai(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        } catch {
            setMessage('Cập nhật không thành công')
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }
    const [dataThongsokythuat, setdataThongsokythuat] = useState(false);
    const [Themthongsokythuat, setThemthongsokythuat] = useState(false);

    const handThongsokythuat = async (id) => {
        setdataThongsokythuat(prev => ({ ...prev, [id]: true }));
        handlegetThongsokythuat(id)
    }

    const handTatThemthongsokythuat = async (id) => {
        setThemthongsokythuat(false)
    }

    const handTatThongsokythuat = async () => {
        setdataThongsokythuat(false)
    }

    const handleEditorChange = (newContent) => {
        setEditorContent(newContent);
    };

    const handleDacdienoibat = (newDacdiem) => {
        setdacdiennoibat(newDacdiem)
    }

    const [editorContent, setEditorContent] = useState('');
    const [kichthuocmanhinh, setkichthuocmanhinh] = useState("");
    const [congnghemanghinh, setcongnghemanghinh] = useState("");
    const [tinhnangmanghinh, settinhnangmanghinh] = useState("");
    const [tansoquet, settansoquet] = useState("");
    const [camerasau, setcamerasau] = useState("");
    const [quayvideo, setquayvideo] = useState("");
    const [tinhnagcamera, settinhnagcamera] = useState("");
    const [cameratruoc, setcameratruoc] = useState("");
    const [quayvideotruoc, setquayvideotruoc] = useState("");
    const [loaicpu, setloaicpu] = useState("");
    const [dophangiai, setdophangiai] = useState("");
    const [chipset, setchipset] = useState("");
    const [gpu, setgpu] = useState("");
    const [khecamthenho, setkhecamthenho] = useState("");
    const [pin, setpin] = useState("");
    const [congnghesac, setcongnghesac] = useState("");
    const [congsac, setcongsac] = useState("");
    const [thesim, setthesim] = useState("");
    const [hedieuhang, sethedieuhang] = useState("");
    const [hongngoai, sethongngoai] = useState("");
    const [jacktainghe, setjacktainghe] = useState("");
    const [congghenfc, setcongghenfc] = useState("");
    const [hotromang, sethotromang] = useState("");
    const [wifi, setwifi] = useState("");
    const [bluetooth, setbluetooth] = useState("");
    const [gps, setgps] = useState("");
    const [kichthuoc, setkichthuoc] = useState("");
    const [trongluong, settrongluong] = useState("");
    const [chatlieumatlung, setchatlieumatlung] = useState("");
    const [tuongthich, settuongthich] = useState("");
    const [chatlieukhungvien, setchatlieukhungvien] = useState("");
    const [chisokhangnuocbui, setchisokhangnuocbui] = useState("");
    const [kieumanhinh, setkieumanhinh] = useState("");
    const [cambienvantai, setcambienvantai] = useState("");
    const [cacloaicambien, setcacloaicambien] = useState("");
    const [tinhnangdacbiet, settinhnangdacbiet] = useState("");
    const [dacdiennoibat, setdacdiennoibat] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    };

    const handThemthongsokythuat = async (id) => {
        setkichthuocmanhinh("")
        setcongnghemanghinh("")
        settinhnangmanghinh("")
        settansoquet("")
        setcamerasau("")
        setquayvideo("")
        settinhnagcamera("")
        setcameratruoc("")
        setquayvideotruoc("")
        setloaicpu("")
        setdophangiai("")
        setchipset("")
        setgpu("")
        setkhecamthenho("")
        setpin("")
        setcongnghesac("")
        setcongsac("")
        setthesim("")
        sethedieuhang("")
        sethongngoai("")
        setjacktainghe("")
        setcongghenfc("")
        sethotromang("")
        setwifi("")
        setbluetooth("")
        setgps("")
        setkichthuoc("")
        settrongluong("")
        setchatlieumatlung("")
        settuongthich("")
        setchatlieukhungvien("")
        setchisokhangnuocbui("")
        setkieumanhinh("")
        setcambienvantai("")
        setcacloaicambien("")
        settinhnangdacbiet("")
        setdacdiennoibat("")
        setEditorContent("")
        setThemthongsokythuat(prev => ({ ...prev, [id]: true }))
    }

    const handleImageUpload = async (file) => {
        try {
            const response = await Apihinhanh.postanh(file);
            if (response.data) {
                const imageUrl = response.data;
                const imageTag = `<img src="${imageUrl}" alt="" />`;
                const newContent = editorContent + imageTag;
                setEditorContent(newContent);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleThemthongsokythuat = async (id) => {
        setLoading(true)
        try {
            const response = await Apithongtin.postThongsolythuat(id, kichthuocmanhinh, congnghemanghinh, tinhnangmanghinh, tansoquet, camerasau, quayvideo, tinhnagcamera, cameratruoc, quayvideotruoc, loaicpu, dophangiai, chipset, gpu, khecamthenho, pin, congnghesac, congsac, thesim, hedieuhang, hongngoai, jacktainghe, congghenfc, hotromang, wifi, bluetooth, gps, kichthuoc, trongluong, chatlieumatlung, tuongthich, chatlieukhungvien, chisokhangnuocbui, kieumanhinh, cambienvantai, cacloaicambien, tinhnangdacbiet, dacdiennoibat, editorContent)
            if (response) {
                setMessage('Thêm thành công kỹ thuật điện thoại')
                fetchdatadienthoai(filteridata)
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        } catch {
            setMessage('Thêm không thành công kỹ thuật điện thoại')
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }
    // data thông số kỹ thuật
    const [dataThongsokythuatid, setdataThongsokythuatid] = useState("");

    const [chinhsuaThongsokythuat, setchinhsuaThongsokythuat] = useState(false);

    const handchinhsuaThongsokythuat = async (id) => {
        setchinhsuaThongsokythuat(prev => ({ ...prev, [id]: true }));
        handlegetThongsokythuat(id)
    }

    const handTatchinhsuaThongsokythuat = async () => {
        setchinhsuaThongsokythuat(false);
    }

    const handlegetThongsokythuat = async (id) => {
        setLoading(true)
        try {
            const response = await Apithongtin.getThongsokythuat(id);
            setdataThongsokythuatid(response)
            setkichthuocmanhinh(response.kichthuocmanhinh)
            setcongnghemanghinh(response.congnghemanghinh)
            settinhnangmanghinh(response.tinhnangmanghinh)
            settansoquet(response.tansoquet)
            setcamerasau(response.camerasau)
            setquayvideo(response.quayvideo)
            settinhnagcamera(response.tinhnagcamera)
            setcameratruoc(response.cameratruoc)
            setquayvideotruoc(response.quayvideotruoc)
            setloaicpu(response.loaicpu)
            setdophangiai(response.dophangiai)
            setchipset(response.chipset)
            setgpu(response.gpu)
            setkhecamthenho(response.khecamthenho)
            setpin(response.pin)
            setcongnghesac(response.congnghesac)
            setcongsac(response.congsac)
            setthesim(response.thesim)
            sethedieuhang(response.hedieuhang)
            sethongngoai(response.hongngoai)
            setjacktainghe(response.jacktainghe)
            setcongghenfc(response.congghenfc)
            sethotromang(response.hotromang)
            setwifi(response.wifi)
            setbluetooth(response.bluetooth)
            setgps(response.gps)
            setkichthuoc(response.kichthuoc)
            settrongluong(response.trongluong)
            setchatlieumatlung(response.chatlieumatlung)
            settuongthich(response.tuongthich)
            setchatlieukhungvien(response.chatlieukhungvien)
            setchisokhangnuocbui(response.chisokhangnuocbui)
            setkieumanhinh(response.kieumanhinh)
            setcambienvantai(response.cambienvantai)
            setcacloaicambien(response.cacloaicambien)
            settinhnangdacbiet(response.tinhnangdacbiet)
            setdacdiennoibat(response.dacdiennoibat)
            setEditorContent(response.chitiet)
            setLoading(false)
        } catch {

        }
    }
    const handleputThongsokythuat = async (id) => {
        setLoading(true)
        try {
            const response = await Apithongtin.putThongsolythuat(id, kichthuocmanhinh, congnghemanghinh, tinhnangmanghinh, tansoquet, camerasau, quayvideo, tinhnagcamera, cameratruoc, quayvideotruoc, loaicpu, dophangiai, chipset, gpu, khecamthenho, pin, congnghesac, congsac, thesim, hedieuhang, hongngoai, jacktainghe, congghenfc, hotromang, wifi, bluetooth, gps, kichthuoc, trongluong, chatlieumatlung, tuongthich, chatlieukhungvien, chisokhangnuocbui, kieumanhinh, cambienvantai, cacloaicambien, tinhnangdacbiet, dacdiennoibat, editorContent);
            if (response) {
                setMessage('Cập nhật thành công kỹ thuật điện thoại')
                fetchdatadienthoai(filteridata)
                setLoading(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        } catch {
            setMessage('Cập nhật thành công kỹ thuật điện thoại')
            setTimeout(() => {
                setMessage('')
                setLoading(false)
            }, 5000);
        }
    }
    // Cập nhật điện thoại
    const [getcapnhatdienthoai, setgetcapnhatdienthoai] = useState(false);
    const [ram, setram] = useState("");
    const [giabanra, setgiabanra] = useState("");
    const [hinhanh, sethinhanh] = useState("");
    const [hinhanhduyet, sethinhanhduyet] = useState("");
    const [hinhanhduyets, sethinhanhduyets] = useState([]);
    const [bonho, setbonho] = useState("");
    const [tensanpham, settensanpham] = useState("");
    const [tinhtrang, settinhtrang] = useState("");
    const [thongtinphanloaiid, setthongtinphanloai] = useState("");
    const [datathongttinphanloai, setdatathongttinphanloai] = useState([]);
    const [datacapnhatdienthoai, setdatacapnhatdienthoai] = useState([]);

    const handTatgetdienthoai = async () => {
        setgetcapnhatdienthoai(false)
    }

    const handlecapnhatFileChange1s = (event) => {
        sethinhanh(event.target.files[0]);
    };

    const handleduyetFileChange = (event) => {
        sethinhanhduyet(event.target.files);
    };

    const getdienthoai = async (id) => {
        setLoading(true)
        setgetcapnhatdienthoai(prev => ({ ...prev, [id]: true }));
        try {
            const responseget = await Apidienthoai.getIddienthoai(id)
            setram(responseget.ram)
            setgiabanra(responseget.giaban)
            sethinhanh(responseget.hinhanh)
            sethinhanhduyet(responseget.hinhanhduyet)
            sethinhanhduyets(Array.isArray(responseget.hinhanhduyet)
                ? responseget.hinhanhduyet
                : responseget.hinhanhduyet.split(","));
            setbonho(responseget.bonho)
            settensanpham(responseget.tensanpham)
            settinhtrang(responseget.tinhtrang)
            setthongtinphanloai(responseget.thongtinphanloaiId)
            setdatacapnhatdienthoai(responseget)
            setLoading(false)
        } catch {
        }
    }

    const getThongtinphanloai = async () => {

        try {
            const getThongtinphanloai = await Apithongtinphanloai.getThongtinphanloai();
            setdatathongttinphanloai(getThongtinphanloai.result)

        } catch {
            setSuccessMessage('Không có thông tin');
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        }
    }

    const capnhatDienthoai1 = async (id) => {
        setLoading(true)
        let hinhanhdienthoai = null;
        let hinhdanhduyetdienthoai = null;
        try {
            if (hinhanh === datacapnhatdienthoai.hinhanh && hinhanhduyet === datacapnhatdienthoai.hinhanhduyet) {
                hinhanhdienthoai = datacapnhatdienthoai.hinhanh;
                hinhdanhduyetdienthoai = datacapnhatdienthoai.hinhanhduyet;
                const response = await Apidienthoai.putdienthoai(id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang, thongtinphanloaiid)
                setMessage('Cập nhật thành điện thoại')
                fetchdatadienthoai(filteridata)
                setLoading(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
            if (hinhanh !== datacapnhatdienthoai.hinhanh && hinhanhduyet === datacapnhatdienthoai.hinhanhduyet) {
                const deletelhinhanh = await Apihinhanh.deleteanh(datacapnhatdienthoai.hinhanh);
                if (deletelhinhanh.data) {
                    const hinhanhdienthoais = await Apihinhanh.postanhdienthoai(hinhanh);
                    hinhanhdienthoai = hinhanhdienthoais.data;
                    hinhdanhduyetdienthoai = datacapnhatdienthoai.hinhanhduyet;
                    if (hinhanhdienthoai.data) {
                        const response = await Apidienthoai.putdienthoai(id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang, thongtinphanloaiid)
                        setMessage('Cập nhật thành điện thoại')
                        fetchdatadienthoai(filteridata)
                        setLoading(false)
                        setTimeout(() => {
                            setMessage('')
                        }, 5000);
                    }
                }
            }
            if (hinhanh === datacapnhatdienthoai.hinhanh && hinhanhduyet !== datacapnhatdienthoai.hinhanhduyet) {
                const deletelhinhanhduyet = await Apihinhanh.deletehinhanhduyet(datacapnhatdienthoai.hinhanhduyet);
                if (deletelhinhanhduyet.data) {
                    const formData = new FormData();
                    for (let i = 0; i < hinhanhduyet.length; i++) {
                        formData.append("images", hinhanhduyet[i]);
                    }
                    const hinhanhduyetdienthoai = await Apihinhanh.posthinhanhduyet(formData);
                    hinhanhdienthoai = datacapnhatdienthoai.hinhanh;
                    hinhdanhduyetdienthoai = hinhanhduyetdienthoai.data
                    if (hinhanhduyetdienthoai.data) {
                        const response = await Apidienthoai.putdienthoai(id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang, thongtinphanloaiid)
                        setMessage('Cập nhật thành điện thoại')
                        fetchdatadienthoai(filteridata)
                        setLoading(false)
                        setTimeout(() => {
                            setMessage('')
                        }, 5000);
                    }
                }
            }
            if (hinhanh !== datacapnhatdienthoai.hinhanh && hinhanhduyet !== datacapnhatdienthoai.hinhanhduyet) {
                const imageUrl = datacapnhatdienthoai.hinhanh
                const deletelhinhanh = await Apihinhanh.deleteanh(imageUrl);
                if (deletelhinhanh.data) {
                    const datahinhanhdienthoai = await Apihinhanh.postanhdienthoai(hinhanh);
                    hinhanhdienthoai = datahinhanhdienthoai.data
                    if (datahinhanhdienthoai.data) {
                        const imageUrl = datacapnhatdienthoai.hinhanhduyet;
                        const deletelhinhanhduyet = await Apihinhanh.deletehinhanhduyet(imageUrl);
                        if (deletelhinhanhduyet.data) {
                            const formData = new FormData();
                            for (let i = 0; i < hinhanhduyet.length; i++) {
                                formData.append("images", hinhanhduyet[i]);
                            }
                            const hinhanhduyetdienthoai = await Apihinhanh.posthinhanhduyet(formData);
                            hinhdanhduyetdienthoai = hinhanhduyetdienthoai.data
                            if (hinhanhduyetdienthoai.data) {
                                const response = await Apidienthoai.putdienthoai(id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang)
                                setMessage('Cập nhật thành điện thoại')
                                fetchdatadienthoai(filteridata)
                                setLoading(false)
                                setTimeout(() => {
                                    setMessage('')
                                }, 5000);
                            }
                        }
                    }
                }
            }

        } catch {
            try {
                const datahinhanhdienthoai = await Apihinhanh.postanhdienthoai(hinhanh);
                hinhanhdienthoai = datahinhanhdienthoai.data
                if (datahinhanhdienthoai.data) {
                    const formData = new FormData();
                    for (let i = 0; i < hinhanhduyet.length; i++) {
                        formData.append("images", hinhanhduyet[i]);
                    }
                    const hinhanhduyetdienthoai = await Apihinhanh.posthinhanhduyet(formData);
                    hinhdanhduyetdienthoai = hinhanhduyetdienthoai.data
                    if (hinhanhduyetdienthoai.data) {
                        const response = await Apidienthoai.putdienthoai(id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang, thongtinphanloaiid)
                        setMessage('Cập nhật thành điện thoại')
                        fetchdatadienthoai(filteridata)
                        setLoading(false)
                        setTimeout(() => {
                            setMessage('')
                        }, 5000);
                    }

                }
            } catch {
                console.log("test")
            }
        }
    }


    const capnhatDienthoai = async (id) => {
        setLoading(true);
        let hinhanhMoi = null;           // URL/ID ảnh chính sau khi upload (nếu có)
        let hinhanhDuyetMoi = null;      // URL/IDs ảnh duyệt sau khi upload (nếu có)
      
        try {
          // XÁC ĐỊNH ĐÃ ĐỔI ẢNH CHƯA
          // Tùy hệ thống của bạn: nếu hinhanh là File/Blob thì coi như đã đổi.
          const changedMain = !!(hinhanh && hinhanh !== datacapnhatdienthoai?.hinhanh);
          // Với ảnh duyệt: nếu là FileList/Array File => coi như đã đổi
          const changedApprove = Array.isArray(hinhanhduyet) || (hinhanhduyet && hinhanhduyet !== datacapnhatdienthoai?.hinhanhduyet);
      
          // MẶC ĐỊNH: dùng giá trị cũ
          hinhanhMoi = datacapnhatdienthoai?.hinhanh || null;
          hinhanhDuyetMoi = datacapnhatdienthoai?.hinhanhduyet || null;
      
          // 1) XOÁ & UPLOAD ẢNH CHÍNH NẾU ĐỔI
          if (changedMain) {
            // Xoá ảnh cũ (nếu có)
            if (datacapnhatdienthoai?.hinhanh) {
              const respDelMain = await Apihinhanh.deleteanh(datacapnhatdienthoai.hinhanh);
              const ok = respDelMain?.status === 200 || respDelMain?.status === 204 || respDelMain?.data?.success === true;
              if (!ok) {
                console.warn('Xoá ảnh chính không thành công nhưng tiếp tục upload ảnh mới.');
              }
            }
            // Upload ảnh mới
            const respUpMain = await Apihinhanh.postanhdienthoai(hinhanh); // hinhanh: File/URL tuỳ API
            if (!respUpMain?.data) throw new Error('Upload ảnh chính thất bại');
            hinhanhMoi = respUpMain.data; // tuỳ API: có thể là URL/ID
          }
      
          // 2) XOÁ & UPLOAD ẢNH DUYỆT NẾU ĐỔI
          if (changedApprove) {
            // Xoá ảnh duyệt cũ (nếu có)
            if (datacapnhatdienthoai?.hinhanhduyet) {
              const respDelApprove = await Apihinhanh.deletehinhanhduyet(datacapnhatdienthoai.hinhanhduyet);
              const ok = respDelApprove?.status === 200 || respDelApprove?.status === 204 || respDelApprove?.data?.success === true;
              if (!ok) {
                console.warn('Xoá ảnh duyệt không thành công nhưng tiếp tục upload ảnh duyệt mới.');
              }
            }
            // Upload ảnh duyệt mới (nhiều file)
            const formData = new FormData();
            if (Array.isArray(hinhanhduyet)) {
              hinhanhduyet.forEach(f => formData.append('images', f));
            } else if (hinhanhduyet && hinhanhduyet.length) {
              // FileList
              for (let i = 0; i < hinhanhduyet.length; i++) formData.append('images', hinhanhduyet[i]);
            } else {
              console.warn('Không có ảnh duyệt mới để upload.');
            }
      
            const respUpApprove = await Apihinhanh.posthinhanhduyet(formData);
            if (!respUpApprove?.data) throw new Error('Upload ảnh duyệt thất bại');
            hinhanhDuyetMoi = respUpApprove.data; // tuỳ API: URL/IDs
          }
      
          // 3) GỌI API CẬP NHẬT ĐIỆN THOẠI (TRUYỀN ĐỦ THAM SỐ)
          await Apidienthoai.putdienthoai(
            id,
            ram,
            giabanra,
            hinhanhDuyetMoi,
            hinhanhMoi,
            bonho,
            tensanpham,
            tinhtrang,
            thongtinphanloaiid // đừng bỏ tham số này ở bất kỳ nhánh nào
          );
      
          setMessage('Cập nhật thành công điện thoại');
          fetchdatadienthoai(filteridata);
        } catch (error) {
          console.error('Lỗi cập nhật điện thoại:', error);
          setMessage('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
        } finally {
          setLoading(false);
          setTimeout(() => setMessage(''), 5000);
        }
      };
      
    useEffect(() => {
        getThongtinphanloai()
        handgetdienthoai()
        console.log('Hoang');
        console.log(data);
    }, [])

    const [thongtindienthoai, setthongtindienthoai] = useState(false);
    const [datathongtindienthoai, setdatathongtindienthoai] = useState([]);
    const [baohanh, setbaohanh] = useState('');
    const [thietbidikem, setthietbidikem] = useState('');
    const [tinhtrangmay, settinhtrangmay] = useState('');
    const [iddienthoai, setiddienthoai] = useState('');
    const [datadienthoai, setdatadienthoai] = useState([]);
    const [capnhatthongtindienthoai, setcapnhatthongtindienthoai] = useState(false);
    const [themthongtindienthoai, setthemthongtindienthoai] = useState(false);

    const handgetthongtin = async (id) => {
        setthongtindienthoai(prev => ({ ...prev, [id]: true }));
        getThongtin(id)
    }

    const handleCapnhatThongso = async (id) => {
        setcapnhatthongtindienthoai(prev => ({ ...prev, [id]: true }))
    }

    const handleTatCapnhatThongso = async () => {
        setcapnhatthongtindienthoai(false)
    }

    const handTatgetThongtin = async () => {
        setthongtindienthoai(false)
    }

    const handgetdienthoai = async () => {
        try {
            const datadienthoais = await Apidienthoai.getAlldienthoai()
            setdatadienthoai(datadienthoais)
        } catch {
            console.error("Lỗi :", error)
        }
    }

    const getThongtin = async (id) => {
        setLoading(true)
        try {
            const getThongtin = await Apithongtin.getThongtindienthoai(id);
            // const datadienthoais = await Apidienthoai.getAlldienthoai()
            // const Phone = datadienthoais.find(
            //     (phone) => phone.id === getThongtin.dienthoaiId
            // );
            setbaohanh(getThongtin.baohanh)
            setthietbidikem(getThongtin.thietbidikem)
            settinhtrangmay(getThongtin.tinhtrangmay)
            setiddienthoai(getThongtin.dienthoaiId)
            setdatathongtindienthoai(getThongtin)
            setLoading(false)
        } catch {
            setMessage('Không có thông tin');
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    const handleCapnhatThongsodienthoai = async (id) => {
        setLoading(true)
        try {
            const putcapnhatthongso = await Apithongtin.putThongtindienthoai(id, baohanh, iddienthoai, tinhtrangmay, thietbidikem)
            setMessage('Cập nhật thành công');
            fetchdatadienthoai(filteridata)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        } catch {
            setMessage('Cập nhật không thành công');
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }


    const handThemthongtindienthoai = async () => {
        setbaohanh('')
        setthietbidikem('')
        settinhtrangmay('')
        setiddienthoai('')
        setthemthongtindienthoai(true)
    }

    const handTatThemthongtindienthoai = async () => {
        setthemthongtindienthoai(false)
    }

    const handThemthongtindienthoais = async (id) => {
        setLoading(true)
        try {
            const datathemdienthoai = await Apithongtin.postThongtindienthoai(id, baohanh, tinhtrangmay, thietbidikem)
            setMessage('Thêm thành công');
            fetchdatadienthoai(filteridata)
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        } catch {
            setMessage('Thêm không thành công');
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    const handXoathongtindienthoai = async (id) => {
        try {
            setLoading(true)
            const dataXoa = await Apithongtin.deletethongtin(id)
        } catch {
            setMessage('Xoá không thành công');
            setLoading(false)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    return (
        <div>
            {loading && <div className="loading-overlay-khuyenmai">
                <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-56 w-56'></div>
            </div>}
            {Message && <div className="success-message">{Message}</div>}
            <div className="grid pb-10 mt-4">
                <div className="mb-2">
                    <p className="text-2xl font-semibold text-gray-400">SẢN PHẨM ĐIỆN THOẠI</p>
                </div>
                <div className="grid grid-cols-12 gap-6 border-b-2 pb-5">
                    <div className="col-span-12 sm:col-span-12">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 mt-3">
                            <div className="p-4">
                                <p className="text-xl text-red-500 font-bold">SL: {soLuongData}</p>
                                <p className="text-sm font-semibold text-gray-400">Tổng số điện thoại</p>
                            </div>
                            <div className="p-4">
                                <p className="text-xl text-red-500 font-bold">SL: {soLuongiphone}</p>
                                <p className="text-sm font-semibold text-gray-400">Tổng số điện thoại Iphone</p>
                            </div>
                            <div className="p-4">
                                <p className="text-xl text-red-500 font-bold">SL: {soLuongandroid}</p>
                                <p className="text-sm font-semibold text-gray-400">Tổng số điện thoại Android</p>
                            </div>
                            <div className=" p-4">
                                <p className="text-xl text-red-500 font-bold">SL: {soLuongDataMo}</p>
                                <p className="text-sm font-semibold text-gray-400">Số lượng hiện sản phẩm</p>
                            </div>
                            <div className="p-4">
                                <p className="text-xl text-red-500 font-bold">SL: {soLuongDataAn}</p>
                                <p className="text-sm font-semibold text-gray-400">Số lượng ẩn sản phẩm</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid mt-4">
                    <div className="mb-2">
                        <p className="text-xl font-semibold text-gray-400">Tìm kiếm sản phẩm điện thoại</p>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        <input value={timkiemtendienthoai} onChange={onChantendienthoai} type="text" placeholder="Tìm kiếm tên điện thoại" className="border p-2 rounded w-full" />
                        <select value={tinhtrangdienthoai} onChange={onChanTinhtrang}>
                            <option hidden>Chọn tình trang</option>
                            <option value="">Tất cả</option>
                            <option value="Mở">Mở</option>
                            <option value="Ẩn">Ẩn</option>
                        </select>
                    </div>
                </div>
                <div className='block w-full overflow-x-auto'>
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ID
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Tên điện thoại
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Hình ảnh
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Hình ảnh duyệt
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Giá bán
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Bộ nhớ
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Ram
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Màu sắc
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Khuyến mãi
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Thông số kỹ thuật
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Thông tin
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Tình trạng
                                </th>
                                <th className="px-1 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((dienthoai, index) => {
                                const hinhanhduyetdienthoai = dienthoai.hinhanhduyet;
                                // const imageArray = hinhanhduyetdienthoai.split(',');
                                const imageArray = hinhanhduyetdienthoai.split(",").map((url, index) => ({
                                    id: dienthoai.id,
                                    url: url,
                                }));

                                const giabandienthoai = dienthoai.giaban;
                                return (
                                    <tr key={`${dienthoai.id}-${index}`} className="hover:bg-slate-300">

                                        <td className="border-b text-black px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {dienthoai.id}
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {dienthoai.tensanpham}
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                                            <img className="img-dienthoai" alt={dienthoai.tensanpham} src={`${dienthoai.hinhanh}`} />
                                        </td>
                                        <td className="img_duyet border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                                            {loadinghinhanh[dienthoai.id] && (
                                                <div className='mausac-an'>
                                                    <div className="loading-anh">
                                                        <div className='!z-5 relative flex h-full w-full bg-gray-900 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                            <div className='ml-auto'>
                                                                <div className='relative flex'>
                                                                    <div className="mb-3 text-right">
                                                                        <button onClick={handleTathinhdienthoai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                        <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='mb-auto flex-col items-center justify-center'>
                                                                {currentImageId && (
                                                                    <>
                                                                        {imageArray
                                                                            .filter((image) => image.id === currentImageId)
                                                                            .map((image, index) => (
                                                                                <img
                                                                                    key={index}
                                                                                    src={image.url}
                                                                                    alt={`Image ${index + 1}`}
                                                                                    className="img-danhmuc"
                                                                                />
                                                                            ))}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button onClick={() => handlehinhdienthoai(dienthoai.id)} className="xemanh px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Xem ảnh</button>
                                        </td>
                                        <td className="border-t-0 text-black px-2 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {formatCurrency(giabandienthoai)}
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {dienthoai.bonho} {dienthoai.bonho != 1 && (<>GB</>)} {dienthoai.bonho == 1 && (<>TB</>)}
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {dienthoai.ram} GB
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {loadingmausac[dienthoai.id] && (
                                                <div className='mausac-an'>
                                                    <div className="loading-mausac">
                                                        <div className='!z-5 relative flex h-full w-full bg-slate-500 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                            <div className='ml-auto'>
                                                                <div className='relative flex'>
                                                                    <div className="mb-3 text-right">
                                                                        <button onClick={handleTatmausacdienthoai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                        <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='mb-auto flex-col items-center justify-center'>
                                                                <table className="min-w-full border-collapse">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                ID
                                                                            </th>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                Màu sắc
                                                                            </th>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                Hình ảnh
                                                                            </th>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                Giá bán
                                                                            </th>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                Số lượng
                                                                            </th>
                                                                            <th className="px-6 text-black bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                                Quản lý
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    {MausacId && (
                                                                        <tbody>
                                                                            {MausacId.mausac_list && MausacId.mausac_list.length > 0 ? (
                                                                                MausacId.mausac_list.map((color, index) => (
                                                                                    <tr key={`${color.id}-${index}`} className="hover:bg-slate-300">
                                                                                        <td className="border-b px-6 text-black align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">
                                                                                            {color.id}
                                                                                        </td>
                                                                                        <td className="border-t-0 text-black px-6 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">
                                                                                            {color.tenmausac}
                                                                                        </td>
                                                                                        <td className="border-t-0 text-black px-6 align-middle border-b border-r-0 text-xs whitespace-nowrap p-2 text-left text-blueGray-700">
                                                                                            <img className="img-dienthoai" src={color.hinhanh} alt={color.tenmausac} />
                                                                                        </td>
                                                                                        <td className="border-t-0 text-black px-6 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">
                                                                                            {formatCurrency(color.giaban)} VND
                                                                                        </td>
                                                                                        <td className="border-t-0 text-black px-6 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">
                                                                                            {color.soluong}
                                                                                        </td>
                                                                                        <td className="border-t-0 text-black px-6 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">
                                                                                            <button className="xemmau px-3 py-2 leading-5 text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">
                                                                                                Xem
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : (
                                                                                <tr>
                                                                                    <td colSpan="6" className="text-center text-red-500 py-3">
                                                                                        Chưa có màu sắc
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    )}
                                                                </table>
                                                                {themmausac[dienthoai.id] && (
                                                                    <div className="loading-themmausac">
                                                                        <div className='!z-5 relative loading-themmausac flex h-full w-full bg-slate-950 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                                            <div className='ml-auto'>
                                                                                <div className='relative flex'>
                                                                                    <div className="mb-3 text-right">
                                                                                        <button onClick={handTatThemmausac} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                                        <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='mb-auto flex-col items-center justify-center'>
                                                                                <h2 className='textthemmausac'>Thêm vào màu sắc</h2>
                                                                                <div className='mt-9'>
                                                                                    <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Tên màu sắc</label>
                                                                                    <input value={tenmausac} onChange={handTenmausac} id="username" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                                                </div>
                                                                                <div className='mt-9'>
                                                                                    <label className="text-xl text-white  dark:text-gray-200" htmlFor="username">Giá bán</label>
                                                                                    <input value={giaban} onChange={handGiaban} id="username" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                                                </div>
                                                                                <div className='mt-9'>
                                                                                    <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh điện thoại</label>
                                                                                    <input onChange={handleFileChange1s} type="file" className="text-lg block w-full px-4 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                                                </div>
                                                                                <div className='mt-9'>
                                                                                    <button onClick={() => handTanghinhanh(dienthoai.id)} className="button-themmausac px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-lime-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Thêm màu sắc điện thoại</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <button onClick={() => handThemmausac(dienthoai.id)} className="themmausac px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-lime-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Thêm màu sắc</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <button onClick={() => handlemausacdienthoai(dienthoai.id)} className="xemmau px-3 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-900 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Xem</button>
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {kuyenmai[dienthoai.khuyenmai_id] && (
                                                <div className='khuenmai-data'>
                                                    <div className="loading-khuenmai">
                                                        <div className='!z-5 relative flex h-full w-full bg-gray-900 flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                            <div className='ml-auto'>
                                                                <div className='relative flex'>
                                                                    <div className="mb-3 text-right">
                                                                        <button onClick={handtatkhuenmai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                        <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='mb-auto flex-col items-center justify-center'>
                                                                {datakhuenmai && (
                                                                    <div className='khuyenmai-p'>
                                                                        <p className='ngaybatdau'><strong>Ngày bắt đầu:</strong><span className='clo-p'> {formatDateTime(datakhuenmai.ngaybatdau)}</span></p>
                                                                        <p className='ngayketthuc'><strong>Ngày kết thúc:</strong><span className='clo-p'> {formatDateTime(datakhuenmai.ngayketkhuc)}</span></p>
                                                                        <p className='ngayketthuc'><strong>Phần trăm khuyến mãi:</strong><span className='clo-p'> {datakhuenmai.phantramkhuyenmai}%</span></p>
                                                                        <p className='noidung'><strong>Nội dung khuyến mãi:</strong><span className='clo-noidung'> {datakhuenmai.noidungkhuyenmai}</span></p>
                                                                        <button onClick={() => handchinhsuakhuyenmai(dienthoai.khuyenmai_id)} className="khuyenmai-button px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-lime-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Chỉnh sửa màu sắc</button>
                                                                    </div>)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {chinhsuakuyenmai[dienthoai.khuyenmai_id] && (
                                                <div className="loading-chinhsuakhuenmai">
                                                    <div className='!z-5 relative loading-chinhsuakhuenmais flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handChinhsuakhuyenmai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Chỉnh sửa thông tin khuyến mãi</h2>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Ngày bắt đầu khuyến mãi</label>
                                                                <input
                                                                    type="datetime-local"
                                                                    id="datetime"
                                                                    name="datetime"
                                                                    // Chuyển đổi từ "YYYY-MM-DD HH:mm:ss" sang "YYYY-MM-DDTHH:mm" để phù hợp với `datetime-local`
                                                                    value={suangaybatdau.replace(" ", "T")}
                                                                    onChange={handleNgaybatdau}
                                                                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Ngày kết thúc khuyến mãi</label>
                                                                <input
                                                                    type="datetime-local"
                                                                    id="datetime"
                                                                    name="datetime"
                                                                    // Chuyển đổi từ "YYYY-MM-DD HH:mm:ss" sang "YYYY-MM-DDTHH:mm" để phù hợp với `datetime-local`
                                                                    value={suadatakhuyenmai.replace(" ", "T")}
                                                                    onChange={handleDateTimeChange}
                                                                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nhập phần trăm khuyến mãi 0 đến 100</label>
                                                                <input
                                                                    id="username"
                                                                    type="number"
                                                                    max="100"
                                                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                                        if (parseInt(e.target.value) > 100) e.target.value = 100;
                                                                        if (parseInt(e.target.value) < 0) e.target.value = 0;
                                                                    }}
                                                                    value={suaphantram}
                                                                    onChange={handlePhantram}
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nôi dung khuyến mãi</label>
                                                                <textarea value={suanoidung} onChange={handleNoidung} id="username" type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => putCapnhatkhiuenmai(dienthoai.khuyenmai_id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {themkuyenmai[dienthoai.id] && (
                                                <div className="loading-chinhsuakhuenmai">
                                                    <div className='!z-5 relative loading-chinhsuakhuenmais flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatThemkhuyenmai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Thêm khuyến mãi điện thoại</h2>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Ngày bắt đầu khuyến mãi</label>
                                                                <input
                                                                    type="datetime-local"
                                                                    id="datetime"
                                                                    name="datetime"
                                                                    // Chuyển đổi từ "YYYY-MM-DD HH:mm:ss" sang "YYYY-MM-DDTHH:mm" để phù hợp với `datetime-local`
                                                                    value={suangaybatdau.replace(" ", "T")}
                                                                    onChange={handleNgaybatdau}
                                                                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Ngày kết thúc khuyến mãi</label>
                                                                <input
                                                                    type="datetime-local"
                                                                    id="datetime"
                                                                    name="datetime"
                                                                    // Chuyển đổi từ "YYYY-MM-DD HH:mm:ss" sang "YYYY-MM-DDTHH:mm" để phù hợp với `datetime-local`
                                                                    value={suadatakhuyenmai.replace(" ", "T")}
                                                                    onChange={handleDateTimeChange}
                                                                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nhập phần trăm khuyến mãi 0 đến 100</label>
                                                                <input
                                                                    id="username"
                                                                    type="number"
                                                                    max="100"
                                                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                                        if (parseInt(e.target.value) > 100) e.target.value = 100;
                                                                        if (parseInt(e.target.value) < 0) e.target.value = 0;
                                                                    }}
                                                                    value={suaphantram}
                                                                    onChange={handlePhantram}
                                                                />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nội dung khuyến mãi</label>
                                                                <textarea value={suanoidung} onChange={handleNoidung} id="username" type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => postKhuyenmai(dienthoai.id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Thêm khuyến mãi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {datakuyenmai[dienthoai.id] && (
                                                <div className="loading-tatcakhuenmai">
                                                    <div className='!z-5 relative loading-tatcakhuenmais flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatdatakhuyenmai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Danh sách khuyến mãi</h2>
                                                            <table className="items-center bg-transparent w-full border-collapse mt-5">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            STT
                                                                        </th>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            Ngày khuyến mãi
                                                                        </th>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            Ngày kết khúc
                                                                        </th>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            Phần trăm khuyến mãi
                                                                        </th>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            Nội dung khuyến mãi
                                                                        </th>
                                                                        <th className="px-1 text-teal-50 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                            Quản lý
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {datakhuyenmaidienthoai.map((datakhuyenmai, index) => {
                                                                        const ngayBatDau = new Date(datakhuyenmai.ngaybatdau);
                                                                        const ngayHienTai = new Date();
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">{index}</td>
                                                                                <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">{datakhuyenmai.ngaybatdau}</td>
                                                                                <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">{datakhuyenmai.ngayketkhuc}</td>
                                                                                {/* <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">{datakhuyenmai.noidungkhuyenmai}</td> */}
                                                                                <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700">{datakhuyenmai.phantramkhuyenmai}</td>
                                                                                <td className="border-b text-teal-50 px-2 align-middle border-l-0 border-r-0 text-xs p-3 text-left text-blueGray-700 max-w-[400px] break-words whitespace-normal">
                                                                                    {datakhuyenmai.noidungkhuyenmai}
                                                                                </td>
                                                                                <td>
                                                                                    {ngayBatDau > ngayHienTai && (
                                                                          
                                                                                            <button
                                                                                                onClick={() => handKhuyenmai(datakhuyenmai.id)}
                                                                                                className="khuyenmai-button px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-lime-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600"
                                                                                            >
                                                                                                Chỉnh sửa khuyến mãi
                                                                                            </button>
                                                                          
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                {dienthoai.khuyenmai_id === 0 ? <>
                                                    <button onClick={() => handThemkhuyenmai(dienthoai.id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">
                                                        Thêm
                                                    </button>
                                                    <button onClick={() => handdatakhuyenmai(dienthoai.id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">
                                                        Lịch sử
                                                    </button>
                                                </> : <>
                                                    <button onClick={() => handKhuyenmai(dienthoai.khuyenmai_id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">
                                                        Xem
                                                    </button>
                                                    <button onClick={() => handdatakhuyenmai(dienthoai.id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">
                                                        Lịch sử
                                                    </button>
                                                </>}
                                            </div>
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {dataThongsokythuat[dienthoai.thongsokythuat_id] && (
                                                <div className="loading-thongsokythuat">
                                                    <div className='!z-5 relative loading-thongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatThongsokythuat} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Thông tin kỹ thuật điện thoại</h2>

                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Kích thước màng hình:</span> {kichthuocmanhinh} inches</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Công nghệ màng hình:</span> {congnghemanghinh}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tính năng màng hình:</span> {tinhnangmanghinh}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tần số quét:</span> {tansoquet} Hz</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Camera sau:</span> {camerasau}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Camera trước:</span> {cameratruoc}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tính năng camera:</span> {tinhnagcamera}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Quay video trước:</span> {quayvideotruoc}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Quay video sau:</span> {quayvideo}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Loại CPU:</span> {loaicpu}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Độ phân giải:</span> {dophangiai}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Chip set:</span> {chipset}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- GPU:</span> {gpu}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Khe cấm thẻ nhớ:</span> {khecamthenho}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Pin:</span> {pin} mAh</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Công nghệ sạc:</span> {congnghesac}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Cổng sạc:</span> {congsac}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Thẻ sim:</span> {thesim}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Hệ điều hành:</span> {hedieuhang}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Hồng ngoại:</span> {hongngoai}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Jack tai nghe:</span> {jacktainghe}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Công nghệ fc:</span> {congghenfc}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Hỗ trợ mạng:</span> {hotromang}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Wifi:</span> {wifi}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Bluetooth:</span> {bluetooth}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- GPS:</span> {gps}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Kích thước:</span> {kichthuoc}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Trọng lượng:</span> {trongluong}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Chất liệu mặt lưng:</span> {chatlieumatlung}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tương thích:</span> {tuongthich}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Chất liệu khung viền:</span> {chatlieukhungvien}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Chỉ số kháng nước và bụi:</span> {chisokhangnuocbui}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Cảm biến vân tay:</span> {cambienvantai}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Kiểu màng hình:</span> {kieumanhinh}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Các loại cảm biến:</span> {cacloaicambien}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tính năng đặc biệt:</span> {tinhnangdacbiet}</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>Đặc điểm nổi bật</span></label>
                                                                <div className="back-text back-text-html mt-5 p-2" dangerouslySetInnerHTML={{ __html: (dacdiennoibat) }} />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>Chi tiết sản phẩm</span></label>
                                                                <div className="back-text back-text-html mt-5 p-2" dangerouslySetInnerHTML={{ __html: (editorContent) }} />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => handchinhsuaThongsokythuat(dienthoai.thongsokythuat_id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {chinhsuaThongsokythuat[dienthoai.thongsokythuat_id] && (
                                                <div className="loading-suathongsokythuat">
                                                    <div className='!z-5 relative loading-suathongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatchinhsuaThongsokythuat} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Chỉnh sửa thông số kỹ thuật điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kích thước màng hình</label>
                                                                <input value={kichthuocmanhinh || ""} onChange={(e) => setkichthuocmanhinh(e.target.value)} type="text" placeholder="Kích thước màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ màng hình</label>
                                                                <JoditEditor value={congnghemanghinh || ""}
                                                                config={editorConfig} 
                                                                onChange={(content) => setcongnghemanghinh(content)}
                                                                //onChange={(e) => setcongnghemanghinh(e.target.value)} 
                                                                type="text" placeholder="Công nghệ màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng màng hình</label>
                                                                <JoditEditor 
                                                                config={editorConfig} 
                                                                value={tinhnangmanghinh || ""} 
                                                                onChange={(content) => settinhnangmanghinh(content)}
                                                                // onChange={(e) => settinhnangmanghinh(e.target.value)}
                                                                 type="text" placeholder="Tính năng màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tần số quét</label>
                                                                <input value={tansoquet || ""} onChange={(e) => settansoquet(e.target.value)} type="text" placeholder="Tần số quét" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Camera sau</label>
                                                                <JoditEditor 
                                                                value={camerasau || ""} 
                                                                config={editorConfig} 
                                                                onChange={(content) => setcamerasau(content)}
                                                                //onChange={(e) => setcamerasau(e.target.value)} 
                                                                type="text" placeholder="Camerasau" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Camera trước</label>
                                                                <input value={cameratruoc || ""} 
                                                                config={editorConfig}
                                                                onChange={(content) => setcameratruoc(content)}
                                                                // onChange={(e) => setcameratruoc(e.target.value)}
                                                                 type="text" placeholder="Camera trước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng camera</label>
                                                                <JoditEditor value={tinhnagcamera || ""} config={editorConfig} 
                                                                onChange={(content) => settinhnagcamera(content)}
                                                                // onChange={(e) => settinhnagcamera(e.target.value)}
                                                                 type="text" placeholder="Tính năng camera" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Quay video trước</label>
                                                                <JoditEditor value={quayvideotruoc || ""} config={editorConfig} 
                                                                onChange={(content) => setquayvideotruoc(content)}
                                                                // onChange={(e) => setquayvideotruoc(e.target.value)} 
                                                                type="text" placeholder="Quay video trước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Quay video sau</label>
                                                                <JoditEditor config={editorConfig} 
                                                                value={quayvideo || ""} 
                                                                onChange={(content) => setquayvideo(content)}
                                                                // onChange={(e) => setquayvideo(e.target.value)} 
                                                                type="text" placeholder="Quay video sau" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Loại CPU</label>
                                                                <input value={loaicpu || ""} onChange={(e) => setloaicpu(e.target.value)} type="text" placeholder="Loại CPU" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Độ phân giải</label>
                                                                <input value={dophangiai || ""} onChange={(e) => setdophangiai(e.target.value)} type="text" placeholder="Độ phân giải" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chip set</label>
                                                                <input value={chipset || ""} onChange={(e) => setchipset(e.target.value)} type="text" placeholder="Chip set" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">GPU</label>
                                                                <input value={gpu || ""} onChange={(e) => setgpu(e.target.value)} type="text" placeholder="GPU" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Khe cấm thẻ nhớ</label>
                                                                <input value={khecamthenho || ""} onChange={(e) => setkhecamthenho(e.target.value)} type="text" placeholder="Khe cấm thẻ nhớ" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Pin</label>
                                                                <input value={pin || ""} onChange={(e) => setpin(e.target.value)} type="text" placeholder="Pin" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ sạc</label>
                                                                <JoditEditor config={editorConfig} value={congnghesac || ""} onChange={(content) => setcongnghesac(content)} type="text" placeholder="Cổng sạc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Cổng sạc</label>
                                                                <input value={congsac || ""} onChange={(e) => setcongsac(e.target.value)} type="text" placeholder="Công nghệ sạc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Thẻ sim</label>
                                                                <input value={thesim || ""} onChange={(e) => setthesim(e.target.value)} type="text" placeholder="Thẻ sim" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hệ điều hành</label>
                                                                <input value={hedieuhang || ""} onChange={(e) => sethedieuhang(e.target.value)} type="text" placeholder="Hệ điều hành" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hồng ngoại</label>
                                                                <input value={hongngoai || ""} onChange={(e) => sethongngoai(e.target.value)} type="text" placeholder="Hồng ngoại" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Jack tai nghe</label>
                                                                <input value={jacktainghe || ""} onChange={(e) => setjacktainghe(e.target.value)} type="text" placeholder="Jack tai nghe" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ fc</label>
                                                                <input value={congghenfc || ""} onChange={(e) => setcongghenfc(e.target.value)} type="text" placeholder="Công nghệ fc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hỗ trợ mạng</label>
                                                                <input value={hotromang || ""} onChange={(e) => sethotromang(e.target.value)} type="text" placeholder="Hỗ trợ mạng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Wifi</label>
                                                                <input value={wifi || ""} onChange={(e) => setwifi(e.target.value)} type="text" placeholder="Wifi" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Bluetooth</label>
                                                                <input value={bluetooth || ""} onChange={(e) => setbluetooth(e.target.value)} type="text" placeholder="Bluetooth" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">GPS</label>
                                                                <input value={gps || ""} onChange={(e) => setgps(e.target.value)} type="text" placeholder="GPS" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kích thước</label>
                                                                <input value={kichthuoc || ""} onChange={(e) => setkichthuoc(e.target.value)} type="text" placeholder="Kích thước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Trọng lượng</label>
                                                                <input value={trongluong || ""} onChange={(e) => settrongluong(e.target.value)} type="text" placeholder="Trọng lượng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chất liệu mặt lưng</label>
                                                                <input value={chatlieumatlung || ""} onChange={(e) => setchatlieumatlung(e.target.value)} type="text" placeholder="Chật liệu mặt lưng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tương thích</label>
                                                                <JoditEditor
                                                                value={tuongthich || ""} 
                                                                config={editorConfig}
                                                                onChange={(content) => settuongthich(content)} 
                                                                // onChange={(e) => settuongthich(e.target.value)} 
                                                                type="text" placeholder="Tương thích" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chất liệu khung viền</label>
                                                                <input value={chatlieukhungvien || ""} onChange={(e) => setchatlieukhungvien(e.target.value)} type="text" placeholder="Chất liệu khung viền" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chỉ số kháng nước và bụi</label>
                                                                <JoditEditor 
                                                                value={chisokhangnuocbui || ""}
                                                                config={editorConfig}
                                                                onChange={(content) => setchisokhangnuocbui(content)}
                                                                type="text" placeholder="Chỉ số kháng nước và bụi" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Cảm biến vân tay</label>
                                                                <input value={cambienvantai || ""} onChange={(e) => setcambienvantai(e.target.value)} type="text" placeholder="Cảm biến vân tay" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kiểu màng hình</label>
                                                                <JoditEditor value={kieumanhinh || ""} config={editorConfig}
                                                                onChange={(content) => setkieumanhinh(content)} 
                                                                // onChange={(e) => setkieumanhinh(e.target.value)}
                                                                 type="text" placeholder="Kiểu màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Các loại cảm biến</label>
                                                                <JoditEditor 
                                                                config={editorConfig}
                                                                value={cacloaicambien || ""} 
                                                                onChange={(content) => setcacloaicambien(content)} 
                                                                type="text" placeholder="Các loại cảm biến" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng đặc biệt</label>
                                                                <JoditEditor 
                                                                value={tinhnangdacbiet || ""} 
                                                                config={editorConfig}
                                                                onChange={(content) => settinhnangdacbiet(content)}
                                                                // onChange={(e) => settinhnangdacbiet(e.target.value)} 
                                                                type="text" placeholder="Các loại cảm biến" className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Đặc điểm nổi bật</label>
                                                                <JoditEditor value={dacdiennoibat || ""} config={editorConfig} onChange={handleDacdienoibat} className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <input type='file' onChange={handleFileChange} placeholder="Chọn file" className='block text-base w-1/2 text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-red-950 focus:outline-none focus:bg-gray-600' />
                                                            </div>
                                                            <div className='mt-0'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nội dung khuyến mãi</label>
                                                                <JoditEditor value={editorContent || ""} config={editorConfig} onChange={handleEditorChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => handleputThongsokythuat(dienthoai.thongsokythuat_id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {Themthongsokythuat[dienthoai.id] && (
                                                <div className="loading-themthongsokythuat">
                                                    <div className='!z-5 relative loading-themthongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatThemthongsokythuat} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Thêm thông số kỹ thuật điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kích thước màng hình</label>
                                                                <input onChange={(e) => setkichthuocmanhinh(e.target.value)} type="text" placeholder="Kích thước màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            {/* <JoditEditor value={kieumanhinh || ""} config={editorConfig}
                                                                onChange={(content) => setkieumanhinh(content)}  */}
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ màng hình</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setcongnghemanghinh(content)} type="text" placeholder="Công nghệ màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng màng hình</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => settinhnangmanghinh(content)} type="text" placeholder="Tính năng màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tần số quét</label>
                                                                <input onChange={(e) => settansoquet(e.target.value)} type="text" placeholder="Tần số quét" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Camera sau</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setcamerasau(content)} type="text" placeholder="Camerasau" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Camera trước</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setcameratruoc(content)} type="text" placeholder="Camera trước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng camera</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => settinhnagcamera(content)} type="text" placeholder="Tính năng camera" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Quay video trước</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setquayvideotruoc(content)} type="text" placeholder="Quay video trước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Quay video sau</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setquayvideo(content)} type="text" placeholder="Quay video sau" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Loại CPU</label>
                                                                <input onChange={(e) => setloaicpu(e.target.value)} type="text" placeholder="Loại CPU" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Độ phân giải</label>
                                                                <input onChange={(e) => setdophangiai(e.target.value)} type="text" placeholder="Độ phân giải" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chip set</label>
                                                                <input onChange={(e) => setchipset(e.target.value)} type="text" placeholder="Chip set" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">GPU</label>
                                                                <input onChange={(e) => setgpu(e.target.value)} type="text" placeholder="GPU" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Khe cấm thẻ nhớ</label>
                                                                <input onChange={(e) => setkhecamthenho(e.target.value)} type="text" placeholder="Khe cấm thẻ nhớ" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Pin</label>
                                                                <input onChange={(e) => setpin(e.target.value)} type="text" placeholder="Pin" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Cổng sạc</label>
                                                                <input onChange={(e) => setcongsac(e.target.value)} type="text" placeholder="Cổng sạc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ sạc</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setcongnghesac(content)} type="text" placeholder="Công nghệ sạc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Thẻ sim</label>
                                                                <input onChange={(e) => setthesim(e.target.value)} type="text" placeholder="Thẻ sim" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hệ điều hành</label>
                                                                <input onChange={(e) => sethedieuhang(e.target.value)} type="text" placeholder="Hệ điều hành" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hồng ngoại</label>
                                                                <input onChange={(e) => sethongngoai(e.target.value)} type="text" placeholder="Hồng ngoại" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Jack tai nghe</label>
                                                                <input onChange={(e) => setjacktainghe(e.target.value)} type="text" placeholder="Jack tai nghe" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Công nghệ fc</label>
                                                                <input onChange={(e) => setcongghenfc(e.target.value)} type="text" placeholder="Công nghệ fc" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Hỗ trợ mạng</label>
                                                                <textarea onChange={(e) => sethotromang(e.target.value)} type="text" placeholder="Hỗ trợ mạng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Wifi</label>
                                                                <input onChange={(e) => setwifi(e.target.value)} type="text" placeholder="Wifi" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Bluetooth</label>
                                                                <input onChange={(e) => setbluetooth(e.target.value)} type="text" placeholder="Bluetooth" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">GPS</label>
                                                                <input onChange={(e) => setgps(e.target.value)} type="text" placeholder="GPS" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kích thước</label>
                                                                <input onChange={(e) => setkichthuoc(e.target.value)} type="text" placeholder="Kích thước" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Trọng lượng</label>
                                                                <input onChange={(e) => settrongluong(e.target.value)} type="text" placeholder="Trọng lượng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chất liệu mặt lưng</label>
                                                                <input onChange={(e) => setchatlieumatlung(e.target.value)} type="text" placeholder="Chật liệu mặt lưng" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tương thích</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => settuongthich(content)} type="text" placeholder="Tương thích" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chất liệu khung viền</label>
                                                                <input onChange={(e) => setchatlieukhungvien(e.target.value)} type="text" placeholder="Chất liệu khung viền" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chỉ số kháng nước và bụi</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setchisokhangnuocbui(content)} type="text" placeholder="Chỉ số kháng nước và bụi" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Cảm biến vân tay</label>
                                                                <input onChange={(e) => setcambienvantai(e.target.value)} type="text" placeholder="Cảm biến vân tay" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Kiểu màng hình</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setkieumanhinh(content)} type="text" placeholder="Kiểu màng hình" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Các loại cảm biến</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => setcacloaicambien(content)} type="text" placeholder="Các loại cảm biến" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tính năng đặc biệt</label>
                                                                <JoditEditor config={editorConfig} onChange={(content) => settinhnangdacbiet(content)} type="text" placeholder="Các loại cảm biến" className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Đặc điểm nổi bật</label>
                                                                <JoditEditor config={editorConfig} onChange={handleDacdienoibat} className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <input type='file' onChange={handleFileChange} placeholder="Chọn file" className='block text-base w-1/2 text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-red-950 focus:outline-none focus:bg-gray-600' />
                                                            </div>
                                                            <div className='mt-0'>
                                                                <label className="text-xl text-white dark:text-gray-200" htmlFor="username">Nội dung khuyến mãi</label>
                                                                <JoditEditor value={editorContent} config={editorConfig} onChange={handleEditorChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>

                                                            <div className='mt-9'>
                                                                <button onClick={() => handleThemthongsokythuat(dienthoai.id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Thêm thông số kỹ thuật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                {dienthoai.thongsokythuat_id === 0 ? <>
                                                    <button onClick={() => handThemthongsokythuat(dienthoai.id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-950 focus:outline-none focus:bg-gray-600">
                                                        Thêm thông số
                                                    </button>
                                                </> : <>
                                                    <button onClick={() => handThongsokythuat(dienthoai.thongsokythuat_id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-teal-950 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                                        Xem thông số
                                                    </button>
                                                </>}
                                            </div>
                                        </td>
                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {thongtindienthoai[dienthoai.id] && (
                                                <div className="loading-themthongsokythuat">
                                                    <div className='!z-5 relative loading-themthongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatgetThongtin} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Xem thông tin điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Bảo hành:</span> {baohanh}</label>
                                                            </div>

                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Thiết bị đi kèm:</span> {thietbidikem}</label>
                                                            </div>

                                                            <div className='mt-5'>
                                                                <label className="text-whiteSpace text-white dark:text-gray-200" htmlFor="username"><span className='text-span'>- Tình trạng máy:</span> {tinhtrangmay}</label>
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => handleCapnhatThongso(dienthoai.thongtindienthoai_id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {capnhatthongtindienthoai[dienthoai.thongtindienthoai_id] && (
                                                <div className="loading-themthongsokythuat">
                                                    <div className='!z-5 relative loading-themthongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handleTatCapnhatThongso} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Xem thông tin điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Bảo hành</label>
                                                                <textarea value={baohanh || ""} onChange={(e) => setbaohanh(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Thiết bị đi kèm</label>
                                                                <textarea value={thietbidikem || ""} onChange={(e) => setthietbidikem(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tình trạng máy</label>
                                                                <textarea value={tinhtrangmay || ""} onChange={(e) => settinhtrangmay(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => handleCapnhatThongsodienthoai(dienthoai.thongtindienthoai_id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {themthongtindienthoai && (
                                                <div className="loading-themthongsokythuat">
                                                    <div className='!z-5 relative loading-themthongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatThemthongtindienthoai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Xem thông tin điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Bảo hành</label>
                                                                <textarea onChange={(e) => setbaohanh(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Thiết bị đi kèm</label>
                                                                <textarea onChange={(e) => setthietbidikem(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tình trạng máy</label>
                                                                <textarea onChange={(e) => settinhtrangmay(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => handThemthongtindienthoais(dienthoai.id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                {dienthoai.thongtindienthoai_id === 0 ? <>
                                                    <button onClick={handThemthongtindienthoai} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-950 focus:outline-none focus:bg-gray-100">
                                                        Thêm thông tin
                                                    </button>
                                                </> : <>
                                                    <button onClick={() => handgetthongtin(dienthoai.thongtindienthoai_id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-emerald-300 rounded-md hover:bg-green-300 focus:outline-none focus:bg-gray-300">
                                                        Xem thông tin
                                                    </button>
                                                </>}
                                            </div>
                                        </td>
                                        <td
                                            className={`trangthaitinhtrang border-t-0 text-base font-bold text-black px-1 align-middle border-b border-r-0 whitespace-nowrap p-3 text-left text-blueGray-700 ${dienthoai.tinhtrang === 'Mở' ? 'text-emerald-500' : 'text-red-500'
                                                } ${dienthoai.tinhtrang === 'Đóng' ? 'hidden' : ''}`}
                                        >
                                            {dienthoai.tinhtrang}
                                        </td>

                                        <td className="border-t-0 text-black px-1 align-middle border-b border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                                            {getcapnhatdienthoai[dienthoai.id] && (
                                                <div className="loading-themthongsokythuat">
                                                    <div className='!z-5 relative loading-themthongsokythuats flex h-full w-full flex-col rounded-[20px] bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                                                        <div className='ml-auto'>
                                                            <div className='relative flex'>
                                                                <div className="mb-3 text-right">
                                                                    <button onClick={handTatgetdienthoai} className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className='absolute top-11 right-0 z-10 w-max origin-top-right scale-0 transition-all duration-300 ease-in-out'>
                                                                    <img className="aspect-[2/2] w-16" src="https://img.icons8.com/fluency/48/null/mac-os.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-auto flex-col items-center justify-center'>
                                                            <h2 className='textthemmausac'>Cập nhật điện thoại</h2>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Tên điện thoại</label>
                                                                <input value={tensanpham || ""} onChange={(e) => settensanpham(e.target.value)} type="text" placeholder="Tên điện thoại" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Giá bán</label>
                                                                <input value={giabanra || ""} onChange={(e) => setgiabanra(e.target.value)} type="text" placeholder="Giá bán" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Ram</label>
                                                                <select value={ram} onChange={(e) => setbonho(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                                    <option hidden>Chọn ram</option>
                                                                    <option value={2}>2GB</option>
                                                                    <option value={4}>4GB</option>
                                                                    <option value={6}>6GB</option>
                                                                    <option value={8}>8GB</option>
                                                                    <option value={12}>12GB</option>
                                                                    <option value={16}>16GB</option>
                                                                </select>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Bộ nhớ trong</label>
                                                                <select value={bonho} onChange={(e) => setram(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                                    <option hidden>Chọn bộ nhớ trong</option>
                                                                    <option value={64}>64GB</option>
                                                                    <option value={128}>128GB</option>
                                                                    <option value={256}>256GB</option>
                                                                    <option value={512}>512GB</option>
                                                                    <option value={1}>1TB</option>
                                                                </select>
                                                            </div>
                                                            <div className='w-full mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Loại sản phẩm</label>
                                                                <select value={thongtinphanloaiid} onChange={(e) => setthongtinphanloai(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                                    <option hidden>Chọn loại sản phẩm</option>
                                                                    {datathongttinphanloai.map((thongtinphanloai) => {
                                                                        return (
                                                                            <option key={thongtinphanloai.id} value={thongtinphanloai.id} >{thongtinphanloai.tenphanloai}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>

                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh điện thoại</label>
                                                                <div className='mt-1'>
                                                                    <img className="img-dienthoai" src={datacapnhatdienthoai.hinhanh} />
                                                                </div>

                                                                <input onChange={handlecapnhatFileChange1s} type="file" className="block text-lg w-full px-1 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="username">Chọn hình ảnh trình bày điện thoại</label>
                                                                <div className='mt-2 mb-3'>
                                                                    {hinhanhduyets.map((url, index) => (
                                                                        <img
                                                                            key={index}
                                                                            className="img-dienthoai"
                                                                            alt={`Dien thoai ${index + 1}`}
                                                                            src={url}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <input multiple onChange={handleduyetFileChange} type="file" className="block text-lg w-full px-1 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Trạng khái hiện thị điện thoại</label>
                                                                <select value={tinhtrang || ""} onChange={(e) => settinhtrang(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                                    <option hidden>Chọn tình trạng hiện thị máy</option>
                                                                    <option value="Mở">Mở</option>
                                                                    <option value="Ẩn">Ẩn</option>
                                                                </select>
                                                            </div>
                                                            <div className='mt-9'>
                                                                <button onClick={() => capnhatDienthoai(dienthoai.id)} className="button-themmausac px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Cập nhật</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button onClick={() => getdienthoai(dienthoai.id)} className="xemanh px-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-emerald-950 rounded-md hover:bg-sky-900 focus:outline-none focus:bg-gray-600">Sửa</button>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Datadienthoai