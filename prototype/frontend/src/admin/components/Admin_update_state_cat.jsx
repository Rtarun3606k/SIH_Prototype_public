import React from "react";
import { url } from "../../Utility/URL";
import { get_cookies_data } from "../../Utility/AUTH";
import { toast } from "react-toastify";
import { useState } from "react";

const Admin_update_state_cat = ({ state, cat, id }) => {
  const [Loading, setLoading] = useState(false);
  const [update_value, setUpdate_value] = useState("");
  // Function to handle category submission
  const handle_submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url_path = state ? `update_state/${id}` : `update_cat/${id}`;
    const body_data = state
      ? { state_name: update_value }
      : { cat_name: update_value };

    try {
      const response = await fetch(`${url}/admin/${url_path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: JSON.stringify(body_data),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        setCat(""); // Clear input
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="update_box">
        <form method="post" onSubmit={handle_submit}>
          <label htmlFor="input_box">
            Enter {state ? "State" : "Catagorie"} value:
          </label>
          <input
            type="text"
            id="input_box"
            placeholder={`Enter ${state ? "State" : "Catagorie"} value:`}
            value={update_value}
            onChange={(e) => setUpdate_value(e.target.value)}
          />
          <button type="submit">
            {Loading
              ? `Updating ${state ? "State" : "Catagorie"}...`
              : `
            Upadate ${state ? "State" : "Catagorie"}`}
          </button>
        </form>
      </div>
    </>
  );
};

export default Admin_update_state_cat;
