import api from "../api/api"

const danhmuc = {
    getAlldanhmuc: async () => {
        try{
            const response = await api.get(`/danhmuc/all`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data){
                throw error.response.data
            } else {
                throw new Error("danh muc lỗi");
            }
        }
    },

    getAllnhucau: async () => {
        try{
            const response = await api.get(`/nhucaudienthoai`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data){
                throw error.response.data
            } else {
                throw new Error("danh muc lỗi");
            }
        }
    },
}

export default danhmuc;