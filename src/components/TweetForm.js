import { useEffect,  useRef,  useState } from "react";
import { postTweet } from "../api/postApi";
import { API } from "../backend";

const TweetForm = ({ profilePic, posts, setPosts, replyTo, placeholder }) => {
  const [tweetbuttonDisable, setTweetButtonDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [content, setContent] = useState();

  const contentRef = useRef();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const imageHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const textHandler = (e) => {
    const text = e.target.value.trim();
    if (text.length === 0) {
      setTweetButtonDisabled(true);
    } else {
      setTweetButtonDisabled(false);
      setContent(text)
    }
  };

  const tweetHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", selectedFile);
    formData.append("replyTo", replyTo);
    postTweet(formData)
      .then((res) => {
        setSelectedFile(undefined)
        contentRef.current.value  =""
        setPosts([res.post, ...posts]);
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
          <div className="flex space-x-4">
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
            {selectedFile &&  <img src={preview}  className="w-20 rounded-lg shadow-lg" alt="preview" /> }
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
