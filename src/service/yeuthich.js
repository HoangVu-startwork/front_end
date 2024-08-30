import api from "../api/api"

const yeuthich = {
    getYeuthich: async () => {
        try {
          const token = window.localStorage.getItem("token");
          const userId = window.localStorage.getItem("userId");
          const config = {};
          if (token) {
            config.headers = { 'Authorization': `Bearer ${token}` };
          }
          const response = await api.get(`/yeuthich/${userId}`, config);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
            throw error.response.data;
          } else {
            throw new Error("Error during signin");
          }
        }
    },
}

export default yeuthich;