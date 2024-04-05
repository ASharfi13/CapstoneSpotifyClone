import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaHeadphones } from "react-icons/fa";



function Navigation() {
  return (
    <div className="NavContainer">
      <NavLink className="navLogo">mix</NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
