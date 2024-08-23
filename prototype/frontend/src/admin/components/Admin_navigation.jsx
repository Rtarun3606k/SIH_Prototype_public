import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Admin_navigation_data } from "../Admin_data/admin_navigation_data";
import "../css/Navigation.css";

const Admin_navigation = () => {
  const navitgate = useNavigate();
  return (
    <>
      <nav>
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
        </ul>
      </nav>
    </>
  );
};

export default Admin_navigation;
