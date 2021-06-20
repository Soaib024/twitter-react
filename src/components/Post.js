import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { faRetweet, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { timeDifference } from "../helpers/helper";
import { useContext, useState } from "react";
import { like, retweet } from "../api/postApi";
import UserContext from "./../store/UserContext";
import ModalContainer from "./ModalContainer";
import {  useHistory } from "react-router-dom";

const { API } = require("../backend");

const Post = ({ post }) => {
  const [postState, setPostState] = useState(post);
  const [retweetUser, setretweetUser] = useState(undefined);
  const userContext = useContext(UserContext);
  const history = useHistory();

  if (postState.retweetData) {
    setretweetUser(postState.postedBy);
    setPostState(postState.retweetData);
  }

  const replyTo = postState.replyTo || undefined;

  const likeHandler = (e) => {
    e.stopPropagation();
    like(post._id)
      .then((response) => {
        setPostState({ ...response.post });
        userContext.reInitUser(response.user);
      })
      .catch((err) => console.log("Something went wrong"));
  };

  const retweetHandler = (e) => {
    e.stopPropagation();
    retweet(postState._id)
      .then((response) => {
        setPostState({ ...response.post });
        userContext.reInitUser(response.user);
      })
      .catch((err) => console.log("something went wrong"));
  };

  const divClickHandler = () => {
    history.push(`/post/${postState._id}`);
  };

  const gotoRetweetUser = (e) => {
    e.stopPropagation();
    history.push(`/profile/${retweetUser._id}`);
  };

  const gotoReplyUser = (e) => {
    e.stopPropagation();
    history.push(`/profile/${replyTo.postedBy._id}`);
  };

  const gotoPostUser = (e) => {
    e.stopPropagation();
    history.push(`/profile/${postState.postedBy._id}`);
  };

  const deleteThisPost = (e) => {
    e.stopPropagation();
    console.log("delete this post");
  };

  const pinThisPost = (e) => {
    e.stopPropagation();
    console.log("Pin this post");
  };

  return (
    <div key={postState._id} className="my-4" onClick={divClickHandler}>
      {retweetUser && (
        <p className="text-gray-400 text-xxs mb-2 ">
          retweeted by{" "}
          <span className="link" onClick={gotoRetweetUser}>
            @{retweetUser.username}
          </span>
        </p>
      )}
      {replyTo && (
        <p className="text-gray-400 text-xxs mb-2 ">
          replying to{" "}
          <span className="link" onClick={gotoReplyUser}>
            @{replyTo.postedBy.username}
          </span>
        </p>
      )}
      <div className="flex items-center mb-2">
        <div>
          <img
            src={`${API}/uploads/images/profilePic/${postState.postedBy.profilePic}`}
            alt="profile"
            className="w-11 h-11 rounded-full mr-2"
          ></img>
        </div>

        <div className="flex flex-1 justify-between">
          <div className="space-x-2">
            <span className="text-xxs">{postState.postedBy.name}</span>
            <span
              className="text-gray-400 text-xxs link"
              onClick={gotoPostUser}
            >
              @{postState.postedBy.username}
            </span>
            <span className="text-gray-400 text-xxs">
              {timeDifference(postState.createdAt)}
            </span>
          </div>

          {postState.postedBy._id === userContext.user._id && (
            <div className="text-gray-500 text-xs space-x-6">
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="cursor-pointer"
                onClick={deleteThisPost}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faThumbtack}
                className="cursor-pointer"
                onClick={pinThisPost}
              ></FontAwesomeIcon>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 my-3">
        <p className="font-thin ml-3">{postState.content}</p>
        {postState.postImage && (
          <img
            src={`${API}/uploads/images/posts/${postState.postImage}`}
            alt="postState"
            className="w-full rounded-lg shadow-lg object-cover"
            loading="lazy"
          ></img>
        )}
      </div>

      <div className="flex justify-around text-gray-500">
        <span className="flex items-center space-x-1">
          <ModalContainer
            profilePic={postState.postedBy.profilePic}
            post={postState}
          ></ModalContainer>
        </span>
        <span
          className={`flex items-center space-x-1 ${
            userContext.user.likes.includes(postState._id) && "text-red-500"
          }`}
          onClick={likeHandler}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className="cursor-pointer"
          ></FontAwesomeIcon>
          <p>{postState.likes.length > 0 && postState.likes.length}</p>
        </span>
        <span
          className={`flex items-center space-x-1 ${
            userContext.user.retweets.includes(postState._id) &&
            "text-green-500"
          }`}
          onClick={retweetHandler}
        >
          <FontAwesomeIcon
            icon={faRetweet}
            className="cursor-pointer"
          ></FontAwesomeIcon>
          <p>
            {postState.retweetUsers.length > 0 && postState.retweetUsers.length}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Post;
