import { createContext } from "react";

const UserContext = createContext({
  token: "",
  user: {},
  isSignedIn: false,
  signIn: (user) => {},
  signOut: () => {},
  updateUser: () => {},
});

export default UserContext;
