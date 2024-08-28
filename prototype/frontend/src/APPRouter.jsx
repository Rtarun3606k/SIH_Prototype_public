import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_Layout from "./admin/Admin_Layout";
import Admin_Login from "./admin/Admin_Login";
import Admin_Register from "./admin/Admin_register";
import Admin_dashboard from "./admin/Admin_dashboard";
import Admin_Upload from "./admin/Admin_Upload";
import Admin_Home from "./admin/Admin_Home";
// user components import
import User_Home from "./User/User_Home";
import User_layout from "./User/User_layout";

const APPRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin_Layout />}>
          <Route path="login" element={<Admin_Login />} />
          <Route path="register" element={<Admin_Register />} />
          <Route path="dashboard" element={<Admin_dashboard />} />
          <Route path="upload" element={<Admin_Upload />} />
          <Route path="home" element={<Admin_Home />} />
        </Route>

        {/* User routes */}
        <Route path="/" element={<User_layout />}>
          <Route index element={<User_Home />} />
          <Route path="home" element={<User_Home />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* 404 Route */}
      </Routes>
    </Router>
  );
};

export default APPRouter;
