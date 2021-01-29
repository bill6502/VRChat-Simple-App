import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { AuthUserData } from "../API/types";
import { getUserData } from "../API/VRChat";
import { Loading } from "./Loading";
import "../style/UserData.css";

export const UserData = () => {
  const Auth = useSelector<Tstate, string>((state) => state.Auth);
  // const Token = useSelector<Tstate, string>((state) => state.Token);
  const AuthUserData = useSelector<Tstate, AuthUserData | null>(
    (state) => state.AuthUserData,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const GetData = async () => {
      const UserData = await getUserData(Auth);

      // if (UserData !== null)
      dispatch({ type: "AuthUserData", payload: UserData });
    };

    GetData();
  }, []);

  if (!AuthUserData) {
    return (
      <div className="userData">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="userData">
        <img src={AuthUserData?.currentAvatarImageUrl} alt="" />
        <table>
          <tr>
            <td>Name :</td>
            <td>{AuthUserData?.username}</td>
          </tr>
          <tr>
            <td>Display :</td>
            <td>{AuthUserData?.displayName}</td>
          </tr>
          {AuthUserData?.bio !== "" && (
            <tr>
              <td>Bio :</td>
              <td>{AuthUserData?.bio}</td>
            </tr>
          )}
          {AuthUserData?.bioLinks.length !== 0 && (
            <tr>
              <td>Bio Links :</td>
              <td>{AuthUserData?.bioLinks}</td>
            </tr>
          )}
          <tr>
            <td>Friends :</td>
            <td>{AuthUserData?.friends.length}</td>
          </tr>
          <tr>
            <td>Online Friends :</td>
            <td>{AuthUserData?.onlineFriends.length}</td>
          </tr>
        </table>
      </div>
    );
  }
};
