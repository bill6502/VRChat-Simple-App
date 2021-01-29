import { AuthUserData, OtherUserData, avatarInfo, Auth } from "./types";
// import {Response} from "fetch-jsonp";

// const GetOptions = (Auth: string) => {
//   let myHeaders = new Headers();
//   myHeaders.append("Authorization", `Basic ${Auth}`);
//   myHeaders.append("apiKey", "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26");
//   myHeaders.append("Access-Control-Allow-Origin", "api.vrchat.cloud");
//   myHeaders.append("Access-Control-Allow-Credentials", "true");

//   let option: RequestInit = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   return option;
// };

export const AuthUser = (Auth: string) => {
  const data = fetch(
    "https://cors-anywhere.herokuapp.com/https://api.vrchat.cloud/api/1/auth",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Auth}`,
        apiKey: "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
        "Access-Control-Allow-Origin": "*",
        // credentials: "same-origin",
      },
      redirect: "follow",
    },
  )
    .then((response) => response.json())
    .then((data) => data as Auth)
    .catch((error) => null);

  return data;
};

//get Data if you can login in
export const getUserData = (Auth: string) => {
  const data = fetch(
    "https://cors-anywhere.herokuapp.com/https://api.vrchat.cloud/api/1/auth/user",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Auth}`,
        apiKey: "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
        "Access-Control-Allow-Origin": "*",
        // credentials: "same-origin",
      },
      redirect: "follow",
    },
  )
    .then((response) => response.json())
    .then((data) => data as AuthUserData)
    .catch((error) => null);

  return data;
};

export const getOtherUserData = (Auth: string, ID: string) => {
  const data = fetch(
    `https://cors-anywhere.herokuapp.com/https://api.vrchat.cloud/api/1/users/${ID}?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26&userid=${ID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Auth}`,
        apiKey: "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
        "Access-Control-Allow-Origin": "*",
        // credentials: "same-origin",
      },
      redirect: "follow",
    },
  )
    .then((response) => response.json())
    .then((data) => data as OtherUserData)
    .catch((error) => null);

  return data;
};

export const getAvatarInfo = (Auth: string) => {
  const Data = fetch(
    "https://cors-anywhere.herokuapp.com/https://vrchat.com/api/1/avatars?releaseStatus=all&sort=updated&order=descending&user=me&offset=0&n=20&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Auth}`,
        "Access-Control-Allow-Origin": "*",
      },
      redirect: "manual",
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) return null;
      return data as Array<avatarInfo>;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return Data;
};

export const changeAvatar = (Auth: string, AvatarID: string) => {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.vrchat.cloud/api/1/avatars/${AvatarID}/select?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Auth}`,
        apiKey: "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
        // credentials: "same-origin",
      },
      redirect: "follow",
    },
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
