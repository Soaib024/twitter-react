import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { fetchProfile } from "./../api/userApi";

const FollowersAndFollowing = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("following");
  useEffect(() => {
    fetchProfile(userId).then((result) => setUser(result.user));
  }, [userId]);
  
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <div className="main">
        {user && (
          <div className="p-2">
            <User user={user}></User>
            <div className="flex text-center mt-4">
              <div
                className={`flex-grow  p-2 cursor-pointer ${
                  tab === "following" ? "border-b border-twitter_blue p-2" : ""
                }`}
                onClick={() => setTab("following")}
              >
                Following
              </div>
              <div
                className={`flex-grow  p-2 cursor-pointer ${
                  tab === "followers" ? "border-b border-twitter_blue p-2" : ""
                }`}
                onClick={() => setTab("followers")}
              >
                Followers
              </div>
            </div>

            <div className="mt-4">
              {user[tab].map((u) => (
                <User key={u._id} user={u}></User>
              ))}
            </div>
          </div>
        )}
      </div>
      <Sidebar></Sidebar>
    </div>
  );
};

export default FollowersAndFollowing;
