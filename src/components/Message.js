import { timeDifference } from "./../helpers/helper";
const Message = ({ message, loggedInUser }) => {
  const othersMessage = loggedInUser !== message.sender._id;

  return (
    <div className={`flex mt-4 ${!othersMessage && "flex-row-reverse"}`}>
      <div className="max-w-lg mb-2">
        <div
          className={`rounded-lg px-2 py-1 ${
            !othersMessage
              ? "bg-twitter_blue text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          <p className="">{message.content}</p>
        </div>
        <div className="text-xs  text-gray-400">
         <div> @{message.sender.username}{" "}</div>
          <div>{timeDifference(message.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
