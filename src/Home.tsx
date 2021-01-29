import React from "react";
import { Nav } from "./components/Nav";
import { SelectPage } from "./components/SelectPage";
import "./style/Home.css";

export const Home = () => {
  return (
    <div className="home">
      <Nav />
      <SelectPage />
    </div>
  );
};
