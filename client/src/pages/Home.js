import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import BulletinList from "../components/BulletinList";

const Home = ({ data }) => {
  return (
    <div className="Home">
      <Header />
      <div className="contents">
        <SideMenu />
        <div className="bulletin">
          <BulletinList data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
