import { API } from "./../backend";
import { useHistory } from "react-router-dom";
import { markAsRead } from "../api/notificationsApi";
const NotificationComp = ({ notification }) => {
  let text = `${notification.userFrom.name}`;
  let link = "";
  if (notification.notificationType === "follow") {
    text += " followed you";
    link = `/profile/${notification.entityId}`;
  }
  if (notification.notificationType === "comment") {
    text += " commented on your post";
    link = `/post/${notification.entityId}`;
  }
  if (notification.notificationType === "like") {
    text += " liked your post";
    link = `/post/${notification.entityId}`;
  }
  if (notification.notificationType === "retweet") {
    text += " retweeted your post";
    link = `/post/${notification.entityId}`;
  }
  const history = useHistory();
  return (
    <div
      className={`flex items-center space-x-2 p-2 border-b ${
        !notification.opened && "bg-blue-50"
      }`}
      onClick={() => {
        markAsRead(notification._id)
        history.push(link);
      }}
    >
      <img
        src={`${API}/uploads/images/profile/${notification.userFrom.profile}`}
        alt=""
        className="w-10 rounded-full"
      />
      <p>{text}</p>
    </div>
  );
};

export default NotificationComp;
