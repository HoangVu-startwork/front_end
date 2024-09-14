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

  getTimkiemdienthoai: async () => {
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
}

export default Dienthoai;