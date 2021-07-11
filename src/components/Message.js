import { timeDifference } from "./../helpers/helper";
const Message = ({ message, loggedInUser }) => {
  const othersMessage = loggedInUser !== message.sender._id;

  return (
    <div className={`flex ${!othersMessage ? "justify-end" : ""}`}>
      <div className="max-w-lg">
        <div
          className={`rounded-lg flex  px-2 py-1 ${
            !othersMessage
              ? "bg-twitter_blue text-white justify-end"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {message.content}
        </div>
        <div
          className={`text-tiny text-gray-400 flex ${
            !othersMessage ? "justify-end" : ""
          }`}
        >
          @{message.sender.username} {timeDifference(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
