import React from "react";
import User_Navigation from "./User_Componets.jsx/User_Navigation";

import { Outlet, Link } from "react-router-dom";

const Admin_Layout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <Navigation isInside={true} /> */}
      <User_Navigation />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
      {/* <Footer /> */}
      footer
    </div>
  );
};

export default Admin_Layout;
