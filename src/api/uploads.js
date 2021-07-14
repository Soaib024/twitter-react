import axios from "axios";
const { API } = require("../backend");
axios.defaults.baseURL = API;

export const uploads = (formData, type) => {
  const token = localStorage.getItem("token");
  try{
      axios.post(`/uploads/${type}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })
  }catch(err){
      console.log(err);
  }

}