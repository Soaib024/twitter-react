import { useEffect, useState } from "react";
import { fetchTweets } from "../api/postApi";
import Post from "./Post";
const UserPosts = ({userId}) => {
  const [tab, selectedTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let queryString = `postedBy=${userId}&userId=${userId}`;
    if (tab === 1) {
      queryString = `liked=${userId}&userId=${userId}`;
    }

    fetchTweets(queryString)
      .then((res) => setPosts(res.posts))
      .catch((err) => console.error(err));
  }, [tab, userId]);
  return (
    <div className="mt-16">
      <div className="flex border-b justify-between text-center">
        <div
          className={`flex-grow ${
            tab === 0 ? "border-b-2 border-twitter_blue p-2" : ""
          }`}
          onClick={() => selectedTab(0)}
        >
          Posts
        </div>
        <div
          className={`flex-grow ${
            tab === 1 ? "border-b-2 border-twitter_blue p-2" : ""
          }`}
          onClick={() => selectedTab(1)}
        >
          Liked
        </div>

      </div>

      <div>
        {posts && posts.map((post) => <Post post={post} key={post._id}></Post>)}
      </div>
    </div>
  );
};

export default UserPosts;
