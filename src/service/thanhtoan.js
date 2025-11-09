import api from "../api/api"


// http://localhost:8090/identity/api/vn-pay?amount=100000&bankCode=NCB&email=hoangvu.startwork@gmail.com&diachi=123+Example+Street&productIds=4

const thanhtoan = {
    postGiohang: async (emails, diachi, ghichu, tongtien, giohangIdsString) => {
        try {
            const token = window.localStorage.getItem("token");
            const userId = window.localStorage.getItem("userId");
            const config = {};
            if (token) {
                config.headers = { 'Authorization': `Bearer ${token}` };
            }
            // const response = await api.get(`/api/vn-pay?amount=${tongtien}&bankCode=NCB&email=${emails}&diachi=${diachi}&productIds=${giohangIdsString}&ghichu=${ghichu}`, config);
            const response = await api.get('/api/vn-pay', {
                params: {
                  amount: tongtien,
                  email: emails,
                  diachi: diachi,
                  productIds: giohangIdsString,
                  ghichu: ghichu
                },
                // hoặc config
              }, config);
            // window.location.href = response.data.data.paymentUrl;
            console.log(response.data.data.paymentUrl)
            console.log("4444" + response)
            return response.data.data.paymentUrl;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error("Error during signin");
            }
        }
    },
}
export default thanhtoan;

// 