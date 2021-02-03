import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthUser } from "./API/VRChat";
import { encode } from "js-base64";
import { LoadingRing } from "./components/LoadingRing";
import "./style/Login.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [waitLogin, setWaitLogin] = useState<boolean>(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setWaitLogin(true);
    const respone = await AuthUser(encode(`${username}:${password}`));

    if (respone?.ok) {
      //update Auth&AuthUserData to store(Redux)
      dispatch({ type: "Auth", payload: encode(`${username}:${password}`) });

      history.push("/");
    } else {
      setWaitLogin(false);
      setIsLogin(false);
    }
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
          <button
            type="submit"
            onClick={handleLogin}
            disabled={
              username.length === 0 || password.length === 0 || waitLogin
            }>
            Login
            {waitLogin && (
              <div className="loading">
                <LoadingRing />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
