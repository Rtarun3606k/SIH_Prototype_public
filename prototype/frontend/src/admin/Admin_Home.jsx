import React from "react";
import "./css/Admin_home.css";
import { useEffect, useState } from "react";
import { url } from "../Utility/URL";
import { get_cookies_data } from "../Utility/AUTH";
import { toast } from "react-toastify";
import { redirect_if_not_logged_in_admin } from "../Utility/AUTH";
import Admin_update_state_cat from "../admin/components/Admin_update_state_cat";

const Admin_Home = () => {
  const [state_list, setState_list] = useState([]);
  const [cat_list, setCat_list] = useState([]);
  const [change_list, setChange_list] = useState(false);
  const [Update, setUpdate] = useState(false);
  let data_for_update = {
    id: 0,
    state: false,
    cat: false,
  };

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

  let handel_update = (id, state) => {
    data_for_update.id = id;
    data_for_update.state = state;
    data_for_update.cat = !state;
    setUpdate(!Update);
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
                  <button
                    onClick={() => {
                      handel_update(state.id, true);
                    }}
                  >
                    Update
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
                  <button
                    onClick={() => {
                      handel_update(cat.id, false);
                    }}
                  >
                    Update
                  </button>
                </span>
                ;
              </>
            );
          })}
        </ul>
      </div>
      <div className="update_box">
        {Update ? (
          <Admin_update_state_cat
            id={data_for_update.id}
            state={data_for_update.state}
            cat={data_for_update.cat}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Admin_Home;
