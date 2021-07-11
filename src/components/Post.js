import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrashAlt,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

import { faRetweet, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { timeDifference } from "../helpers/helper";
import { useContext, useEffect, useState } from "react";
import { deleteTweet, like, retweet } from "../api/postApi";
import UserContext from "./../store/UserContext";

import { useHistory } from "react-router-dom";
import CommentInput from "./CommentInput";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { API } = require("../backend");

const Post = ({ post, commentLimit }) => {
  const [postState, setPostState] = useState(post);
  const [retweetUser, setretweetUser] = useState(undefined);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const deleteConfirmationToast = () =>
    toast(
      <div>
        Delete this tweet ?{" "}
        <button
          className="text-gray-600 link"
          onClick={() => {
            setDeleted(true)
            deleteTweet(post._id)
            history.push('/home')
            
          }}
        >
          Yes
        </button>{" "}
      </div>,
      {
        hideProgressBar: true,
        autoClose: false,
      }
    );
  if (!commentLimit) {
    commentLimit = "limit=2";
  }

  if (postState.retweetData) {
    setretweetUser(postState.postedBy);
    setPostState(postState.retweetData);
  }

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

  const toggleCommentBox = (e) => {
    e.stopPropagation();
    setShowCommentBox(!showCommentBox);
  };

  const gotoPostUser = (e) => {
    e.stopPropagation();
    history.push(`/profile/${postState.postedBy._id}`);
  };

  const deleteThisPost = (e) => {
    e.stopPropagation();
    toast.dismiss();
    deleteConfirmationToast();
    
  };

  const pinThisPost = (e) => {
    e.stopPropagation();
    console.log("Pin this post");
  };

  // useEffect(() => ,[deleted]);
  

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

      <div className="flex items-center mb-2">
        <div>
          <img
            src={`${API}/uploads/images/profilePic/${post.postedBy.profilePic}`}
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
            <div className="text-gray-500 text-xs space-x-6 flex items-center">
              <div className="">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="cursor-pointer"
                  onClick={deleteThisPost}
                ></FontAwesomeIcon>
                <ToastContainer />
              </div>

              <div>
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className="cursor-pointer"
                  onClick={pinThisPost}
                ></FontAwesomeIcon>
              </div>
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
          <p onClick={toggleCommentBox} className="cursor-pointer">
            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          </p>
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
      <div className="max-h-96 overflow-y-scroll">
        {showCommentBox && (
          <CommentInput
            postId={postState._id}
            limit={commentLimit}
          ></CommentInput>
        )}
      </div>
    </div>
  );
};

export default Post;
