import api from "../api/api"



const xephanguser = {
    getAllXephanguser: async () => {
        try {
            const response = await api.get(`/xephanguser/all`);
            return response.data;
          } catch (error) {
            if (error.response && error.response.data) {
              throw error.response.data;
            } else {
              throw new Error("Error during signin");
            }
          }
    },

    postXephanguser: async (hangmuc, giatien) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {}
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }

            const response = await api.post(`/xephanguser/add`, {
                hangmuc: hangmuc,
                giatien: giatien
            }, config);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data) {
                throw error.response.data;
              } else {
                throw new Error("Error during signin");
              }
        }

    },

    putXephanguser: async (id, hangmuc, giatien) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }

            const response = await api.put(`/thongtinphanloai/update/${id}`, {
                hangmuc: hangmuc,
                giatien: giatien
            }, config);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during update");
            }
        }
    },


    deleteXephang: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }

            const response = await api.delete(`/xephanguser/${id}`, config);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during update");
            }
        }
    }

}

export default xephanguser;