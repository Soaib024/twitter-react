import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;

const token = localStorage.getItem("token");

export const sendComment = async (postId, comment) => {
    const token = localStorage.getItem("token");
    try{
    return  (await axios.post(`/comment/${postId}`,{comment}, {headers: {Authorization: `Bearer ${token}`}})).data
    }catch(err){
        return Error(err)
    }
   
}

export const fetchComment = async (postId, query) => {
    const token = localStorage.getItem("token");
    try{
        const response = await axios.get(`/comment/${postId}?${query}`, {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    }catch(err){
        return Error(err);
    }
}
