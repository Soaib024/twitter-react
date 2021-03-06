import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { fetchTweet } from "../api/postApi";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";


const PostPage = () => {
  const { postId} = useParams();
  const [post, setPost] = useState(undefined);
  useEffect(() => {
    fetchTweet(postId)
    .then(res => {
      setPost(res)
    })
  },[])

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main space-y-12">
        {post &&<Post post={post} commentLimit=" "></Post>}
      </main>
      <Sidebar></Sidebar>
    </div>
  );
};

export default PostPage;
