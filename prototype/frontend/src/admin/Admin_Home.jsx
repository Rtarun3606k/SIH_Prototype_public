import React from "react";
import "./css/Admin_home.css";
import { useEffect, useState } from "react";
import { url } from "../Utility/URL";
import { get_cookies_data } from "../Utility/AUTH";
import { toast } from "react-toastify";
import { redirect_if_not_logged_in_admin } from "../Utility/AUTH";

const Admin_Home = () => {
  const [state_list, setState_list] = useState([]);
  const [cat_list, setCat_list] = useState([]);
  const [change_list, setChange_list] = useState(false);

  const handel_data_request = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };
    const response = await fetch(
      `${url}/admin/get_states_and_categories`,
      options
    );
    const data = await response.json();
    if (response.status === 200) {
      setState_list(data.states);
      setCat_list(data.categories);
    }
  };

  const handel_satename_delete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };
    const response = await fetch(`${url}/admin/delete_state/${id}`, options);
    const data = await response.json();
    if (response.status === 200) {
      setChange_list(!change_list);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handel_catname_delete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };
    const response = await fetch(`${url}/admin/delete_cat/${id}`, options);
    const data = await response.json();
    if (response.status === 200) {
      setChange_list(!change_list);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    redirect_if_not_logged_in_admin();
    handel_data_request();
  }, [change_list]);

  return (
    <>
      <div className="states">
        <h2>States</h2>
        <ul>
          {state_list.map((state) => {
            return (
              <>
                <li key={state.id}>{state.name}</li>
                <span>
                  <button
                    onClick={() => {
                      handel_satename_delete(state.id);
                    }}
                  >
                    Delete {state.name}
                  </button>
                </span>
              </>
            );
          })}
        </ul>
      </div>
      <div className="cat">
        <h2>Categories</h2>
        <ul>
          {cat_list.map((cat) => {
            return (
              <>
                {" "}
                <li key={cat.id}>{cat.name}</li>
                <span>
                  <button
                    onClick={() => {
                      handel_catname_delete(cat.id);
                    }}
                  >
                    Delete {cat.name}
                  </button>
                </span>
                ;
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Admin_Home;
