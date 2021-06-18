import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;

export const postTweet = async (formData) => {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await axios.post("/post", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if(err.reponse && err.reponse.data && err.response.data.error){
      return Error(err.reponse.data.error);
    }else{
      return {error: "Something went wrong, Please try again later"}
    }
  }

  return { post: response.data };
};

export const fetchTweets = async () => {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await axios.get("/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if(err.reponse && err.reponse.data && err.response.data.error){
      return Error(err.reponse.data.error);
    }else{
      return {error: "Something went wrong, Please try again later"}
    }
  }

  return { posts: response.data };
};

export const like = async (postId) => {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await axios.put(
      "/post/like",
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    if(err.reponse && err.reponse.data && err.response.data.error){
      return Error(err.reponse.data.error);
    }else{
      return {error: "Something went wrong, Please try again later"}
    }
  }
  return { ...response.data };
};

export const retweet = async (postId) => {
  const token = localStorage.getItem("token");
  let response;
  try{
    response = await axios.post('/post/retweet', {postId}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }catch (err){
    if(err.reponse && err.reponse.data && err.response.data.error){
      return Error(err.reponse.data.error);
    }else{
      return {error: "Something went wrong, Please try again later"}
    }
  }
  return {...response.data}
}


