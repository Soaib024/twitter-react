import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;


export const search = async (type, pattern) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        followingOnly: true,
        type,
        pattern,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return Error(err);
  }
};
