import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { fetchTweets } from "../api/postApi";

import NewsFeed from "../components/NewsFeed";
import { useHistory } from "react-router-dom";
import UserContext from "../store/UserContext";
import TweetForm from "../components/TweetForm";


const Home = () => {
  const [posts, setPosts] = useState([]);

  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userContext.isSignedIn) {
      history.push("/");
    }
    fetchTweets().then((res) => {
      if (res.posts) {
        setPosts(res.posts);
      }
    });
    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="lg:w-7/12 lg:overflow-y-scroll">
        <div className="mb-3">
          <p className="my-3 ">Home</p>
          <TweetForm
            profilePic={userContext.user.profilePic}
            posts={posts}
            setPosts={setPosts}
            placeholder="What's happening?"
          ></TweetForm>
        </div>

        <NewsFeed posts={posts}></NewsFeed>
      </main>
      <div className="hidden sm:hidden md:hidden lg:w-3/12  lg:h-screen lg:shadow-lg lg:ml-3 lg:pl-3">
        &nbsp;
      </div>
    </div>
  );
};

export default Home;
