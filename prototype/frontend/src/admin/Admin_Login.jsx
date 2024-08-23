import React from "react";
import "./css/Admin.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin_Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function to show and hide password
  const visiblity = () => {
    setShow(!show);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <div className="container2">
          <div className="box">
            <div className="inputs_box" id="email_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="inputs_box">
              <label htmlFor="password">Password</label>
              <div className="password_div">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  required
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button onClick={visiblity} id="show_btn">
                  {show ? "hide" : "show"}
                </button>
              </div>
            </div>
            <button type="submit" className="login_btn">
              Login
            </button>
            <p>
              Don't have an account <Link to="/admin/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Login;
