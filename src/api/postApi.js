import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;


export const postTweet = async (formData) => {
  const token = localStorage.getItem("token");
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

export const fetchTweets = async (queryString) => {
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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


export const deleteTweet = async (tweetId) => {
  const token = localStorage.getItem("token");
  try{
    const res = await axios.delete(`/post/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res
  }catch(err){
    console.log(err);
    return Error(err);
  }
}

