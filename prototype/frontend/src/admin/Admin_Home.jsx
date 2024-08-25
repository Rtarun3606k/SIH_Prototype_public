import React from "react";
import "./css/Admin_home.css";

const Admin_Home = () => {
  return (
    <div class="">
      <div class="search-container">
        <div class="search-bar">
          <input
            type="text"
            id="stateSearch"
            placeholder="Search for a state..."
          />
          <button type="submit" onclick="searchState()">
            Search
          </button>
        </div>
      </div>

      <div class="scroll-box" id="stateBox">
        <ul>
          <li>Andhra Pradesh</li>
          <li>Bihar</li>
          <li>Delhi</li>
          <li>Goa</li>
          <li>Gujarat</li>
          {/* <!-- Add more states as needed --> */}
        </ul>
      </div>
    </div>
  );
};

export default Admin_Home;
