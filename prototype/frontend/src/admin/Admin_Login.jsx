import React from "react";
import "./css/Admin.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../Utility/URL";
import { toast } from "react-toastify";
import {
  get_cookies_data,
  delete_cookies_storedata,
  store_cookies_data,
} from "../Utility/AUTH";

const Admin_Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingin, setIsLoggingin] = useState(false);

  // function to show and hide password
  const visiblity = () => {
    setShow(!show);
  };

  const handellogin = async (e) => {
    e.preventDefault();
    setIsLoggingin(true);

    if (email.length < 5 || password.length < 7) {
      toast.error("Please fill the details properly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsRegistering(false);
      return;
    }

    const body = {
      email: email ? email : undefined,

      password: password,
    };

    try {
      const response = await fetch(`${url}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data.refresh_token, data.access_token);
      store_cookies_data(data.refresh_token, data.access_token);
      if (response.status === 200) {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/admin/dashboard");
        // Consider removing window.location.reload();
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setIsLoggingin(false);
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
            <button type="submit" className="login_btn" onClick={handellogin}>
              {isLoggingin ? "Logging in please wait" : "Login"}
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
