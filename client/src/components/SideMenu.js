import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="sideMenu">
      <Link className="link" to="/new">
        μ κΈ μμ±
      </Link>
    </div>
  );
};

export default SideMenu;
