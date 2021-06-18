import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import profilePic from "../images/profilePic.jpeg";
import { fetchTweets, postTweet } from "../api/postApi";

import NewsFeed from "../components/NewsFeed";
import { useHistory } from "react-router-dom";
import UserContext from "../store/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
  });

  const [tweetbuttonDisable, setTweetButtonDisabled] = useState(true);
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if(!userContext.isSignedIn){
      history.push('/')
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

  const textHandler = (e) => {
    const text = e.target.value.trim();
    if (text.length === 0) {
      setTweetButtonDisabled(true);
    } else {
      setTweetButtonDisabled(false);
      setNewPost({ ...newPost, content: text });
    }
  };

  const imageHandler = (e) => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const tweetHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", newPost.content);
    formData.append("image", newPost.image);
    postTweet(formData)
      .then((res) => {
        setPosts([res.post, ...posts]);
        setNewPost({
          content: "",
          image: "",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="lg:w-7/12 lg:overflow-y-scroll">
        <div className="mb-3">
          <p className="my-3 ">Home</p>
          <div className="flex space-x-2 shadow-lg p-2 w-full rounded-xl">
            <img
              src={profilePic}
              alt="profile"
              className="rounded-full w-12 h-12"
            />
            <form
              className="flex-1"
              onSubmit={tweetHandler}
              encType="multipart/form-data"
            >
              <textarea
                placeholder="What's happening?"
                className="resize-none focus:outline-none p-2 w-full overflow-hidden "
                onChange={textHandler}
              ></textarea>
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="image-selector">
                    <i className="im im-picture-o text-twitter_blue"></i>
                  </label>
                  <input
                    id="image-selector"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={imageHandler}
                    className="hidden"
                  ></input>
                </div>

                <button
                  className="bg-twitter_blue  disabled:bg-twitter_blue-light px-5 py-2 text-white rounded-md shadow-md "
                  disabled={tweetbuttonDisable}
                  onClick={tweetHandler}
                >
                  tweet
                </button>
              </div>
            </form>
          </div>
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
