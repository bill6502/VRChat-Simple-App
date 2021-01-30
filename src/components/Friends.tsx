import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { Friend } from "./Friend";
import { getUserData } from "../API/VRChat";
import { AuthUserData } from "../API/types";
import "../style/Friends.css";

export const Friends = () => {
  const MyData = useSelector<Tstate, AuthUserData | null>(
    (state) => state.AuthUserData,
  );
  const Auth = useSelector<Tstate, string>((state) => state.Auth);

  const [Friends, setFriends] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setFriends(() => (MyData ? MyData?.onlineFriends : []));
  }, []);

  const updateMyData = async () => {
    const data = await getUserData(Auth);

    dispatch({ type: "AuthUserData", payload: data });

    if (data) setFriends(() => data.onlineFriends);
  };

  return (
    <>
      <button className="updateButton" onClick={updateMyData}>
        Update
      </button>
      <div className={"friends" + (Friend.length === 0 ? " QAQ" : "")}>
        {Friend.length > 0
          ? Friends.map((friend) => <Friend key={friend} ID={friend} />)
          : "QAQ"}
      </div>
    </>
  );
};
