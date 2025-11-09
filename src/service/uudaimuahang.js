import api from "../api/api"



const uudaimuahang = {
    postUudaixephang: async (noidunguudai, dieukienuudai, phantramkhuyenmai, giakhuyenmai, dieukienthucthi, idxephanguser) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {}
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/uudaimuahang/add`, {
                noidunguudai: noidunguudai,
                dieukienuudai: dieukienuudai,
                phantramkhuyenmai: phantramkhuyenmai,
                giakhuyenmai: giakhuyenmai,
                dieukienthucthi: dieukienthucthi,
                xephanguserId: idxephanguser
            }, config);

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },

    getAllUudaixephang: async () => {
        try {
            const response = await api.get(`/uudaimuahang`)
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },


    getXephanguserUudai: async (id) => {
        try {
            const response = await api.get(`/uudaimuahang/xephanguser/${id}`)
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },


    deleteUudaixephang: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {}
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.delete(`/uudaimuahang/${id}`, config);

            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    }

}
export default uudaimuahang;