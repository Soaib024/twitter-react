import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;
const token = localStorage.getItem("token");

export const search = async (type, pattern) => {
  console.log(type, pattern)
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
