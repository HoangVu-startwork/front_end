import api from "../api/api"

const thongtinphanloai = {
    postThongtinphanloai: async (posttenthongtinphanloai, posttenloaisanpham) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
              config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/thongtinphanloai`, {
                tenphanloai: posttenthongtinphanloai,
                tenloaisanpham: posttenloaisanpham
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

    getThongtinphanloai: async () => {
      try {
        const token = window.localStorage.getItem("tokenadmin");
        const config = {};
        if (token) {
          config.headers = { 'Authorization': `Bearer ${token}` };
        }
        const response = await api.get(`/thongtinphanloai`, config)
        return response.data;
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
            const token = window.localStorage.getItem("tokenadmin")
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.delete(`/thongtinphanloai/${id}`)
            return response.data.result;
        } catch {
            if (error.response && error.response.data) {
                throw error.response.data;
              } else {
                throw new Error("Error during signin");
              }
        }
    },

    getThongtinphanloaiId: async (id) => {
        try {
            const token = window.localStorage.getItem("tokenadmin")
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.get(`/thongtinphanloai/${id}`, config)
            return response.data.result;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data
            } else {
                throw new Error("Không có dữ liệu");
            }
        }
    },

    getThongtinphanloaisanpham: async (id) => {
      try {
        const response = await api.get(`/thongtinphanloai/loaisanpham/${id}`);
        return response.data.result;
      } catch (error) {
        if (error.respones && error.response.data) {
          throw error.response.data;
        } else {
          throw new Error("Không có dữ liệu")
        }
      }
    },

    putThongtinphanloaiId: async (id, tenphanloai, tenloaisanpham) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.put(`/thongtinphanloai/${id}`, {
                tenphanloai: tenphanloai,
                tenloaisanpham: tenloaisanpham
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
}

export default thongtinphanloai;