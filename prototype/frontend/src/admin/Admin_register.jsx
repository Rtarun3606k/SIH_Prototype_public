import React from "react";
import "./css/Admin.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { url } from "../Utility/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin_Register = () => {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [reshow, setReShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");

  // function to show and hide password
  const visiblity = () => {
    setShow(!show);
  };
  const revisiblity = () => {
    setReShow(!reshow);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    if (
      email.length < 5 ||
      username.length < 6 ||
      password.length < 7 ||
      repassword.length < 7 ||
      password !== repassword
    ) {
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
      username: username ? username : undefined, // Include username
      password: password,
    };

    try {
      const response = await fetch(`${url}/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

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
        navigation("/admin/login");
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

    setIsRegistering(false);
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
            <div className="inputs_box" id="email_box">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                required
                placeholder="enter User name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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
            <div className="inputs_box">
              <label htmlFor="repassword">Retype Password</label>
              <div className="password_div">
                <input
                  type={reshow ? "text" : "password"}
                  id="repassword"
                  required
                  placeholder="enter password"
                  value={repassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                />
                <button onClick={revisiblity} id="show_btn">
                  {reshow ? "hide" : "show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="login_btn"
              onClick={handleRegister}
            >
              {isRegistering ? "Registering Please wait.. " : " Register"}
            </button>
            <p>
              Already have an account? <Link to="/admin/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Register;
