import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaHeadphones } from "react-icons/fa";



function Navigation() {
  return (
    <div className="NavContainer">
      <NavLink style={{ color: 'var(--purple)', textDecoration: "none", fontWeight: "bold", fontSize: "70px" }} to="/"> <FaHeadphones size={50} color="#A065FF" /> <span style={{ textShadow: "2px 2px 4px var(--darkp)" }}>mix</span></NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
