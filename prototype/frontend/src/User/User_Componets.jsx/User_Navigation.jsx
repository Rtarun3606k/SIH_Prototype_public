import React from "react";
import { Link } from "react-router-dom";
import "../Css/User_navigation.css";
import { User_navigation_data } from "../Data";
import DemoCarousel from "./User_img_slider";

const User_Navigation = () => {
  return (
    <>
      <header className="header">
        <nav className="nav_user">
          <div className="first_content">
            <div className="logo">TravelNow</div>
            <ul className="nav_user-links">
              {/* <li>
              <a href="#">Home</a>
              </li> */}
              {User_navigation_data.map((item) => {
                return (
                  <li key={item.id}>
                    <Link to={item.url}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="last_content">
            <ul className="nav_user-links">
              <li>
                <button className="User_login_btn">Login</button>
              </li>
              <li>
                <button className="User_sign_up_btn">Sign Up</button>
              </li>
              {/* <li><button></button></li> */}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default User_Navigation;
