import { API } from "../backend";
import { useHistory } from 'react-router-dom';

const Chat = ({ chat }) => {
    const history = useHistory()
  let chatImage = "";
  if (!chat.isGroupChat) {
    chatImage = (
      <div className="w-12 h-12 mr-8">
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[0].profilePic}`}
          alt="profile"
          className="rounded-full w-10 p-1 border"
        ></img>
      </div>
    );
  } else {
    chatImage = (
      <div className="relative w-12 h-12 mr-8">
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[0].profilePic}`}
          alt="profile"
          className="rounded-full border w-10 p-1 z-10 absolute top-3"
        ></img>
        <img
          src={`${API}/uploads/images/profilePic/${chat.users[1].profilePic}`}
          alt="profile"
          className="rounded-full border w-10 p-1 absolute left-3 top-1"
        ></img>
      </div>
    );
  }
  return (
    <div key={chat._id} className="flex items-center py-2 border-b hover:bg-gray-50" onClick={() => history.push(`/messages/${chat._id}`)}>
      {chatImage}
      <div className="">{chat.chatName}</div>
    </div>
  );
};

export default Chat;
