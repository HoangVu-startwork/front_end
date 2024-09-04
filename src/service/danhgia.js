import api from "../api/api"

const danhgia = {
    getdanhgia: async () => {
        try{
            const response = await api.get(`/tongsao/${id}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data){
                throw error.response.data
            } else {
                throw new Error("Đánh giá lỗi");
            }
        }
    },

    getAlldanhgia: async () => {
        try {
          const response = await api.get(`danhgia/all`);
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

export default danhgia;
