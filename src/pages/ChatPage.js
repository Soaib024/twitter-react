import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getChats } from "../api/chatApi";
import Chat from "../components/Chat";
import UserContext from './../store/UserContext';

const ChatPage = () => {
  const history = useHistory();
  const [chats, setChats] = useState([]);
  const userLoggedIn = useContext(UserContext)
  useEffect(() => {
    getChats().then((res) => setChats(res));
  }, []);
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main">
        <div className="flex justify-between border-b p-2 items-center text-lg">
          <div>Inbox</div>
          <div onClick={() => history.push("/newChat")}>
            <FontAwesomeIcon
              icon={faPlusSquare}
              className="cursor-pointer"
            ></FontAwesomeIcon>
          </div>
        </div>
        <div>
          {chats.map(chat => <Chat chat={chat} userLoggedIn={userLoggedIn} key={chat._id}></Chat>)}
        </div>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default ChatPage;
