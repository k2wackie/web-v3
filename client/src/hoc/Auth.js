import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = (SpecificComponent, option, adminRoute = null) => {
  //option
  //null: 아무나 출입이 가능한 페이지
  //true: 로그인한 유저만 출입이 가능한 페이지
  //false: 로그인한 유저는 출입 불가능한 페이지
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const AuthenticationCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
      fetch("/api/auth")
        .then((res) => res.json())
        .then((res) => {
          const userID = res.user_ID;
          const isAuth = res.isAuth;
          setUser(userID);
          setIsAuth(isAuth);
          // console.log(res, "isauth:", res.isAuth, option, user, isAuth);
          if (!res.isAuth) {
            navigate("/login", { replace: true });
            if (option) {
              navigate("/login", { replace: true });
            }
          } else {
            if (adminRoute && !res.isAdmin) {
              navigate("/", { replace: true });
            } else {
              if (option === false) {
                navigate("/", { replace: true });
              }
            }
          }
        });
    }, []);
    return <SpecificComponent user={user} isAuth={isAuth} />;
  };

  return AuthenticationCheck;
};

export default Auth;
