import React from "react";
import "../style/LoadingRing.css";

export const LoadingRing = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
