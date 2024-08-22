import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_Layout from "./admin/Admin_Layout";
import Admin_Login from "./admin/Admin_Login";

const APPRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<Admin_Layout />}>
          <Route path="/login" element={<Admin_Login />} />
        </Route>

        {/* 404 Route */}
      </Routes>
    </Router>
  );
};

export default APPRouter;
