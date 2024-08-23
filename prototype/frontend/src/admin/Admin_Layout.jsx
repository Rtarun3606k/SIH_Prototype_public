import React from "react";
import Admin_navigation from "./components/Admin_navigation";

import { Outlet, Link } from "react-router-dom";

const Admin_Layout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <Navigation isInside={true} /> */}
      <Admin_navigation />
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
