import React from "react";

const Admin_Login = () => {
  return (
    <>
      <div className="container">
        <div className="container">
          <div className="box">
            <div className="inputs_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="enter email"
              />
            </div>
            <div className="inputs_box">
              <label htmlFor="password">Email</label>
              <input
                type="email"
                id="password"
                required
                placeholder="enter password"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Login;
