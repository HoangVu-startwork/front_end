import api from "../api/api"

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const khuyenmai = {
    postKhuyenmai: async (id, suangaybatdau, suadatakhuyenmai, suanoidung, suaphantram) => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const formattedNgaybatdau = formatDateTime(suangaybatdau);
            const formattedNgayketkhuc = formatDateTime(suadatakhuyenmai);
            const response = await api.post(`/khuyenmai/idkhuyenmai`, {
                phantramkhuyenmai: suaphantram,
                noidungkhuyenmai: suanoidung,
                ngaybatdau: formattedNgaybatdau,
                ngayketkhuc: formattedNgayketkhuc,
                dienthoaiId: id 
            }, config)
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    // Helper function to format date string

    putKhuyenmai: async (id, suangaybatdau, suadatakhuyenmai, suanoidung, suaphantram) => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const formattedNgaybatdau = formatDateTime(suangaybatdau);
            const formattedNgayketkhuc = formatDateTime(suadatakhuyenmai);
            console.log(id + formattedNgaybatdau, formattedNgayketkhuc, suanoidung, suaphantram)
            const response = await api.put(`/khuyenmai/${id}`, {
                phantramkhuyenmai: suaphantram,
                noidungkhuyenmai: suanoidung,
                ngaybatdau: formattedNgaybatdau,
                ngayketkhuc: formattedNgayketkhuc,
            }, config)
            return response.data;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    getKhuyenmai: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {}
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.get(`/khuyenmai/${id}`, config);
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("Không có dữ liệu");
            }
        }
    },

    getKhuyenmaidienthoai: async (idDienthoai) => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {}
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.get(`/khuyenmai/dienthoai/${idDienthoai}`, config);
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("Không có dữ liệu");
            }
        }
    },

    delete: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.delete(`/khuyenmai/${id}`, config)
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

}

export default khuyenmai