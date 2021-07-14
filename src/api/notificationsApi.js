import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;

export const getAllNotifications = async () => {
  const token = localStorage.getItem("token");
  try {
    const results = await axios.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return results.data;
  } catch (err) {
    console.log(err);
  }
};                                                                                                                                                                                                                                                                                                 

export const markAsRead = async (notificationId) => {
  const token = localStorage.getItem("token");
  try{
    await axios.put(`/notifications/${notificationId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }catch (err) {
    console.log(err.response);
  }
};

export const markAllAsRead = async () => {
  const token = localStorage.getItem("token");
  try{
    await axios.patch("/notifications", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }catch (err) {
    console.log(err.response);
  }
};

export const notificationCount = async () => {
  const token = localStorage.getItem("token");
  try{
    const result = await axios.get("/notifications/count", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  }catch (err) {
    console.log(err.response);
  }
}
