import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotificationComp from "../components/NotificationComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAllNotifications, markAllAsRead } from "./../api/notificationsApi";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getAllNotifications().then((results) => setNotifications(results));
  }, [notifications]);
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <div className="main">
        <div className="flex justify-between border-b text-xl p-2">
          <p>Notifications</p>
          {/* <p className="text-gray-400" onClick={() => {markAllAsRead(); setNotifications([...notifications])}}>
            <FontAwesomeIcon icon={faCheckDouble}></FontAwesomeIcon>
          </p> */}
        </div>
        <div>
          {notifications.map((notification) => (
            <NotificationComp
              notification={notification}
              key={notification._id}
            ></NotificationComp>
          ))}
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
  );
};

export default Notification;
