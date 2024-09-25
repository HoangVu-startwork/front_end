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

}

export default Dienthoai;