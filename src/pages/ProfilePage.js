import { useContext, useEffect, useState } from "react";
import { fetchProfile, followUnfollow } from "../api/userApi";
import Navbar from "../components/Navbar";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../backend";
import UserContext from "../store/UserContext";
import UserPosts from "./../components/UserPosts";
import Sidebar from "../components/Sidebar";
import ImageUploader from "./ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "../components/Post";
import { fetchTweet } from "./../api/postApi";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(undefined);
  const [isFollowing, setIsFollowing] = useState(false);
  const [uploadType, setUploadType] = useState(undefined);
  const [pinnedPost, setPinnedPost] = useState(undefined);
  const loggedInUser = useContext(UserContext);
  const history = useHistory();

  const ownProfilPage = userId === loggedInUser.user._id;

  useEffect(() => {
    fetchProfile(userId)
      .then((res) => {
        setUser(res.user);
        setIsFollowing(loggedInUser.user.following.includes(userId));
      })
      .catch((err) => console.error(err));
  }, [userId, isFollowing]);

  useEffect(() => {
    loggedInUser.user.pinnedPost &&
      fetchTweet(loggedInUser.user.pinnedPost).then((res) =>{
        setPinnedPost(res)
      });
  }, []);


  const followButtonHandler = (e) => {
    followUnfollow(userId)
      .then((res) => {
        loggedInUser.reInitUser(res);
        setIsFollowing(!isFollowing);
      })
      .catch((err) => console.error(err));
  };

  const closeImageUploader = () => {
    setUploadType(undefined);
  };
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main">
        {user && (
          <div className="">
            <p className="border-b-2 p-2 text-gray-700 text-xl">{user.name}</p>

            {/* cover image container */}
            <div className="h-52 relative bg-blue-200">
              <div className=" absolute w-full h-full">
                {user.cover && (
                  <img
                    src={`${API}/images/cover/${user.cover}`}
                    alt="cover"
                    className=" h-52 w-full object-cover"
                  />
                )}

                {ownProfilPage && (
                  <div
                    onClick={() => setUploadType("cover")}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-gray-600 opacity-50 text-5xl"
                    ></FontAwesomeIcon>
                  </div>
                )}
              </div>
            </div>

            {/* Profile image container */}
            <div className="relative -top-14 left-7">
              <img
                src={`${API}/images/profile/${user.profile}`}
                alt=""
                className="w-28 rounded-full border-4 border-white z-10"
              />
              {ownProfilPage && (
                <div
                  className=" absolute top-9 left-8"
                  onClick={() => {
                    setUploadType("profile");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-gray-600 text-5xl"
                  ></FontAwesomeIcon>
                </div>
              )}
            </div>

            <div className="flex p-2 justify-between items-center">
              <div>
                <p>{user.name}</p>
                <p>@{user.username}</p>
                <p
                  onClick={() =>
                    history.push(`/followersAndFollowings/${userId}`)
                  }
                  className="cursor-pointer"
                >
                  {user.following.length} following {user.followers.length}{" "}
                  followers
                </p>
              </div>
              {loggedInUser.user._id !== userId && (
                <button
                  className="text-white bg-twitter_blue rounded-xl px-4 py-2 border-none text-xl focus:outline-none mr-6"
                  onClick={followButtonHandler}
                >
                  {isFollowing ? "following" : "follow"}
                </button>
              )}
            </div>
            {uploadType && (
              <ImageUploader
                onClose={closeImageUploader}
                type={uploadType}
              ></ImageUploader>
            )}
          </div>
        )}
        {ownProfilPage && (pinnedPost && <Post post={pinnedPost}></Post>)}

        {/* Posts and like of users */}
        <UserPosts userId={userId}></UserPosts>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default ProfilePage;
