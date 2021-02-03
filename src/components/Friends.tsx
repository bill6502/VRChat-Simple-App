import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { Friend } from "./Friend";
import { getUserData } from "../API/VRChat";
import { AuthUserData } from "../API/types";
import "../style/Friends.css";
import { LoadingRing } from "./LoadingRing";

export const Friends = () => {
  const MyData = useSelector<Tstate, AuthUserData | null>(
    (state) => state.AuthUserData,
  );
  const Auth = useSelector<Tstate, string>((state) => state.Auth);
  const [Friends, setFriends] = useState<string[]>([]);
  const [waitUpdate, setWaitUpdate] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFriends(() => (MyData ? MyData?.onlineFriends : []));
  }, []);

  const updateMyData = async () => {
    setWaitUpdate(true);
    const data = await getUserData(Auth);
    setWaitUpdate(false);

    dispatch({ type: "AuthUserData", payload: data });

    if (data) setFriends(() => data.onlineFriends);
  };

  // console.log("FriendsArray", Friends);
  return (
    <>
      <div className="updateButton">
        <button onClick={updateMyData} disabled={waitUpdate}>
          Update
          {waitUpdate && (
            <div className="loading">
              <LoadingRing />
            </div>
          )}
        </button>
      </div>
      <div className={"friends" + (Friends.length === 0 ? " QAQ" : "")}>
        {Friends.length > 0
          ? Friends.map((friend) => <Friend key={friend} UserID={friend} />)
          : "QAQ"}
      </div>
    </>
  );
};
