import api from "../api/api"

const loaisanpham = {
    getAllloaisanpham: async () => {
        try {
            const response = await api.get(`/loaisanpham`);
            return response.data;
          } catch (error) {
            if (error.response && error.response.data) {
              throw error.response.data;
            } else {
              throw new Error("Error during signin");
            }
          }
    },

    getdanhmucloaisanpham: async (id) => {
        try {
            const response = await api.get(`/loaisanpham/danhmuc/${id}`);
            return response.data;
          } catch (error) {
            if (error.response && error.response.data) {
              throw error.response.data;
            } else {
              throw new Error("Error during signin");
            }
          }
    },

    postloaisanpham: async (valuedanhmuc, tenloaisanpham) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/loaisanpham`, {
                tenloaisanpham: tenloaisanpham, 
                tendanhmuc: valuedanhmuc
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

    delete: async (id) => {
      try {
          const token = window.localStorage.getItem("tokenadmin");
          const config = {};
          if (token) {
              config.headers = { 'Authorization': `Bearer ${token}` }
          }
          const response = await api.delete(`/loaisanpham/${id}`, config)
          return response.data.result;
      } catch {
          if (error.response && error.response.data) {
              throw error.response.data;
          } else {
              throw new Error("Error during signin");
          }
      }
  },

  putloaisanpham: async (idloaisanpham, puttenloaisanpham, puttendanhmuc) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
          config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.put(`/loaisanpham/${idloaisanpham}`, {
        tenloaisanpham: puttenloaisanpham,
        tendanhmuc: puttendanhmuc
      }, config);
      return response.data.result;
  } catch {
      if (error.response && error.response.data) {
          throw error.response.data;
      } else {
          throw new Error("Error during signin");
      }
  }
  },

  getId: async (id) => {
    try {
        const response = await api.get(`/loaisanpham/${id}`)
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

export default loaisanpham;