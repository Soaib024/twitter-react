import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { fetchTweets } from "../api/postApi";

import NewsFeed from "../components/NewsFeed";
import { useHistory } from "react-router-dom";
import UserContext from "../store/UserContext";
import TweetForm from "../components/TweetForm";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const [posts, setPosts] = useState([]);

  const userContext = useContext(UserContext);

  const history = useHistory();


  useEffect(() => {
    fetchTweets('followingOnly=true').then((res) => {
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
      <main className="main">
        <div className="mb-3 px-2">
          <p className="my-3 ">Home</p>
          <TweetForm
            profile={userContext.user.profile}
            posts={posts}
            setPosts={setPosts}
            placeholder="What's happening?"
          ></TweetForm>
        </div>

        <NewsFeed posts={posts}></NewsFeed>
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default Home;
