import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaHeadphones } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { useSearch } from "../../context/Search";


function Navigation() {
  const { handleExit } = useSearch();
  return (
    <div className="NavContainer">
      <NavLink to={"/"} onClick={handleExit} className="navLogo">mix</NavLink>
      <div>
        <SearchBar />
      </div>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
