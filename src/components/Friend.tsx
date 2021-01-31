import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { getOtherUserData } from "../API/VRChat";
import { OtherUserData } from "../API/types";
import { Loading } from "./Loading";
import "../style/Friend.css";

type props = {
  UserID: string;
};

export const Friend = ({ UserID }: props) => {
  const [UserData, SetUserData] = useState<OtherUserData | null>(null);
  // const Auth = useSelector<Tstate, string>((state) => state.Auth);
  const Auth = useSelector<Tstate, string>((state) => state.Auth);

  useEffect(() => {
    const FetchUserData = async () => {
      const data = await getOtherUserData(Auth, UserID);
      // console.log(data, Auth);
      SetUserData(() => data);
    };

    FetchUserData();
  }, []);

  if (!UserData) {
    return (
      <div className="friend">
        <Loading />
      </div>
    );
  }

  return (
    <div className="friend">
      <img
        src={
          UserData?.userIcon !== ""
            ? UserData.userIcon
            : UserData?.currentAvatarImageUrl
        }
      />
      <div className="detail">
        <table>
          <tr>
            <td>Name:</td>
            <td>{UserData.username}</td>
          </tr>
          <tr>
            <td>Display:</td>
            <td>{UserData.displayName}</td>
          </tr>
          <tr>
            <td>State:</td>
            <td>{UserData.status}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
