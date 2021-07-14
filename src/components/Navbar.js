import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { notificationCount } from "../api/notificationsApi";
import UserContext from "../store/UserContext";
import FollowSuggestion from "./FollowSuggestion";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [count, setCount] = useState({ m: 0, n: 0 });

  const signoutHandler = () => {
    userContext.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <nav className="flex flex-col lg:w-3/12 lg:mr-2 lg:justify-between lg:space-y-4">
      <div className="flex justify-between lg:justify-start p-2 rounded-lg shadow-xl bg-white flex-grow lg:flex-col">
        <Link to="/home">
          <i className="im im-twitter text-twitter_blue nav-i"></i>
        </Link>

        <Link to="/home">
          <div className="nav-container ">
            <i className="im im-home nav-i"></i>
            <span className="hidden lg:inline-block">Home</span>
          </div>
        </Link>

        <Link to="/search">
          <div className="nav-container">
            <i className="im im-magnifier nav-i"></i>
            <span className="hidden lg:inline-block">Search</span>
          </div>
        </Link>

        <Link to="/notifications">
          <div className="nav-container">
            <div className="relative">
              <i className="im im-bell nav-i"></i>
              <span className="bg-red-500 rounded-full px-2 text-sm text-white absolute left-6 lg:top-2 lg:left-8">
                {count.n > 0 && count.n}
              </span>
            </div>
            <span className="hidden lg:inline-block">Notifications</span>
          </div>
        </Link>

        <Link to="/chats">
          <div className="nav-container">
            <div className="relative">
              <i className="im im-mail nav-i"></i>
              <span className="bg-red-500 rounded-full px-2 text-sm text-white absolute left-6 lg:top-2 lg:left-8">
                {count.m > 0 && count.m}
              </span>
            </div>
            <span className="hidden lg:inline-block">Messages</span>
          </div>
        </Link>
        <Link to={`/profile/${userContext.user._id}`}>
          <div className="nav-container">
            <i className="im im-user-circle nav-i"></i>
            <span className="hidden lg:inline-block">Profile</span>
          </div>
        </Link>
        <div onClick={signoutHandler}>
          <div className="nav-container cursor-pointer">
            <i className="im im-sign-out nav-i"></i>
            <span className="hidden lg:inline-block">Sign out</span>
          </div>
        </div>
      </div>
      <div className="hidden lg:block shadow-xl p-2 rounded-xl bg-white">
        <p className="text-lg text-gray-700 py-2 font-bold">Who to follow</p>
        <FollowSuggestion></FollowSuggestion>
      </div>
    </nav>
  );
};

export default Navbar;
