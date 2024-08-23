import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_Layout from "./admin/Admin_Layout";
import Admin_Login from "./admin/Admin_Login";
import Admin_Register from "./admin/Admin_register";
import Admin_dashboard from "./admin/Admin_dashboard";

const APPRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin_Layout />}>
          <Route path="login" element={<Admin_Login />} />
          <Route path="register" element={<Admin_Register />} />
          <Route path="dashboard" element={<Admin_dashboard />} />
        </Route>

        {/* 404 Route */}
      </Routes>
    </Router>
  );
};

export default APPRouter;
