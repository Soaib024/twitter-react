import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { login } from "../api/authApi";
import UserContext from "./../store/UserContext";

const Login = () => {
  const [email, setEmail] = useState("soaib024@gmail.com");
  const [password, setPassword] = useState("2054314");
  const [error, setError] = useState(undefined);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setError(undefined);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError(undefined);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!error) {
      const response = await login({ email, password });
      if (response.user) {
        setError("");
        userContext.signIn(response.token, response.user);
        history.push("/home");
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <div className="">
      <p className="text-xl text-center mb-4">Login</p>
      {error && <p className="text-center text-sm py-2">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={loginHandler}>
        <input
          type="text"
          className="input"
          placeholder="Email or Username"
          name="email"
          onChange={onEmailChange}
          value={email}
        ></input>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          onChange={onPasswordChange}
         value={password}
        ></input>
        <button className="form-button w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
