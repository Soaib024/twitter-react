import { useState } from "react";
import { followUnfollow } from "../api/userApi";

const FollowUnfollowButton = ({ loggedInUser, profileUserId }) => {
  const following = loggedInUser.user?.following.includes(profileUserId)
    ? true
    : false;
  const [isFollowing, setIsFollowing] = useState(following);
  const buttonClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    followUnfollow(profileUserId)
    .then((res) => {
        loggedInUser.reInitUser(res);
        setIsFollowing(!isFollowing);
    })
    .catch(err => console.error(err))
  };
  return (
    <div>
      {loggedInUser.user._id !== profileUserId && (
        <button
          className="bg-twitter_blue text-white p-2 rounded-xl w-24 focus:outline-none"
          onClick={buttonClickHandler}
        >
          {isFollowing ? "following" : "follow"}
        </button>
      )}
    </div>
  );
};

export default FollowUnfollowButton;
