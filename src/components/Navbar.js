import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../store/UserContext";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const signoutHandler = () => {
    userContext.signOut();
    history.push("/");
  };
  return (
    <nav className="flex shadow-lg rounded-xl justify-between lg:flex-col lg:justify-start lg:w-2/12 lg:h-screen lg:mr-3 lg:pr-3">
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
          <i className="im im-bell nav-i"></i>
          <span className="hidden lg:inline-block">Notifications</span>
        </div>
      </Link>

      <Link to="/messages">
        <div className="nav-container">
          <i className="im im-mail nav-i"></i>
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
        <div className="nav-container">
          <i className="im im-sign-out nav-i"></i>
          <span className="hidden lg:inline-block">Sign out</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
