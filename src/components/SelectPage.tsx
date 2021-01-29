import React, { useState, useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { UserData } from "./UserData";
import { Friends } from "./Friends";
import { Avatars } from "./Avatars";
import GradeIcon from "@material-ui/icons/Grade";
import "../style/SelectPage.css";

export const SelectPage = () => {
  const [select, setSelect] = useState<number>(0);
  const [fontSize, setFontSize] = useState({ fontSize: 75 });

  useEffect(() => {
    const updateWindowDimensions = () => {
      if (window.innerWidth <= 800) {
        setFontSize({ fontSize: 40 });
      } else {
        setFontSize({ fontSize: 75 });
      }
    };

    window.addEventListener("resize", updateWindowDimensions);
    if (window.innerWidth <= 800) {
      setFontSize({ fontSize: 40 });
    } else {
      setFontSize({ fontSize: 75 });
    }

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const selectPage = () => {
    if (select === 0) return <UserData />;
    if (select === 1) return <Friends />;
    if (select === 2) return <Avatars />;
  };

  return (
    <div className="selectPage">
      <div className="selects">
        <button
          style={select === 0 ? { color: "#ffffff" } : {}}
          onClick={() => setSelect(() => 0)}>
          <PersonIcon style={fontSize} />
          <p>User</p>
        </button>
        <button
          style={select === 1 ? { color: "#ffffff" } : {}}
          onClick={() => setSelect(() => 1)}>
          <PeopleAltIcon style={fontSize} />
          <p>Friends</p>
        </button>
        <button
          style={select === 2 ? { color: "#ffffff" } : {}}
          onClick={() => setSelect(() => 2)}>
          <GradeIcon style={fontSize} />
          <p>Avatars</p>
        </button>
      </div>
      <div className="selectedPage">{selectPage()}</div>
    </div>
  );
};
