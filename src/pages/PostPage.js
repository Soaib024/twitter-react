import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { fetchPost } from "../api/postApi";
import Post from "../components/Post";

const PostPage = () => {
  const { postId} = useParams();
  const [parentPost, setParentPost] = useState(undefined);
  const [currentPost, setCurrentPost] = useState(undefined);
  const [childPost, setChildPost] = useState([]);

  useEffect(() => {
    fetchPost(postId)
    .then(res => {
        
        setParentPost(res.replyTo || undefined)
        setCurrentPost(res.postData)
        setChildPost(res.replies || [])
    })
  }, [postId ]);


  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main space-y-12 py-4">
        {/* <div className="shadow-lg rounded-lg">{parentPost && <Post post={parentPost}></Post>}</div> */}
        <div  className="shadow-lg rounded-xl">
          {currentPost && <Post post={currentPost}></Post>}
        </div>
        <div className="shadow-lg rounded-xl">
          {childPost.map((post) => (
            <Post post={post} key={post._id}></Post>
          ))}
        </div>
      </main>
      <div className="right-col">&nbsp;</div>
    </div>
  );
};

export default PostPage;
