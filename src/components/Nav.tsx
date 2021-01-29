import React from "react";
import { useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { AuthUserData } from "../API/types";
import "../style/Nav.css";

export const Nav = () => {
  const AuthUserData = useSelector<Tstate, AuthUserData | null>(
    (state) => state.AuthUserData,
  );

  return (
    <div className="nav">
      <a href="https://hello.vrchat.com/" target="_blank">
        VRChat
      </a>
      <div className="UserIconAndName">
        <p>{AuthUserData?.displayName}</p>
        <img
          src={
            AuthUserData?.userIcon !== ""
              ? AuthUserData?.userIcon
              : AuthUserData?.currentAvatarImageUrl
          }
          alt=""
        />
      </div>
    </div>
  );
};
