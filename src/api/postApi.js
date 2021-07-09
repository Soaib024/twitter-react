import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;
const token = localStorage.getItem("token");

export const postTweet = async (formData) => {
  
  let response;

  const hasImage = formData.get("image") !== "undefined";
  const url = `/post/${hasImage ? "withImage" : "withoutImage"}`;
  const body = hasImage ? formData : { content: formData.get("content") };
  try {
    response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.reponse && err.reponse.data && err.response.data.error) {
      return Error(err.reponse.data.error);
    } else {
      return Error("Something went wrong, Please try again later");
    }
  }

  return { post: response.data };
};

export const fetchTweets = async (queryString = "") => {
  
  let response;
  try {
    response = await axios.get(`/post?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.reponse && err.reponse.data && err.response.data.error) {
      return Error(err.reponse.data.error);
    } else {
      return Error("Something went wrong, Please try again later");
    }
  }
  return { posts: response.data };
};

export const fetchTweet = async (id) => {

  let response;

  try{
    response = await axios.get(`/post/${id}`, { headers: { Authorization: `Bearer ${token}`}});
  }catch(err){
    console.log(err)
    Error(
      (err.response && err.response.data && err.response.data.error) ||
        "Something went wrong, Please try again later"
    )
  }

  return response.data;
};

export const like = async (postId) => {

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
    console.log(err);
    if (err.reponse && err.reponse.data && err.response.data.error) {
      return Error(err.reponse.data.error);
    } else {
      return Error("Something went wrong, Please try again later");
    }
  }
  return { ...response.data };
};

export const retweet = async (postId) => {
  
  let response;
  try {
    response = await axios.post(
      "/post/retweet",
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    if (err.reponse && err.reponse.data && err.response.data.error) {
      return Error(err.reponse.data.error);
    } else {
      return Error("Something went wrong, Please try again later");
    }
  }
  return { ...response.data };
};


