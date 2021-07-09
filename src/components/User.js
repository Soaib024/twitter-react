import React from "react";
import { Link } from "react-router-dom";
const { API } = require("../backend");

const User = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`}>
      {user && (
        <div className="flex items-center space-x-4 cursor-pointer mt-3">
          <div>
            <img
              src={`${API}/uploads/images/profilePic/${user.profilePic}`}
              alt="profile"
              className="w-12 rounded-full"
            />
          </div>
          <div className="space-x-1">
            <span>{user.name}</span>
            <span>@{user.username}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default User;
