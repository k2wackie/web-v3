import React from "react";
import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";

const Header = () => {
  return (
    <div className="Header">
      <Link className="logo link" to="/">
        ACKIE PJT
      </Link>
      <MainMenu />
    </div>
  );
};

export default React.memo(Header);
