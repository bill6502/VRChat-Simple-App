import React from "react";
import { useSelector } from "react-redux";
import { AuthUserData } from "../API/types";
import { Tstate } from "../Store/Reducer";
import { Friend } from "./Friend";
import "../style/Friends.css";

export const Friends = () => {
  const MyData = useSelector<Tstate, AuthUserData | null>(
    (state) => state.AuthUserData,
  );

  return (
    <div className="friends">
      {MyData?.onlineFriends.map((friend) => (
        <Friend key={friend} ID={friend} />
      ))}
    </div>
  );
};
