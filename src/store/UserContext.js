import { createContext } from "react";

const UserContext = createContext({
  token: "",
  user: {},
  isSignedin: false,
  signIn: (user) => {},
  signOut: () => {},
  updateUser: () => {},
});

export default UserContext;
