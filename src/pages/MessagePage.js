import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { getChat, sendMessage, fetchMessages } from "./../api/chatApi";
import { API } from "../backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserContext from './../store/UserContext';
import Message from "../components/Message";

const MessagePage = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedInUser = useContext(UserContext)
  const scrollRef = useRef();
  useEffect(() => {
    getChat(chatId).then((result) => setChat(result));
  }, [chatId]);

  useEffect(() => {
    fetchMessages(chatId).then((results) => setMessages(results));
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  let chatImage = chat.users && (
    <div className="flex space-x-1">
      {chat.users.length > 1 && (
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[0].profilePic}`}
          alt="profile"
          className="rounded-full w-9"
        ></img>
      )}

      {chat.users.length > 2 && (
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[1].profilePic}`}
          alt="profile"
          className="rounded-full w-9"
        ></img>
      )}

      {chat.users.length > 3 && (
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[2].profilePic}`}
          alt="profile"
          className="rounded-full w-9"
        ></img>
      )}

      {chat.users.length > 4 && (
        <p className="rounded-full w-9 bg-gray-100 flex justify-center items-center">
          +{chat.users.length - 4}
        </p>
      )}
    </div>
  );

  const sendMessageHandler = () => {
    sendMessage(chatId, message).then(newMessage => setMessages([...messages, newMessage]));
    setMessage("");
  };

  return (
    <div className="wrapper ">
      <Navbar></Navbar>
      <main className="main flex flex-col flex-grow">
        <div className="">
          <p className="border-b text-xl p-2">Chat</p>
          <div className="flex border-b p-2">
            {chatImage}
            <input
              type="text"
              name=""
              id=""
              value={chat.chatName}
              className="flex-grow line-clamp-1 text-gray-500 ml-4 outline-none"
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-scroll scrollbar-none p-2">
          {messages.map((message) => (
            <div ref={scrollRef}>
              <Message message={message} loggedInUser={loggedInUser.user._id}></Message>
            </div>
          ))}
        </div>
        <div className="flex p-2 mt-4">
          <textarea
            className="bg-gray-100 rounded-xl py-2 px-2 h-12 outline-none flex-grow resize-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            
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
