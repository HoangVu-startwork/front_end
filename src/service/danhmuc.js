import api from "../api/api"

const danhmuc = {
    getAlldanhmuc: async () => {
        try {
            const response = await api.get(`/danhmuc/all`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("danh muc lỗi");
            }
        }
    },

    getAlldanhmucdienthoai: async () => {
        try {
            const id = 1;
            const response = await api.get(`/danhmuc/mucluc/${id}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("danh muc lỗi");
            }
        }
    },

    getAllnhucau: async () => {
        try {
            const response = await api.get(`/nhucaudienthoai`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("danh muc lỗi");
            }
        }
    },

    getDanhmuc: async (id) => {
        try {
            const response = await api.get(`/danhmuc/${id}`)
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("Không có dữ liệu");
            }
        }
    },

    getDanhmucId: async (id) => {
        try {
            const response = await api.get(`/danhmuc/${id}`)
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("Không có dữ liệu");
            }
        }
    },

    postdanhmuc: async (tendanhmuc, hinhanh, tenmucluc, tenhedieuhanh) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/danhmuc`, {
                tendanhmuc, hinhanh, tenmucluc, tenhedieuhanh
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    putdanhmuc: async (id, capnhatdanhmuc, capnhatmucluc, capnhathedieuhanh, capnhathinhanh) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            console.log('Updating danh muc with data:', { id, capnhatdanhmuc, capnhathinhanh, capnhatmucluc, capnhathedieuhanh });

            const response = await api.put(`/danhmuc/${id}`, {
                tendanhmuc: capnhatdanhmuc,
                hinhanh: capnhathinhanh,
                tenmucluc: capnhatmucluc,
                tenhedieuhanh: capnhathedieuhanh
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during update");
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
            const response = await api.delete(`/danhmuc/${id}`, config)
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    }


}

export default danhmuc;