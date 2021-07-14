import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { getChat, sendMessage, fetchMessages, changeChatName } from "./../api/chatApi";
import { API } from "../backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserContext from "./../store/UserContext";
import Message from "../components/Message";

import dots from "../images/dots.gif";
import io from "socket.io-client";

let timer;
const MessagePage = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState("")
  const [isTyping, setIsTyping] = useState(false);
  const loggedInUser = useContext(UserContext);
  const scrollRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(API);
    socketRef.current.emit("setup", loggedInUser.user._id);
    socketRef.current.on("connected", () =>
      socketRef.current.emit("join chat", chatId)
    );
    socketRef.current.on("typing", () => setIsTyping(true));
    socketRef.current.on("stop typing", () => setIsTyping(false));
    socketRef.current.on("new message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId, loggedInUser.user._id, messages]);

  useEffect(() => {
    getChat(chatId).then((result) => {
      setChat(result)
      setChatName(result.chatName)
    });
    
  }, [chatId]);

  useEffect(() => {
    fetchMessages(chatId).then((results) => setMessages(results));
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let chatImage = chat.users && (
    <div className="flex space-x-1 relative">
      {chat.users.length > 1 && (
        <img
          src={`${API}/images/profile/${chat.users[0].profile}`}
          alt="profile"
          className="rounded-full w-9"
        ></img>
      )}

      {chat.users.length > 2 && (
        <img
          src={`${API}/images/profile/${chat.users[1].profile}`}
          alt="profile"
          className="rounded-full w-9 absolute left-4"
        ></img>
      )}

      {chat.users.length > 3 && (
        <img
          src={`${API}/images/profile/${chat.users[2].profile}`}
          alt="profile"
          className="rounded-full w-9 absolute left-8"
        ></img>
      )}

      {chat.users.length > 4 && (
        <p className="rounded-full w-9 h-10 bg-gray-100 flex justify-center items-center absolute left-16">
          +{chat.users.length - 4}
        </p>
      )}
    </div>
  );

  const sendMessageHandler = () => {
    sendMessage(chatId, message).then((newMessage) => {
      setMessages([...messages, newMessage]);
      socketRef.current.emit("new message", { chatId, message: newMessage });
    });
    setMessage("");
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main flex flex-col flex-grow">
        <div className="">
          <p className="border-b text-xl p-2">Chat</p>
          <div className="flex border-b p-2">
            {chatImage}
            <input
              type="text"
              value={chatName}
              // onChange={(e) => setChatName(e.target.value)}
              className="flex-grow line-clamp-1 text-gray-500 ml-4 outline-none text-center"
            />
            {/* <button onClick={() => {changeChatName(chatId, chatName); setChatName(chatName)}} className="border">change chat name</button> */}
          </div>
        </div>
        <div className="flex-grow overflow-scroll scrollbar-none p-2">
          {messages.map((message) => (
            <div ref={scrollRef}>
              <Message
                message={message}
                key={message._id}
                loggedInUser={loggedInUser.user._id}
              ></Message>
            </div>
          ))}
        </div>
        {isTyping && (
          <img src={dots} alt="typing dots" className="w-10 pl-2"></img>
        )}
        <div className="flex p-2 mt-4">
          <textarea
            className="bg-gray-100 rounded-xl py-2 px-2 h-12 outline-none flex-grow resize-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={() => {
              socketRef.current.emit("typing", chatId);
              clearTimeout(timer);
              timer = setTimeout(() => {
                socketRef.current.emit("stop typing", chatId);
              }, 3000);
            }}
          />
          <button
            disabled={message.length === 0}
            onClick={sendMessageHandler}
            className="focus:outline-none flex items-center justify-center p2"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={`text-xl ml-4 ${
                message.length > 0 ? "text-twitter_blue" : "text-gray-400"
              }`}
            ></FontAwesomeIcon>
          </button>
        </div>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default MessagePage;
