import api from "../api/api"

const Auth = {
  singup: async (username, email, password, phone, ngaysinh) => {
    try {
      const response = await api.post(`/users`, {
        username, email, password, phone, ngaysinh
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signup");
      }
    }
  },


  signin: async (email, password) => {
    try {
      const response = await api.post("/auth/token", { email, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data; // Ném ra lỗi với dữ liệu từ backend
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  gettoken: async () => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.get(`/users/myInfo`, config);
      window.localStorage.setItem("userId", response.data.result?.id);
      window.localStorage.setItem("email", response.data.result?.email);
      return response.data;
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized access. Please login again.");
      }
      if (error.response && error.response.data && error.response == 404) {
        // throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },

  getKhodienthoai: async () => {
    try {
        const token = window.localStorage.getItem("tokenadmin");
        const config = {};
        if (token) {
            config.headers = { 'Authorization': `Bearer ${token}` }
        }
        const response = await api.get(`/khodienthoai`, config);
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

}

export default Auth;