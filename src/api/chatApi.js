import axios from "axios";

const { API } = require("../backend");
axios.defaults.baseURL = API;

export const createChat = async (members, currentUsername) => {
  const token = localStorage.getItem("token");
  let tempName = "";
  for (let i = 0; i < members.length; i++) {
    tempName += members[i].name +', ';
  }
  tempName += currentUsername

  const results = await axios.post(
    "/chat",
    {
      users: members.map((member) => member._id),
      isGroupChat: members.length > 1,
      chatName: tempName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return results.data;
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
  const results = await axios.get(`/message/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return results.data;
};

export const markAsRead = async (messageId) => {
  const token = localStorage.getItem("token");
  await axios.put(
    `/message/${messageId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const changeChatName = async (chatId, name) => {
  const token = localStorage.getItem("token");
  const newName = await axios.put(
    `/chat/${chatId}`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return newName.data;
};
