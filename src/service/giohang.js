import api from "../api/api"

const giohang = {
    getGiohang: async () => {
        try {
          const token = window.localStorage.getItem("token");
          const userId = window.localStorage.getItem("userId");
          const config = {};
          if (token) {
            config.headers = { 'Authorization': `Bearer ${token}` };
          }
          const response = await api.get(`/giohang/user/${userId}`, config);
          return response.data.result;
        } catch (error) {
          if (error.response && error.response.data) {
            throw error.response.data;
          } else {
            throw new Error("Error during signin");
          }
        }
    },

    postGiohang: async (dienthoaiId, mausacId, soluong) => {
      try {
        const token = window.localStorage.getItem("token");
        const userId = window.localStorage.getItem("userId");
        const config = {};
        if (token) {
          config.headers = { 'Authorization': `Bearer ${token}` };
        }
        // const response = await api.post(`/yeuthich/${userId}`, config);
        const soluong = 1;
        const response = await api.post(`/giohang/themgoihangs`, {
          dienthoaiId, mausacId, userId, soluong
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

    deleteGiohang: async (id) => {
      try {
        const token = window.localStorage.getItem("token");
        const config = {};
        if (token) {
          config.headers = { 'Authorization': `Bearer ${token}` };
        }
        const response = await api.delete(`/giohang/${id}`, config);
        return response.data.result;
      } catch (error) {
        if (error.response && error.response.data) {
          // throw error.response.data;
        } else {
          throw new Error("Error during signin");
        }
      } 
    }
}

export default giohang;