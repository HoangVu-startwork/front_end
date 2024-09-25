import api from "../api/api"

const mucluc = {
    postMucluc: async (tenmucluc) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
              config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/mucluc`, {
                tenmucluc
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

    getMucluc: async () => {
      try {
        const token = window.localStorage.getItem("tokenadmin");
        const config = {};
        if (token) {
          config.headers = { 'Authorization': `Bearer ${token}` };
        }
        const response = await api.get(`/mucluc`, config)
        return response.data.result;
      } catch (error) {
        if (error.response && error.response.data) {
          throw error.response.data;
        } else {
          throw new Error("Error during signin");
        }
      }
    },

    getMuclucId: async (id) => {
      try{
        const token = window.localStorage.getItem("tokenadmin");
        const config = {};
        if (token){
          config.headers = {'Authorization': `Bearer ${token}`}
        }
        const response = await api.get(`/mucluc/${id}`, config)
        return response.data.result;
      } catch {
        if (error.response && error.response.data) {
          throw error.response.data;
        } else {
          throw new Error("Error during signin");
        }
      }
    }, 

    delete: async (id) => {
      try{
        const token = window.localStorage.getItem("tokenadmin");
        const config = {};
        if (token){
          config.headers = {'Authorization': `Bearer ${token}`}
        }
        const response = await api.delete(`/mucluc/${id}`, config)
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

export default mucluc;