import api from "../api/api"

const hinhanh = {
  postanh: async (image) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const formData = new FormData();
      formData.append('image', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };
      const response = await api.post(`/anh/image`, formData, config);
      return response;
    } catch (error) {
      // Trả về thông báo chi tiết từ response nếu có
      const errorMsg = error.response?.data?.message || "Error uploading image";
      throw new Error(errorMsg);
    }
  },

  postanhdienthoai: async (image) => {

    try {
      const token = window.localStorage.getItem("tokenadmin");
      const formData = new FormData();
      formData.append('image', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };
      const response = await api.post(`/anh/image-dienthoai`, formData, config);
      return response;
    } catch (error) {
      // Trả về thông báo chi tiết từ response nếu có
      const errorMsg = error.response?.data?.message || "Error uploading image";
      throw new Error(errorMsg);
    }
  },

  posthinhanhduyet: async (formData) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };
      const response = await api.post(`/anh/imagesd`, formData, config);
      return response;
    } catch (error) {
      // Trả về thông báo chi tiết từ response nếu có
      const errorMsg = error.response?.data?.message || "Error uploading image";
      throw new Error(errorMsg);
    }
  },

  deleteanh: async (imageUrl) => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.delete(`/anh/image`, {
        ...config,
        params: {
          imageUrl: imageUrl
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  deletehinhanhduyet: async (imageUrl) => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.delete(`/anh/images`, {
        ...config,
        params: {
          imageUrl: imageUrl
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  }
}

export default hinhanh;