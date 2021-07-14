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
  try {
    const response = await axios.put(
      `user/follow/${user}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return Error(err);
  }
};

export const followSuggestion = async () => {
  const token = localStorage.getItem("token");
  try {
    const results = await axios.get("/user/followSuggestion", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return results.data;
  } catch (err) {
    console.log(err);
  }
};

export const pinTweet = async (tweetId) => {
  const token = localStorage.getItem("token");
  try{
    const res = await axios.put(`/user/pin/${tweetId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  }catch(err){
    console.log(err);
    return Error(err);
  }
}
