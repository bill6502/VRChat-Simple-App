import React, { useState } from "react";
import "../style/avatar.css";

type props = {
  name: string;
  imageUrl: string;
  id: string;
  releaseStatus: string;
  setInputCallback: Function;
};
export const Avatar = ({
  imageUrl,
  name,
  releaseStatus,
  id,
  setInputCallback,
}: props) => {
  const copyLink = () => {
    navigator.clipboard.writeText(id);
    setInputCallback(id);
  };

  return (
    <div className="avatar">
      <img onClick={copyLink} src={imageUrl} title="Click to copy AvatarId" />
      {
        <div className="detail">
          <table>
            <tr>
              <td>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>State:</td>
              <td>{releaseStatus}</td>
            </tr>
          </table>
        </div>
      }
    </div>
  );
};
