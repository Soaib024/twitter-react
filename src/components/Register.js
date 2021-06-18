import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import isEmail from "validator/es/lib/isEmail";
import { register } from "../api/authApi";
import UserContext from "./../store/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
  const [error, setError] = useState(undefined);
  const userContext = useContext(UserContext);

  const history = useHistory();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setError(undefined);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
    setError(undefined);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(undefined);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError(undefined);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassord(e.target.value);
    setError(undefined);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Your Email is invalid");
    }

    if (username.trim().length < 4) {
      setError("Username should be atleast 4 characters long");
    }

    if (password.length < 6) {
      setError("Password should be atleast 6 characters long");
    }

    if (password !== confirmPassword) {
      setError("Your password and confirm password does not matches");
    }

    if (!error) {
      const response = await register({ email, username, password, name });
      if (response.user) {
        userContext.signIn(response.token, response.user);
        history.push("/home");
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <div className="max-w-24">
      <p className="text-xl text-center mb-4">Login</p>
      {error && <p className="text-center py-2 text-sm">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={registerHandler}>
        <input
          type="text"
          className="input"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        ></input>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        ></input>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
        ></input>
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={onPasswordChange}
        ></input>
        <input
          type="password"
          className="input"
          placeholder="Confirm password"
          onChange={onConfirmPasswordChange}
        ></input>
        <button className="form-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
