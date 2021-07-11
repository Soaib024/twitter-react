import axios from "axios";
import { API } from "../backend";
axios.defaults.baseURL = API;


export const fetchProfile = async (id) => {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await axios.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { user: response.data };
  } catch (err) {
    console.log(err);
    return Error(
      (err.response && err.response.data && err.response.data.error) ||
        "Something went wrong, Please try again later"
    );
  }
};

export const followUnfollow = async (user) => {
  const token = localStorage.getItem("token");
    try{
        const response  = await axios.put(`user/follow/${user}`,  {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    }catch(err){
        console.log(err.response.data)
        return Error(err);
    }
};


