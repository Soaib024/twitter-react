import { API } from "../backend";
import { useHistory } from "react-router-dom";
import { markAsRead } from "../api/chatApi";


const Chat = ({ chat, userLoggedIn }) => {
  const history = useHistory();
  let chatImage = "";

  if (!chat.isGroupChat) {
    chatImage = (
      <div className="w-12 h-12 mr-8">
        <img
          src={`${API}/uploads/images/profile/${chat.users[0].profile}`}
          alt="profile"
          className="rounded-full w-10 p-1"
        ></img>
      </div>
    );
  } else {
    chatImage = (
      <div className="relative w-12 h-12 mr-8">
        <img
          src={`${API}/uploads/images/profile/${chat.users[0].profile}`}
          alt="profile"
          className="rounded-full w-10 p-1 z-10 absolute top-3"
        ></img>
        <img
          src={`${API}/uploads/images/profile/${chat.users[1].profile}`}
          alt="profile"
          className="rounded-full w-10 p-1 absolute left-3 top-1"
        ></img>
      </div>
    );
  }

  const openedMessage = !chat.latestMessage || chat.latestMessage?.readBy?.includes(userLoggedIn.user._id);
  return (
    <div
      key={chat._id}
      className={`flex items-center py-2 border-b hover:bg-gray-50 ${
        !openedMessage && "bg-blue-50"
      }`}
      onClick={() => {
        if (!openedMessage && chat.latestMessage)
          markAsRead(chat.latestMessage._id);
        history.push(`/messages/${chat._id}`);
      }}
    >
      {chatImage}
      <div className="">
        <p>{chat.chatName}</p>
        <p className="text-xxs text-gray-500">
          {chat?.latestMessage?.sender?.name}
          {chat.latestMessage && ": "} {chat?.latestMessage?.content}
        </p>
      </div>
    </div>
  );
};

export default Chat;
