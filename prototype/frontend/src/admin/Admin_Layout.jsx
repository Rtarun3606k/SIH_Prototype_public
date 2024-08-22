import React from "react";
// import Register from "../Pages/Register/Register";
// import Navigation from "./NavFoloder/Navigation";
// import Footer from "./Footer";

import { Outlet, Link } from "react-router-dom";

const Admin_Layout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <Navigation isInside={true} /> */}
      navigation
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
