import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { BsThreeDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <div className="ProfileContainer">
        <button className="ProfileButton" onClick={toggleMenu}>
          {user ? <span style={{ fontSize: "20px", padding: "10px" }}>{user?.first_name}</span> : <BsThreeDots size={25} />}
        </button>
        {showMenu && (
          <div className={"profile-dropdown"} ref={ulRef}>
            {user ? (
              <>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>
                  <button onClick={logout}>Log Out</button>
                </p>
                <NavLink className={"profileNavs"} to={"/songs/new"}>
                  Drop New Song
                </NavLink>
                <NavLink className={"profileNavs"} to={"/albums/new"}>
                  Drop New Album
                </NavLink>
              </>
            ) : (
              <>
                <span className="dropDownItem">
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </span>
                <span className="dropDownItem">
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </span>
              </>
            )}
          </div>
        )}
      </div >
    </>
  );
}

export default ProfileButton;
