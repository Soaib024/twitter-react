import { useEffect, useState, useContext } from "react";
import { followSuggestion } from "./../api/userApi";
import User from "./User";
import UserContext from './../store/UserContext';

const FollowSuggestion = () => {
    const userContext = useContext(UserContext)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    followSuggestion().then((results) => setUsers(results));
  }, [userContext.user._id]);
  return (
    <div className="mt-6">
      {users.map((user) => (
        <User user={user} small={true} key={user._id}></User>
      ))}
    </div>
  );
};

export default FollowSuggestion;
