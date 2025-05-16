import api from "../api/api"

const thongtinvsthongsokythuat = {
  postThongsolythuat: async (id, kichthuocmanhinh, congnghemanghinh, tinhnangmanghinh, tansoquet, camerasau, quayvideo, tinhnagcamera, cameratruoc, quayvideotruoc, loaicpu, dophangiai, chipset, gpu, khecamthenho, pin, congnghesac, congsac, thesim, hedieuhang, hongngoai, jacktainghe, congghenfc, hotromang, wifi, bluetooth, gps, kichthuoc, trongluong, chatlieumatlung, tuongthich, chatlieukhungvien, chisokhangnuocbui, kieumanhinh, cambienvantai, cacloaicambien, tinhnangdacbiet, dacdiennoibat, editorContent) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.post(`/thongsokythuat/dienthoai`, {
        dienthoaiId: id,
        kichthuocmanhinh: kichthuocmanhinh,
        congnghemanghinh: congnghemanghinh,
        tinhnangmanghinh: tinhnangmanghinh,
        tansoquet: tansoquet,
        camerasau: camerasau,
        quayvideo: quayvideo,
        tinhnagcamera: tinhnagcamera,
        cameratruoc: cameratruoc,
        quayvideotruoc: quayvideotruoc,
        loaicpu: loaicpu,
        dophangiai: dophangiai,
        chipset: chipset,
        gpu: gpu,
        khecamthenho: khecamthenho,
        pin: pin,
        congnghesac: congnghesac,
        congsac: congsac,
        thesim: thesim,
        hedieuhang: hedieuhang,
        hongngoai: hongngoai,
        jacktainghe: jacktainghe,
        congghenfc: congghenfc,
        hotromang: hotromang,
        wifi: wifi,
        bluetooth: bluetooth,
        gps: gps,
        kichthuoc: kichthuoc,
        trongluong: trongluong,
        chatlieumatlung: chatlieumatlung,
        chatlieukhungvien: chatlieukhungvien,
        chisokhangnuocbui: chisokhangnuocbui,
        kieumanhinh: kieumanhinh,
        cambienvantai: cambienvantai,
        cacloaicambien: cacloaicambien,
        tinhnangdacbiet: tinhnangdacbiet,
        dacdiennoibat: dacdiennoibat,
        chitiet: editorContent,
        tuongthich: tuongthich,
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

  putThongsolythuat: async (id, kichthuocmanhinh, congnghemanghinh, tinhnangmanghinh, tansoquet, camerasau, quayvideo, tinhnagcamera, cameratruoc, quayvideotruoc, loaicpu, dophangiai, chipset, gpu, khecamthenho, pin, congnghesac, congsac, thesim, hedieuhang, hongngoai, jacktainghe, congghenfc, hotromang, wifi, bluetooth, gps, kichthuoc, trongluong, chatlieumatlung, tuongthich, chatlieukhungvien, chisokhangnuocbui, kieumanhinh, cambienvantai, cacloaicambien, tinhnangdacbiet, dacdiennoibat, editorContent) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.put(`/thongsokythuat/${id}`, {
        kichthuocmanhinh: kichthuocmanhinh,
        congnghemanghinh: congnghemanghinh,
        tinhnangmanghinh: tinhnangmanghinh,
        tansoquet: tansoquet,
        camerasau: camerasau,
        quayvideo: quayvideo,
        tinhnagcamera: tinhnagcamera,
        cameratruoc: cameratruoc,
        quayvideotruoc: quayvideotruoc,
        loaicpu: loaicpu,
        dophangiai: dophangiai,
        chipset: chipset,
        gpu: gpu,
        khecamthenho: khecamthenho,
        pin: pin,
        congnghesac: congnghesac,
        congsac: congsac,
        thesim: thesim,
        hedieuhang: hedieuhang,
        hongngoai: hongngoai,
        jacktainghe: jacktainghe,
        congghenfc: congghenfc,
        hotromang: hotromang,
        wifi: wifi,
        bluetooth: bluetooth,
        gps: gps,
        kichthuoc: kichthuoc,
        trongluong: trongluong,
        chatlieumatlung: chatlieumatlung,
        chatlieukhungvien: chatlieukhungvien,
        chisokhangnuocbui: chisokhangnuocbui,
        kieumanhinh: kieumanhinh,
        cambienvantai: cambienvantai,
        cacloaicambien: cacloaicambien,
        tinhnangdacbiet: tinhnangdacbiet,
        dacdiennoibat: dacdiennoibat,
        chitiet: editorContent,
        tuongthich: tuongthich,
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

  getThongsokythuat: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.get(`/thongsokythuat/${id}`, config);
      return response.data.result;
    } catch {
      if (error.response && error.response.data) {
        throw error.response.data
      } else {
        throw new Error("Không có dữ liệu");
      }
    }
  },

  delete: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.delete(`/thongsokythuat/${id}`, config)
      return response.data.result;
    } catch {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },


  // Thông tin điện thoại
  getThongtindienthoai: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin")
      const config = {}
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.get(`/thongtindienthoai/${id}`, config);
      return response.data.result;
    } catch {
      if (error.response && error.response.data) {
        throw error.response.data
      } else {
        throw new Error("Không có dữ liệu");
      }
    }
  },

  postThongtindienthoai: async (id, baohanh, tinhtrangmay, thietbidikem) => {
    try {
      const token = window.localStorage.getItem("tokenadmin")
      const config = {}
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.post(`/thongtindienthoai`, {
        tinhtrangmay: tinhtrangmay,
        thietbidikem: thietbidikem,
        baohanh: baohanh,
        dienthoaiId: id
      }, config);
      return response.data.result;
    } catch {
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

  putThongtindienthoai: async (id, baohanh, iddienthoai, tinhtrangmay, thietbidikem) => {
    try {
      const token = window.localStorage.getItem("tokenadmin")
      const config = {}
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }
      const response = await api.put(`/thongtindienthoai/${id}`, {
        tinhtrangmay: tinhtrangmay,
        thietbidikem: thietbidikem,
        baohanh: baohanh,
        dienthoaiId: iddienthoai
      }, config);
      return response.data.result;
    } catch {
      if (error.response && error.response.data) {
        throw error.response.data
      } else {
        throw new Error("Không có dữ liệu");
      }
    }
  },

  deletethongtin: async (id) => {
    try {
      const token = window.localStorage.getItem("tokenadmin");
      const config = {};
      if (token) {
        config.headers = { 'Authorization': `Bearer ${token}` }
      }
      const response = await api.delete(`/thongtindienthoai/${id}`, config)
      return response.data.result;
    } catch {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error("Error during signin");
      }
    }
  },


}

export default thongtinvsthongsokythuat;