import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";

const Header = ({ user, isAuth }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const req = {
      user,
    };
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.logoutSuccess) {
          navigate("/login");
        } else {
          alert("로그아웃을 실패 했습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  const loginHandler = () => {
    navigate("/login");
  };

  // console.log("head", user, isAuth);
  return (
    <div className="Header">
      <Link className="logo link" to="/">
        ACKIE PJT
      </Link>
      <MainMenu />
      {isAuth ? (
        <button className="logout" onClick={logoutHandler}>
          로그아웃
        </button>
      ) : (
        <button className="login" onClick={loginHandler}>
          로그인
        </button>
      )}
    </div>
  );
};

export default React.memo(Header);
