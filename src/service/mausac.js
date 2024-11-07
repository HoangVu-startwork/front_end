import api from "../api/api"


const Mausac = {
    postmausac: async (id, hinhanhs, tenmausac, giaban) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.post(`/mausac/maudienthoai`, {
                tenmausac: tenmausac, 
                giaban: giaban,
                hinhanh: hinhanhs,
                dienthoaiId: id,
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

    putmausac: async (id, hinhanhs, tenmausac, giaban, iddienthoai) => {
        try {
            const token = window.localStorage.getItem("tokenadmin");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            const response = await api.put(`/mausac/${id}`, {
                tenmausac: tenmausac, 
                giaban: giaban,
                hinhanh: hinhanhs,
                dienthoaiId: iddienthoai,
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
        try{
          const token = window.localStorage.getItem("tokenadmin");
          const config = {};
          if (token){
            config.headers = {'Authorization': `Bearer ${token}`}
          }
          const response = await api.delete(`/mausac/${id}`, config)
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

export default Mausac;