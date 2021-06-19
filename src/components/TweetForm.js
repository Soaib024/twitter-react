import { useRef, useState } from "react";
import { postTweet } from "../api/postApi";
import { API } from "../backend";

const TweetForm = ({ profilePic, posts, setPosts, replyTo, placeholder }) => {
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
  });

  const contentRef = useRef();
  const fileRef = useRef();

  const [tweetbuttonDisable, setTweetButtonDisabled] = useState(true);

  const textHandler = (e) => {
    const text = e.target.value.trim();
    console.log(contentRef.current.value)
  
    if (text.length === 0) {
      setTweetButtonDisabled(true);
    } else {
      setTweetButtonDisabled(false);
      setNewPost({ ...newPost, content: text });
    }
  };

  const imageHandler = (e) => {
    console.log(fileRef.current.files[0])
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const tweetHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", newPost.content);
    formData.append("image", newPost.image);
    formData.append("replyTo", replyTo);
    postTweet(formData)
      .then((res) => {
        console.log(res);
        setPosts([res.post, ...posts]);
        setNewPost({ ...newPost, content: "", image: "" });
        setTweetButtonDisabled(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex space-x-2 shadow-lg p-2 w-full rounded-xl">
      <img
        src={`${API}/uploads/images/profilePic/${profilePic}`}
        alt="profile"
        className="rounded-full w-12 h-12"
      />
      <form
        className="flex-1"
        onSubmit={tweetHandler}
        encType="multipart/form-data"
      >
        <textarea
          placeholder={placeholder}
          className="resize-none focus:outline-none p-2 w-full overflow-hidden "
          onChange={textHandler}
          ref={contentRef}
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
              ref={fileRef}
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
  );
};

export default TweetForm;
