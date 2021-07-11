import { useContext, useEffect, useState } from "react";
import { fetchProfile, followUnfollow } from "../api/userApi";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { API } from "../backend";
import UserContext from "../store/UserContext";
import UserPosts from './../components/UserPosts';
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(undefined);
  const [isFollowing, setIsFollowing] = useState(false);
  const loggedInUser = useContext(UserContext)
  useEffect(() => {
    fetchProfile(userId)
      .then((res) => {
        setUser(res.user);
        setIsFollowing(loggedInUser.user.following.includes(userId));
      })
      .catch((err) => console.error(err));
    
  }, [userId]);


  const followButtonHandler = (e) => {
      followUnfollow(userId)
      .then((res) => {
          loggedInUser.reInitUser(res);
          setIsFollowing(!isFollowing);
          //setUser(res)
      })
      .catch(err => console.error(err))
  }
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main">
        {user && (
          <div>
            <p className="border-b-2 text-gray-700 text-xl">{user.name}</p>
            <div className="relative">
              <div className="h-52 bg-blue-200"></div>
              <div>
                <img
                  src={`${API}/uploads/images/profilePic/${user.profilePic}`}
                  alt=""
                  className="w-28 rounded-full border-4 border-white absolute top-36 left-4"
                />
              </div>
              <div className="mt-20 flex justify-between items-center">
                <div>
                  <p>{user.name}</p>
                  <p>@{user.username}</p>
                  <p>
                    {user.following.length} following {user.followers.length}{" "}
                    followers
                  </p>
                </div>
                {loggedInUser.user._id !== userId && (
                  <button className="text-white bg-twitter_blue rounded-xl px-4 py-2 border-none text-xl focus:outline-none mr-6" onClick={followButtonHandler}>
                    {isFollowing ? "following" : "follow"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <UserPosts userId={userId}></UserPosts>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default ProfilePage;
