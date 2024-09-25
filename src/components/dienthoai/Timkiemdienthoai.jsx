import React, { useState, useEffect, useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Popover } from '@mui/material';
import Link from 'next/link'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/timkiemdienthoai.css';
import '../css/timkiemsanpham.css';
import '../css/menu.css'
import ServiceDienthoai from "../../service/dienthoai"
import Auth from "../../service/auth"
import Yeuthich from "../../service/yeuthich"
import Danhgia from "../../service/danhgia"
import Loading from '@/components/loading/loading';
import Dangnhap from '@/components/loading/kiemtradn';
import RatingStars from '../../components/stars/RatingStars'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Camera } from 'lucide-react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const MAX = 60000000;
const MIN = 0;

function valuetext(value) {
    return `${value}`;
}

const Chipxuli = [
    { label: 'Snapdragon', value: 'Snapdragon' },
    { label: 'Apple A', value: 'Apple A' },
    { label: 'Mediatek Dimensity', value: 'Mediatek Dimensity' },
    { label: 'Mediatek Helio', value: 'Mediatek Helio' },
    { label: 'Exynos', value: 'Exynos' },
    { label: 'Unisoc', value: 'Unisoc' }
]

const Loaidienthoai = [
    { label: 'iPhone (iOS)', value: 'iPhone' },
    { label: 'Android', value: 'Android' },
    { label: 'Điện thoại phổ thông', value: 'Điện thoại phổ thông' }
]

const Dungluongram = [
    { label: '2GB', value: '2' },
    { label: '4GB', value: '4' },
    { label: '6GB', value: '6' },
    { label: '8GB', value: '8' },
    { label: '12GB', value: '12' },
    { label: '16GB', value: '16' },
]

const Bonhotrong = [
    { label: '32GB', value: '32' },
    { label: '64GB', value: '64' },
    { label: '128GB', value: '128' },
    { label: '256GB', value: '256' },
    { label: '512GB', value: '512' },
    { label: '1TB', value: '1' },
]

const Tinhnangdacbiet = [
    { label: 'Sạc không dây', value: 'Sạc không dây' },
    { label: 'Bảo mật vân tay', value: 'Bảo mật vân tay' },
    { label: 'Nhận diện khuôn mặt', value: 'Nhận diện khuôn mặt' },
    { label: 'Kháng nước, kháng bụi', value: 'Kháng nước, kháng bụi' },
    { label: 'Hỗ trợ 5G', value: 'Hỗ trợ 5G' },
]

const Tinhnangcamera = [
    { label: 'Chụp xoá phông', value: 'Xoá phông' },
    { label: 'Chụp toàn cảnh', value: 'Toàn cảnh' },
    { label: 'Quay video chậm', value: 'Quay chậm' },
    { label: 'Chụp Zoom xa', value: 'Zoom' },
    { label: 'Chụp tự động lấy nét', value: 'Tự động lấy nét' },
    { label: 'Chống rung', value: 'Chống rung' },
    { label: 'Chân dung', value: 'Chân dung' },
    { label: 'Chụp và video ban đêm', value: 'đêm' },
    { label: 'Quay video 4K', value: '4K' },
    { label: 'Góc siêu rộng', value: 'Góc siêu rộng' },
    { label: 'Góc rộng', value: 'Góc rộng' },
]

const Tansoquet = [
    { label: '60Hz', value: '60' },
    { label: '90Hz', value: '90' },
    { label: '120Hz', value: '120' },
    { label: '144Hz', value: '144' },
    { label: '165Hz', value: '165' },
]

const Kichthuocmanhinh = [
    { label: 'Dưới 6 inch', value: '5.9' },
    { label: 'Trên 6 inch', value: '6' },
]

const Kieumanghinh = [
    { label: 'Tai thỏ', value: 'Tai thỏ' },
    { label: 'Tràn viền', value: 'Tràn viền' },
    { label: 'Màn hình gập', value: 'Màn hình gập' },
    { label: 'Giọt nước', value: 'Giọt nước' },
    { label: 'Đục lỗ', value: 'Đục lỗ' },
    { label: 'Dynamic Island', value: 'Dynamic Island' }
]

const Thietbidikem = [
    { label: 'Bút cảm ứng', value: 'Bút cảm ứng' },
]


