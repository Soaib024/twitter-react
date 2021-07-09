import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API
export const login = async (payload) => {
  try {
    const response = await axios.post("/auth/login", payload);
    if (response.status === 200) {
      storeUserInLocalStorage(response.data);
      return { token: response.data.token, user: response.data.user };
    }
  } catch (err) {
    console.log(err)
    console.log(err.response.data.error);
    return { error: err.response.data.error };
  }
};

export const register = async (payload) => {
  try {
    const response = await axios.post("/auth/register", payload);
    if (response.status === 201) {
      storeUserInLocalStorage(response.data);
      return { token: response.data.token, user: response.data.user };
    }
  } catch (err) {
    return { error: err.response.data.error };
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const storeUserInLocalStorage = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};
