import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Admin_navigation_data } from "../Admin_data/admin_navigation_data";
import "../css/Navigation.css";
import { delete_cookies_storedata } from "../../Utility/AUTH";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Admin_navigation = () => {
  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(false);
  let session_storage = sessionStorage.getItem("admin");

  // Function to handle logout
  const handle_logout = () => {
    delete_cookies_storedata();
    toast("Logout Successfully");
    navigate("/admin/login");
    window.location.reload(); // Navigate to login after logout
  };

  // Function to check if user is logged in
  const check_login = () => {
    if (sessionStorage.getItem("admin") === "true") {
      setLoggedin(true);
      // window.location.reload();
    } else {
      setLoggedin(false);
    }
  };

  useEffect(() => {
    check_login();
  }, []);

  return (
    <>
      <nav className="nav_admin">
        <ul>
          {Admin_navigation_data.map((item) => (
            <li key={item.id}>
              {" "}
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`${item.url}`}
                // to={`/admin/login`}
              >
                {item.title}
                {/* <img
                  src={isInside ? `/${item.img}` : `/${item.img}`}
                  alt=""
                  className="user-img"
                /> */}
              </NavLink>
            </li>
          ))}
          {loggedin ? (
            <li>
              <button onClick={handle_logout} className="logout_btn">
                Logout
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
};

export default Admin_navigation;
