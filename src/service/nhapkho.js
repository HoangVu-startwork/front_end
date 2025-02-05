import api from "../api/api"

const nhapkho = {
    getKhodienthoai: async () => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/khodienthoai`, config);
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

    // Nhập kho diện thoại
    getNhaokhoKhodienthoai: async () => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/nhapkho`, config);
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

    getIdKhodienthoai: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/nhapkho/${id}`, config);
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

    postKhodienthoai: async (iddienthoai, idmausac, soluong) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const email = window.localStorage.getItem("email");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.post(`/nhapkho`,{
                email: email,
                soluong: soluong,
                dienthoaiId: iddienthoai,
                mausacId: idmausac,
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

    putKhodienthoai: async (iddienthoai, idmausac, soluong) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const email = window.localStorage.getItem("email");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.put(`/nhapkho/${id}`,{
                email: email,
                soluong: soluong,
                dienthoaiId: iddienthoai,
                mausacId: idmausac,
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
    }

}

export default nhapkho;