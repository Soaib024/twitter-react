import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { search } from "../api/searchApi";
import { useEffect, useState } from "react";
import { createChat } from "./../api/chatApi";
import { useHistory } from "react-router-dom";
const { API } = require("../backend");

const CreateNewChat = () => {
  const [members, setMembers] = useState([]);
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const history = useHistory();

  const onchangeHandler = (e) => {
    setText(e.target.value);
  };

  const addMember = (user) => {
    setMembers([user, ...members]);
    setResults([]);
    setText("");
  };

  const removeMember = (id) => {
    setMembers(members.filter((member) => member._id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim().length > 0) {
        search("user", text).then((results) => {
          const map = new Map();
          for (let i = 0; i < members.length; i++) {
            map.set(members[i]._id, 0);
          }

          setResults(results.filter((result) => !map.has(result._id)));
        });
      } else {
        setResults([]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main ">
        <div className="border-b py-2 flex items-center text-lg">
          <p>New Message</p>
        </div>
        <div className="border-b flex  py-2 items-center">
          <p className="mr-2">To:</p>
          <div className="flex mr-2">
            {members.map((member) => (
              <div
                className="bg-twitter_blue-light px-4 py-2 rounded-md mr-1 text-twitter_blue"
                onClick={() => removeMember(member._id)}
              >
                {member.name}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type name of person"
            onChange={onchangeHandler}
            className="flex-grow outline-none p-2"
            value={text}
          />
        </div>
        <div>
          {results.map((user) => (
            <div
              className="flex items-center space-x-4 cursor-pointer mt-3"
              onClick={() => addMember(user)}
              key={user._id}
            >
              <div>
                <img
                  src={`${API}/uploads/images/profilePic/${user.profilePic}`}
                  alt="profile"
                  className="w-10 rounded-full"
                />
              </div>
              <div className="space-x-1">
                <span>{user.name}</span>
                <span>@{user.username}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-2">
          <button
            className={`border rounded-full px-3 py-1 ${
              members.length > 0
                ? "text-white bg-twitter_blue"
                : "text-gray-500 bg-gray-200"
            }`}
            disabled={members.length === 0}
            onClick={() => {
              createChat(members);
              history.push("/chats");
            }}
          >
            Create chat
          </button>
        </div>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default CreateNewChat;
