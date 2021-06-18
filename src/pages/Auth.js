import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";


const Auth = () => {
  const [showLoginpage, setShowLoginpage] = useState(true);
  const togglePage = () => {
    setShowLoginpage(!showLoginpage);
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center text-gray-500  space-y-4 sm:flex-row sm:justify-around">
      <div className="">
        <i className="im im-twitter text-twitter_blue text-9xl sm:text-xxl"></i>
      </div>
      <div className="text-sm">
        {showLoginpage && <Login></Login>}
        {showLoginpage && (
          <p onClick={togglePage} className="mt-4 text-center link">
            New to twitter? Create an account here
          </p>
        )}
        {!showLoginpage && <Register></Register>}
        {!showLoginpage && (
          <p
            onClick={togglePage}
            className="mt-4 text-center link text-twitter_blue"
          >
            Already has an account? Login here
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
