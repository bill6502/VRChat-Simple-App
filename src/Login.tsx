import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthUser } from "./API/VRChat";
import "./style/Login.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const respone = await AuthUser(btoa(`${username}:${password}`));

    if (respone?.ok) {
      console.log(" login successed");

      //update Auth&AuthUserData to store(Redux)
      dispatch({ type: "Auth", payload: btoa(`${username}:${password}`) });

      history.push("/");
    } else setIsLogin(false);
  };

  return (
    <div className="login">
      <form className="form">
        <h1>VRChat</h1>
        <div className="input">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsLogin(true);
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsLogin(true);
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        {!isLogin && (
          <div className="Error">
            <img
              src="https://media1.giphy.com/media/yx400dIdkwWdsCgWYp/source.gif"
              alt=""
            />
            <h2>ERROR!</h2>
          </div>
        )}
        <div className="Button">
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
