import api from "../api/api"

const Dienthoai = {
  getDienthoai: async () => {
    try {
      const response = await api.get(`/dienthoai/random-color`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getThuonghieu: async () => {
    try {
      const response = await api.get(`/thuonghieu/all`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },
  getThuonghieumenu: async () => {
    try {
      const response = await api.get(`/thuonghieumenu/all`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },
  getChitietdienthoai: async (id, mausacId) => {
    try {
      const response = await api.get(`dienthoai/${id}/mausac/${mausacId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getTimkiemdienthoai: async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params.append(key, filters[key]);
        } else {
          params.append(key, '');
        }
      });
      const response = await api.get(`dienthoai/filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },


  getdanhmuctimkiemdienthoai: async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params.append(key, filters[key]);
        } else {
          params.append(key, '');
        }
      });
      const response = await api.get(`dienthoai/danhmuc-dienthoai-filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getThongtinphanloai: async (id) => {
    try {
      const response = await api.get(`dienthoai/thongtinphanloai/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  postdienthoai: async (tendienthoai, giaban, selectram, thongtinphanloai, selectbonhotrong, hinhanhdienthoais, hinhdanhduyet, tinhtrangs) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.post(`/dienthoai`, {
        tensanpham: tendienthoai,
        hinhanh: hinhanhdienthoais,
        hinhanhduyet: hinhdanhduyet,
        ram: selectram,
        bonho: selectbonhotrong,
        giaban: giaban,
        tenphanloai: thongtinphanloai,
        tinhtrang: tinhtrangs,
      }, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        throw error.response.data;
      }
      if (error.response && error.response.data && error.response == 404) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  putdienthoai: async (id, ram, giabanra, hinhdanhduyetdienthoai, hinhanhdienthoai, bonho, tensanpham, tinhtrang, thongtinphanloaiid) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.put(`/dienthoai/${id}`, {
        hinhanh: hinhanhdienthoai,
        hinhanhduyet: hinhdanhduyetdienthoai,
        ram: ram,
        bonho: bonho,
        giaban: giabanra,
        tenphanloai: thongtinphanloaiid,
        tinhtrang: tinhtrang,
        tensanpham: tensanpham,
      }, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        throw error.response.data;
      }
      if (error.response && error.response.data && error.response == 404) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getIddienthoai: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.get(`/dienthoai/${id}`, config);
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


  // chỉnh sửa admin
  getadmindienthoai: async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params.append(key, filters[key]);
        } else {
          params.append(key, '');
        }
      });
      const response = await api.get(`dienthoai/dienthoai-filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getAlldienthoai: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.get(`/dienthoai`, config);
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

  getKiemtradienthoai: async (id, mausacId) => {
    try {
      const response = await api.get(`dienthoai/kiemtra/${id}/mausac/${mausacId}`);
      return response.data.result;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },
}

export default Dienthoai;