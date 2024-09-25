import api from "../api/api"

const hedieuhanh = {
    postHedieuhanh: async (tenhedieuhanh) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/hedieuhanh`, {
                tenhedieuhanh
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


    getHedieuhanh: async () => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/hedieuhanh`, config);
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    getHedieuhanhId: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            }
            const response = await api.get(`/hedieuhanh/${id}`, config)
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
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
            const response = await api.delete(`/hedieuhanh/${id}`, config)
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

export default hedieuhanh;