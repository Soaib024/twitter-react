import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;

export const createChat = (members) => {
  const token = localStorage.getItem("token");
  let chatName = "";
  for (let i = 0; i < members.length; i++) {
    chatName += members[i].name;
    if (i + 1 < members.length) {
      chatName += ",";
    }
  }

  axios.post(
    "/chat",
    {
      users: members.map((member) => member._id),
      isGroupChat: members.length > 1,
      chatName: chatName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getChats = async () => {
  const token = localStorage.getItem("token");
  const results = await axios.get("/chat", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return results.data;
};

export const getChat = async (chatId) => {
  const token = localStorage.getItem("token");
  const result = await axios.get(`/chat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const sendMessage = async (chat, content) => {
  const token = localStorage.getItem("token");
  const result = await axios.post(
    "/message",
    { chat, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return result.data;
};

export const fetchMessages = async (chatId) => {
  const token = localStorage.getItem("token");
  const results = await axios.get(`/message/${chatId}`, {headers: {Authorization: `Bearer ${token}`}})
  return results.data;
}
