import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tstate } from "../Store/Reducer";
import { avatarInfo } from "../API/types";
import { changeAvatar, getAvatarInfo } from "../API/VRChat";
import { Avatar } from "./Avatar";
import { Loading } from "./Loading";
import "../style/Avatars.css";

export const Avatars = () => {
  const [input, setInput] = useState<string>("");
  const [avatarInfos, setAvatarInfos] = useState<avatarInfo[] | null>(null);
  const Auth = useSelector<Tstate, string>((state) => state.Auth);

  useEffect(() => {
    const getDatas = async () => {
      const data = await getAvatarInfo(Auth);

      if (data) {
        setAvatarInfos(() => data);
      }
    };

    getDatas();
  }, []);

  const handleButton = () => {
    let AvatarID = "avtr_d720f33e-ed8d-4b1e-8d74-9735e17c87d5";
    if (input.length !== 0) {
      AvatarID = input;
    }
    changeAvatar(Auth, AvatarID);
  };

  if (!avatarInfos)
    return (
      <div className="avatars">
        <div className="change">
          <input
            type="text"
            placeholder="Enter AvatarId. Default:Robot"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleButton}>Change Avatar</button>
        </div>
        <Loading />
      </div>
    );

  return (
    <div className="avatars">
      <div className="change">
        <input
          type="text"
          placeholder="Enter AvatarId. Default:Robot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleButton}>Change Avatar</button>
      </div>
      <p>Click picture to copy AvatarId</p>
      {/* <div className="listOutside"> */}
      <div className="avatarList">
        {avatarInfos &&
          avatarInfos!.map((item) => (
            <Avatar
              key={item.name}
              name={item.name}
              id={item.id}
              imageUrl={item.imageUrl}
              releaseStatus={item.releaseStatus}
              setInputCallback={setInput}
            />
          ))}
      </div>
    </div>
    // {/* </div> */}
  );
};
