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
      <Link className="login link" to="/login">
        로그인
      </Link>
    </div>
  );
};

export default React.memo(Header);
