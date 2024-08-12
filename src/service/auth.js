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
        const response = await api.post(`/auth/token`, {
          email, password
        });
        return response.data;
      } catch (error) {
          if (error.response && error.response.data) {
              throw error.response.data;
            } else {
              throw new Error("Error during signin");
            }
      }
  },

  gettoken: async () => {
    try {
      const token = window.localStorage.getItem("token");
      console.log("token - api " + token);
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.get(`/users/myInfo`, config);
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

export default Auth;