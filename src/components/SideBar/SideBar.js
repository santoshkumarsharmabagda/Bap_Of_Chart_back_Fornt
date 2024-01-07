import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { TbTransitionTop } from "react-icons/tb";
import { BiLogoDiscourse } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { MdFolderSpecial } from "react-icons/md";
import { MdMarkChatUnread } from "react-icons/md";
import { SiMediafire } from "react-icons/si";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClearLocalStorageAndNavigate = () => {
    localStorage.clear();

    navigate("/login");
  };
  return (
    <div className="m-0 p-0 h-100 bg-dark"
    style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }}
    >
      <div
        class="d-flex example flex-column mt-0 justify-content-start flex-shrink-0 py-0 p-3 text-white"
        style={{
          height: "100%",
          overflowY:"auto"
          // borderRadius: "10px",
        }}
      >
        {/* <NavLink
          to="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span class="fs-4">{localStorage.getItem("name")}</span>
        </NavLink> */}
        {/* <hr /> */}
        <ul
          class="nav nav-pills flex-column mb-auto"
        >
          <NavLink
            to="/"
            class="nav-link"
            aria-current="page"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 py-3"
              style={
                location.pathname == "/"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <BiSolidDashboard style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}> Dashboard</span>
            </li>
          </NavLink>

          <NavLink
            to="/users"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/users"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <BiSolidUser style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Users</span>
            </li>
          </NavLink>
          <NavLink
            to="/transactions"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/transactions"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <TbTransitionTop style={{ fontSize: "1.5rem" }} />
              <span className="ms-1">Transactions</span>
            </li>
          </NavLink>
          <NavLink
            to="/courses/:id"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/courses/:id"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <BiLogoDiscourse style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Courses</span>
            </li>
          </NavLink>
          <NavLink
            to="/categorys"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/categorys"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <MdCategory style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Categorys</span>
            </li>
          </NavLink>
          <NavLink
            to="/Banner"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/Banner"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <MdMarkChatUnread style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Banner</span>
            </li>
          </NavLink>
          <NavLink
            to="/PrivateGroup"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/PrivateGroup"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <MdFolderSpecial style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Private Group</span>
            </li>
          </NavLink>
          <NavLink
            to="/SocialMedia"
            class="nav-link text-white"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li
              class="nav-item ps-1 mt-3 py-3"
              style={
                location.pathname == "/SocialMedia"
                  ? { background: "#5D2A42", borderRadius: "10px" }
                  : { background: "black", borderRadius: "10px" }
              }
            >
              <SiMediafire style={{ fontSize: "1.5rem" }} />
              <span style={{ marginTop: "10px" }}>Social Media</span>
            </li>
          </NavLink>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            to="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={localStorage.getItem("profile")}
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow justify-content-center"
            aria-labelledby="dropdownUser1"
          >
            {/* <li>
        <NavLink class="dropdown-item " style={{textDecoration:"none",color:"white",textAlign:"start", paddingLeft:"13px"}} to="/changepass">New Project...</NavLink>
        </li> */}
            <li>
              <NavLink
                class="dropdown-item "
                style={{
                  textDecoration: "none",
                  color: "white",
                  textAlign: "start",
                  paddingLeft: "13px",
                }}
                to="/ForgetEmail"
              >
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink
                class="dropdown-item"
                style={{
                  textDecoration: "none",
                  color: "white",
                  textAlign: "start",
                  paddingLeft: "13px",
                }}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li
              className="dropdown-item"
              style={{
                textDecoration: "none",
                color: "white",
                textAlign: "start",
                paddingLeft: "13px",
                cursor: "pointer",
              }}
              onClick={handleClearLocalStorageAndNavigate}
            >
              Log Out
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            {/* <li>
        <NavLink class="dropdown-item" style={{textDecoration:"none",color:"white",textAlign:"start", paddingLeft:"13px"}}  to="/signout">Sign out</NavLink>
        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
