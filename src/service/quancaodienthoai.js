import api from "../api/api"

const quancaodienthoai = {
    // Thuong thieu menu 
    getThuonghieumenu: async () => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/thuonghieumenu/all-admin`, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    getIdThuonghieumenu: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/thuonghieumenu/${id}`, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    putThuonghieumenu: async (id, tinhtrangs, lable, iddienthoai, text, capnhathinhanh) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.put(`/thuonghieumenu/update/${id}`,{
                hinhanh: capnhathinhanh,
                label: lable,
                text: text,
                tinhtrang: tinhtrangs,
                dienthoaiId: iddienthoai
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    postThuonghieumenu: async (images, tinhtrangs, lable, iddienthoai, text) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.post(`/thuonghieumenu/add`,{
                hinhanh: images,
                label: lable,
                text: text,
                tinhtrang: tinhtrangs,
                dienthoaiId: iddienthoai
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    deleteThuonghieumenu: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.delete(`/thuonghieumenu/${id}`, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },
    // Thuong hieu dien thoai
    getThuonghieudienthoai: async () => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/thuonghieu/all`, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    deleteThuonghieudienthoai: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.delete(`/thuonghieu/${id}`, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    getIdThuonghieudienthoai: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/thuonghieu/${id}`, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    postThuonghieudienthoai: async (images, tinhtrangs, tenthuonghieu, iddienthoai) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.post(`/thuonghieu/add`,{
                tenthuonghieu: tenthuonghieu,
                hinhanh: images,
                dienthoaiId: iddienthoai,
                tinhtrang: tinhtrangs,
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    putThuonghieudienthoai: async (id, tinhtrangs, tenthuonghieu, iddienthoai, capnhathinhanh) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.put(`/thuonghieu/update/${id}`,{
                tenthuonghieu: tenthuonghieu,
                hinhanh: capnhathinhanh,
                dienthoaiId: iddienthoai,
                tinhtrang: tinhtrangs,
            }, config);
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            if (error.response && error.response.data && error.response == 404) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },
}

export default quancaodienthoai;