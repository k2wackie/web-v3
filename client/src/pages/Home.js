import React from "react";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import BulletinList from "../components/BulletinList";

const Home = ({ user, isAuth }) => {
  // console.log("home", user, isAuth);
  return (
    <div className="HomePage">
      <Header user={user} isAuth={isAuth} />
      <div className="contents">
        <SideMenu />
        <div className="bulletin">
          <BulletinList />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
