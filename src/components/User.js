import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FollowUnfollowButton from "./FollowUnfollowButton";
import UserContext from "./../store/UserContext";
const { API } = require("../backend");

const User = ({ user, small }) => {
  const userContext = useContext(UserContext);
  return (
    <Link to={`/profile/${user._id}`}>
      {user && (
        <div className={`flex items-center justify-between space-x-4 cursor-pointer mt-3 ${small && 'text-xs font-medium'}`}>
          <div className="flex space-x-4 items-center">
            <div>
              <img
                src={`${API}/images/profile/${user.profile}`}
                alt="profile"
                className={`rounded-full ${small ? 'w-8' : 'w-12'}`}
              />
            </div>
            <div className={`space-x-1 ${small && 'flex flex-col'}`}>
              <span>{user.name}</span>
              <span className="text-gray-400">@{user.username}</span>
            </div>
          </div>
          <FollowUnfollowButton
            loggedInUser={userContext}
            profileUserId={user._id}
          ></FollowUnfollowButton>
        </div>
      )}
    </Link>
  );
};

export default User;
