import { useReducer } from "react";
import UserContext from "./UserContext";

const defaultUser = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || {},
  isSignedIn: localStorage.getItem("token") ? true : false,
  signIn: (token, user) => {},
  signOut: () => {},
  reInitUser: (user) => {}

};



const getNewState = (state, token, user, isSignedIn) => {
  const newState = { ...state };

  newState.token = token;
  newState.user = user;
  newState.isSignedIn = isSignedIn;

  return newState;
};
const reducer = (state, action) => {
  if (action.type === "SIGNIN") {
    return getNewState(state, action.token, action.user, true);
  }

  if (action.type === "SIGNOUT") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return getNewState(state, "", {}, false);
  }

  if (action.type === "INIT") {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    return getNewState(state, token, user, true);
  }

  if(action.type === "REINIT"){
    const newState = getNewState(state, state.token, action.user, true);
    localStorage.setItem("user", JSON.stringify(newState.user))
    return newState;

  }
};

const UserProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, defaultUser);

  const signInHandler = (token, user) => {
    dispatcher({ type: "SIGNIN", token: token, user: user });
  };

  const signOutHandler = () => {
    dispatcher({ type: "SIGNOUT" });
  };

  const initHandler = () => {
    dispatcher({ type: "INIT" });
  };

  const reinitUserHandler = (user) => {
    dispatcher({type: "REINIT", user: user})
  }

  const userContext = {
    token: state.token,
    user: state.user,
    isSignedIn: state.isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
    init: initHandler,
    reInitUser: reinitUserHandler
  };
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
