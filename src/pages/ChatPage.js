import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChats } from "../api/chatApi";
import Chat from "../components/Chat";

const ChatPage = () => {
  const history = useHistory();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    getChats().then((res) => setChats(res));
  }, []);
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main">
        <div className="flex justify-between border-b py-2 items-center text-lg">
          <div>Inbox</div>
          <div onClick={() => history.push("/newChat")}>
            <FontAwesomeIcon
              icon={faPlusSquare}
              className="cursor-pointer"
            ></FontAwesomeIcon>
          </div>
        </div>
        <div>
          {console.log(chats)}
          {chats.map(chat => <Chat chat={chat}></Chat>)}
        </div>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default ChatPage;
