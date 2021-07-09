import { useEffect, useRef, useState } from "react";
import { fetchComment, sendComment } from "../api/commentApi";
import Comment from "./Comment";

const CommentInput = ({ postId, limit }) => {
  const commentRef = useRef();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const commentChangehandler = (e) => {
    if (commentRef.current.value.trim().length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const postComment = async () => {
    sendComment(postId, commentRef.current.value)
      .then((res) => {
        console.log(res);
        setComments([...comments, res]);
        commentRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchComment(postId, limit)
      .then((res) => setComments(res))
      .catch((err) => console.log(err));
  }, [postId, limit]);

  return (
    <div onClick={(e) => e.stopPropagation()} >
      <div>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment}></Comment>
          ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <input
          type="text"
          name=""
          id=""
          className="border focus:outline-none w-full p-4 rounded-xl"
          placeholder="Write your comment here..."
          onChange={commentChangehandler}
          ref={commentRef}
        />
        <button
          className="bg-twitter_blue  disabled:bg-twitter_blue-light text-white border rounded-xl px-4 md:px-6 focus:outline-none"
          disabled={buttonDisabled}
          onClick={postComment}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
