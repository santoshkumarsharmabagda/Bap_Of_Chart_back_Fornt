import React from "react";
import logo from "../Img/trade_room_logo_symbol.png";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const profileImage = localStorage.getItem("profile");
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();

  const isSpecificRoute = [
    "/login",
    "/ForgetEmail",
    "/ForgetEmailOtp",
    "/EnterNewPassword"
  ].includes(location.pathname);

  return (
    <nav className="d-flex justify-content-between align-items-center p-2 bg-transparent" >
      <div>
        {isSpecificRoute ? ( 
          <div className="navbar-brand">
            <img
              style={{ width: "100%", height: "50px" }}
              className="img"
              src={logo}
              alt="logo"
            />
          </div>
        ) : (
          <NavLink className="navbar-brand" to="/">
            <img
              style={{ width: "100%", height: "50px" }}
              className="img"
              src={logo}
              alt="logo"
            />
          </NavLink>
        )}
      </div>
      <div>
        <h4 className="text-white">Trade Room</h4>
      </div>
      <div>
        {isLoggedIn ? (
          <img
            src={profileImage}
            alt="User Profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ) : (
          <NavLink to="/login">
            <FaUserCircle style={{ color: "white", fontSize: "30px" }} />
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