function Timkiemdienthoai() {
    var img = "https://res.cloudinary.com/du6ybb3by/image/upload/v1724251968/ngvixu1bdkmncuq7dfuu.svg";
    const [selectedChipxuli, setSelectedChipxuli] = useState([]);
    const [selectedvalueChipxuli, setvalueSelectedChipxuli] = useState(null);

    const [selectLoaidienthoai, setSelectLoaidienthoai] = useState([]);
    const [selectvalueLoaidienthoai, setSelectvalueLoaidienthoai] = useState(null);

    const [selectDungluongram, setSelectDungluongram] = useState([]);
    const [selectvalueDungluongram, setSelectvalueDungluongram] = useState(null);

    const [selectBonhotrong, setSelectBonhotrong] = useState([]);
    const [selectvalueBonhotrong, setSelectvalueBonhotrong] = useState(null);

    const [selectTinhnangdacbiet, setSelectTinhnangdacbiet] = useState([]);
    const [selectvalueTinhnangdacbiet, setSelectvalueTinhnangdacbiet] = useState(null);

    const [selectTinhnangcamera, setSelectTinhnangcamera] = useState([]);
    const [selectvalueTinhnangcamera, setSelectvalueTinhnangcamera] = useState(null);

    const [selectTansoquet, setSelectTansoquet] = useState([]);
    const [selectvalueTansoquet, setSelectvalueTansoquet] = useState(null);

    const [selectKichthuocmanhinh, setSelectKichthuocmanhinh] = useState([]);
    const [selectvalueKichthuocmanhinh, setSelectvalueKichthuocmanhinh] = useState(null);

    const [selectKieumanghinh, setSelectKieumanghinh] = useState([]);
    const [selectvalueKieumanghinh, setSelectvalueKieumanghinh] = useState(null);

    const [selectThietbidikem, setSelectThietbidikem] = useState([]);
    const [selectvalueThietbidikem, setSelectvalueThietbidikem] = useState(null);

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    const [yeuthich, setYeuthich] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDangnhap, setLoadingDangnhap] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [danhgiasao, setDanhgiasao] = useState([]);
    const [datacode, setDatacode] = useState([])
    const [value2, setValue2] = React.useState([MIN, MAX]);
    const [selectedOption, setSelectedOption] = React.useState(`${MIN} - ${MAX}`);
    const [showSearch, setShowSearch] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setData] = useState([]);
    const [giaTu, setgiamin] = useState('');
    const [giaDen, setgiamax] = useState('');

    const LoaidienthoaiList = new Map(Loaidienthoai.map(loaidienthoai => [loaidienthoai.value, loaidienthoai.label]));
    const chipMap = new Map(Chipxuli.map(chip => [chip.value, chip.label]));
    const DungluongramList = new Map(Dungluongram.map(ram => [ram.value, ram.label]));
    const BonhotrongList = new Map(Bonhotrong.map(bonho => [bonho.value, bonho.label]));
    const TinhnangdacbietList = new Map(Tinhnangdacbiet.map(tinhnangdacbiet => [tinhnangdacbiet.value, tinhnangdacbiet.label]));
    const TinhnangcameraList = new Map(Tinhnangcamera.map(camera => [camera.value, camera.label]));
    const TansoquetList = new Map(Tansoquet.map(tansao => [tansao.value, tansao.label]));
    const KichthuocmanhinhList = new Map(Kichthuocmanhinh.map(kichthuocmanhinh => [kichthuocmanhinh.value, kichthuocmanhinh.label]));
    const KieumanghinhList = new Map(Kieumanghinh.map(kieumanghinh => [kieumanghinh.value, kieumanghinh.label]));
    const ThietbidikemList = new Map(Thietbidikem.map(thietbidikem => [thietbidikem.value, thietbidikem.label]));

    const handleChipxuliChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedChipxuli(
            typeof value === 'string' ? value.split(',') : value
        );
        setvalueSelectedChipxuli(value.join(','))
        setCurrentPage(0);
    };

    const handleLoaidienthoai = (event) => {
        const {
            target: { value },
        } = event;
        setSelectLoaidienthoai(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueLoaidienthoai(value.join(','))
        setCurrentPage(0);
    };

    const handleRam = (event) => {
        const {
            target: { value },
        } = event;
        setSelectDungluongram(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueDungluongram(value.join(','))
        setCurrentPage(0);
    };

    const handleBonho = (event) => {
        const {
            target: { value },
        } = event;
        setSelectBonhotrong(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueBonhotrong(value.join(','))
        setCurrentPage(0);
    }

    const handleTinhnangdacbiet = (event) => {
        const {
            target: { value },
        } = event;
        setSelectTinhnangdacbiet(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueTinhnangdacbiet(value.join(','))
        setCurrentPage(0);
    }

    const handleTinhnangcamera = (event) => {
        const {
            target: { value },
        } = event;
        setSelectTinhnangcamera(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueTinhnangcamera(value.join(','))
        setCurrentPage(0);
    }

    const handleTansoquet = (event) => {
        const {
            target: { value },
        } = event;
        setSelectTansoquet(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueTansoquet(value.join(','))
        setCurrentPage(0);
    }

    const handleKichthuocmanhinh = (event) => {
        const {
            target: { value },
        } = event;
        setSelectKichthuocmanhinh(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueKichthuocmanhinh(value.join(','))
        setCurrentPage(0);
    }

    const handleKieumanghinh = (event) => {
        const {
            target: { value },
        } = event;
        setSelectKieumanghinh(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueKieumanghinh(value.join(','))
        setCurrentPage(0);
    }

    const handleThietbidikem = (event) => {
        const {
            target: { value },
        } = event;
        setSelectThietbidikem(
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectvalueThietbidikem(value.join(','))
        setCurrentPage(0);
    }

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
        setSelectedOption(`${newValue[0]} - ${newValue[1]}`);
        setShowSearch(true);
    };

    const handleSearchClick = () => {
        console.log(`Giá min: ${value2[0]}, Giá max: ${value2[1]}`);
        setgiamin(`${value2[0]}`)
        setgiamax(`${value2[1]}`)
        setShowSearch(false);
        setAnchorEl(null); // Đóng Popover sau khi nhấn tìm kiếm
        setCurrentPage(0);
    };

    const handleClearClick = () => {
        const newValues = [MIN, MAX];
        setValue2(newValues);
        setSelectedOption(`${newValues[0]} - ${newValues[1]}`);
        setgiamin(`${newValues[0]}`)
        setgiamax(`${newValues[1]}`)
        setShowSearch(false);
        setAnchorEl(null); // Đóng Popover sau khi nhấn đóng
        setCurrentPage(0);
    };

    const handleSelectOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelectClose = () => {
        setAnchorEl(null);
    };

    const getDanhgia = async () => {
        try {
            const getdanhgia = await Danhgia.getAlldanhgia();
            setDanhgiasao(getdanhgia)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

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
                }, 5000);
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
            }, 5000);
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
            }, 5000);
            // yeuthich.forEach(item => {
            //     console.log(item.id);
            // });
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    }

    const fetchTokenInfo = async () => {
        try {
            const data = await Auth.gettoken();
            setDatacode(data.code);
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

    const [currentPage, setCurrentPage] = useState(0); // Start from the first product
    const itemsPerPage = 20; // Only one product per page

    const currentData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleCloseDangnhap = () => {
        setLoadingDangnhap(false);
    };

    const filters = useMemo(() => ({
        ram: selectvalueDungluongram,
        giaTu: giaTu,
        giaDen: giaDen,
        hedieuhanh: selectvalueLoaidienthoai,
        boNho: selectvalueBonhotrong,
        tinhnangdacbiet: selectvalueTinhnangdacbiet,
        kichthuocmanhinh: selectvalueKichthuocmanhinh,
        tinhnagcamera: selectvalueTinhnangcamera,
        tansoquet: selectvalueTansoquet,
        kieumanhinh: selectvalueKieumanghinh,
        thietbidikem: selectvalueThietbidikem,
        chipset: selectedvalueChipxuli,
        // Các tham số khác cũng có thể được thêm vào đây
    }), [selectvalueDungluongram, giaTu, giaDen, selectvalueLoaidienthoai, selectvalueBonhotrong, selectvalueTinhnangdacbiet,
        selectvalueKichthuocmanhinh, selectvalueTinhnangcamera, selectvalueTansoquet, selectvalueKieumanghinh, selectvalueThietbidikem, selectedvalueChipxuli
    ]);
    

    const fetchdienthoai = async (filters) => {
        try {
            const data = await ServiceDienthoai.getTimkiemdienthoai(filters);
            setData(data)
        } catch (error) {
            console.error("Error fetching token info:", error);
        }
    };

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
        window.scrollTo(0, 0);
        if (datacode === 1000) {
            fetchYeuthich();
        }
        getDanhgia();
        fetchdienthoai(filters);
        setIsMounted(true);
        // console.log(giamin);
        // console.log(giamax);
        // console.log(selectedvalueChipxuli);
    }, [datacode, filters]);


    return (
        <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {isLoading && <div className="loading-overlay"><Loading /></div>}
            {isLoadingDangnhap && <div className="loading-overlay"><Dangnhap nurfelse={handleCloseDangnhap} /></div>}
            <div className='tieuchi'>Chọn theo tiêu chí</div>
            <section className="relative bg-white section-section">
                <div className="text-center nhucautimkiem">
                    <div
                        className="timkiemdienthoai"
                    >
                        {isMounted && (
                            <>
                                <div className="logo-item">
                                    <Box>
                                        <FormControl className='object-contain-select'>
                                            <InputLabel id="demo-multiple-checkbox-label">Giá</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                open={Boolean(anchorEl)}
                                                onClose={handleSelectClose}
                                                onOpen={handleSelectOpen}
                                                value={selectedOption}
                                                input={<OutlinedInput label="Giá" />}
                                                renderValue={() => selectedOption}
                                            >
                                                <MenuItem value={selectedOption} onClick={handleSelectOpen}>
                                                    {selectedOption}
                                                </MenuItem>
                                            </Select>
                                            <Popover

                                                open={Boolean(anchorEl)}
                                                anchorEl={anchorEl}
                                                onClose={handleSelectClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Box sx={{ width: 350, padding: 2, marginTop: 2 }}>
                                                    <Slider
                                                        getAriaLabel={() => 'Minimum distance shift'}
                                                        value={value2}
                                                        onChange={handleChange2}
                                                        valueLabelDisplay="auto"
                                                        getAriaValueText={(value) => `${value}`}
                                                        disableSwap
                                                        min={MIN}
                                                        max={MAX}
                                                        step={1000000}
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography
                                                            variant="body2"
                                                            onClick={() => setValue2([MIN, value2[1]])}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            {MIN} giá
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            onClick={() => setValue2([value2[0], MAX])}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            {MAX} giá
                                                        </Typography>
                                                    </Box>
                                                    {showSearch && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={handleSearchClick}
                                                                sx={{ marginTop: 2 }}
                                                            >
                                                                Tìm kiếm
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={handleClearClick}
                                                                sx={{ marginTop: 2, marginLeft: 3, background: 'red' }}
                                                            >
                                                                Đóng
                                                            </Button>
                                                        </>
                                                    )}
                                                </Box>
                                            </Popover>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Chip xử lí</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectedChipxuli}
                                            onChange={handleChipxuliChange}
                                            input={<OutlinedInput label="Chip xử lí" />}
                                            renderValue={(selected) => selected.map(value => chipMap.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Chipxuli.map((chip) => (
                                                <MenuItem key={chip.value} value={chip.value}>
                                                    <Checkbox checked={selectedChipxuli.indexOf(chip.value) > -1} />
                                                    <ListItemText primary={chip.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Loại điện thoại</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectLoaidienthoai}
                                            onChange={handleLoaidienthoai}
                                            input={<OutlinedInput label="Loại điện thoại" />}
                                            renderValue={(selected) => selected.map(value => LoaidienthoaiList.get(value)).join(', ')}
                                            // renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Loaidienthoai.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectLoaidienthoai.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Dung lượng RAM</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectDungluongram}
                                            onChange={handleRam}
                                            input={<OutlinedInput label="Dung lượng RAM" />}
                                            renderValue={(selected) => selected.map(value => DungluongramList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Dungluongram.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectDungluongram.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Bộ nhớ trong</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectBonhotrong}
                                            onChange={handleBonho}
                                            input={<OutlinedInput label="Bộ nhớ trong" />}
                                            renderValue={(selected) => selected.map(value => BonhotrongList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Bonhotrong.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectBonhotrong.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Tính năng đặc biệt</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectTinhnangdacbiet}
                                            onChange={handleTinhnangdacbiet}
                                            input={<OutlinedInput label="Tính năng đặc biệt" />}
                                            renderValue={(selected) => selected.map(value => TinhnangdacbietList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Tinhnangdacbiet.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectTinhnangdacbiet.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Tính năng Camera</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectTinhnangcamera}
                                            onChange={handleTinhnangcamera}
                                            input={<OutlinedInput label="Tính năng Camera" />}
                                            renderValue={(selected) => selected.map(value => TinhnangcameraList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Tinhnangcamera.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectTinhnangcamera.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Tần số quét</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectTansoquet}
                                            onChange={handleTansoquet}
                                            input={<OutlinedInput label="Tần số quét" />}
                                            renderValue={(selected) => selected.map(value => TansoquetList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Tansoquet.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectTansoquet.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Kích thước màng hình</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectKichthuocmanhinh}
                                            onChange={handleKichthuocmanhinh}
                                            input={<OutlinedInput label="Tần số quét" />}
                                            renderValue={(selected) => selected.map(value => KichthuocmanhinhList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Kichthuocmanhinh.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectKichthuocmanhinh.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Kiểu màng hình</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectKieumanghinh}
                                            onChange={handleKieumanghinh}
                                            input={<OutlinedInput label="Kiểu màng hình" />}
                                            renderValue={(selected) => selected.map(value => KieumanghinhList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Kieumanghinh.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectKieumanghinh.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="logo-item">
                                    <FormControl className='object-contain-select'>
                                        <InputLabel id="demo-multiple-checkbox-label">Thiết bị đi kèm</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectThietbidikem}
                                            onChange={handleThietbidikem}
                                            input={<OutlinedInput label="Thiết bị đi kèm" />}
                                            renderValue={(selected) => selected.map(value => ThietbidikemList.get(value)).join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Thietbidikem.map((name) => (
                                                <MenuItem key={name.value} value={name.value}>
                                                    <Checkbox checked={selectThietbidikem.indexOf(name.value) > -1} />
                                                    <ListItemText primary={name.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </>
                        )}


                        {/* Add more items as needed */}
                    </div>
                </div>
            </section>
            <div className="sanpham-timkiem grid grid-cols-2 700:grid-cols-3 900:grid-cols-4 1040:grid-cols-5 gap-4">

                {currentData.map((card) => {
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
                        <div key={card.id} className="sanpham-featured-product">
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

                                <img className="img_sanpham" alt={card.title} src={`${card.hinhanh}`} />
                                <div className="sanpham-featured-product-body">
                                    <div className="block-featured-title"><h3>{card.tensanpham}</h3></div>
                                    <div className="block-featured-text">{formatter.format(giadagiamgia)} {card.phantramkhuyenmai != null && (<span className='giachinh'>{formatter.format(card.giaban)}</span>)}</div>
                                    <div className='uudai'>
                                        {card.baohanh != null && (
                                            <div className='uudai'>
                                                {card.title === undefined && <div className="block-featured-text_uudai">{card.baohanh}</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className='saodanhgia'>{rating != 0 && (<RatingStars rating={rating} />)}</div>
                            <div className='yeuthich-sanpham'><YeuThichItem isFavorite={isFavorite}
                                onClickAdd={() => fetchPostYeuthich(card.id, card.mausac_id)}
                                onClickRemove={() => deleteYeuthich(card.id, card.mausac_id)}
                            /></div>
                        </div>

                    )
                })}
            </div>
            <div className="pagination-controls flex pl-0 list-none rounded my-2 mt-3">
                <button className='pagination-controls-pre relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-gray-200' onClick={handlePrevPage} disabled={currentPage === 0}>Sau</button>
                <span className='pagination-controls-text ml-1 mr-1 relative block py-2 px-3 leading-tight'><span className=''>Trang</span> {currentPage + 1} <span>tổng</span> {totalPages}</span>
                <button className='pagination-controls-nex relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-gray-200' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Tiếp</button>
            </div>
        </div>
    );
}

export default Timkiemdienthoai;


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
                <span>{isLoading ? 'Đang xử lý...' : 'Yêu thích'}</span>
                {hover
                    ? <FavoriteRoundedIcon className="fa-heart-o" />
                    : (isFavorite ? <FavoriteRoundedIcon className="fa-heart-o" /> : <FavoriteBorderRoundedIcon className="fa-heart-o" />)
                }
            </p>
        </div>
    );
}