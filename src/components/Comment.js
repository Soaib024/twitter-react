
import { Link } from "react-router-dom";
import { API } from "./../backend";
import { timeDifference } from "./../helpers/helper";
const Comment = ({ comment }) => {
  return (
    <div className="flex my-4">
      <div className=" mr-4 w-2/12 sm:w-1/12">
        <img
          src={`${API}/images/profile/${comment.user.profile}`}
          alt="profile"
          className="rounded-full w-10"
        />
      </div>
      <div className="w-10/12 sm:w-11/12">
        <span className="bg-gray-200 p-2 rounded-lg text-gray-700 text-sm inline-block">
          <p>{comment.comment}</p>
        </span>
        <div className="text-xs text-gray-400">
          <Link to={`/profile/${comment.user._id}`}><span>@{comment.user.username} </span></Link>
          <span>{timeDifference(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
