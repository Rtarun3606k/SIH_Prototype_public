import React, { useEffect, useState } from "react";
import { url } from "../Utility/URL";
import Admin_display_info from "./components/Admin_display_info";
import "./css/Admin_display_info.css";
import { redirect_if_not_logged_in_admin } from "../Utility/AUTH";

const Admin_dashboard = () => {
  const [data_set, setData_set] = useState([]);

  const handel_data_request = async () => {
    const response = await fetch(`${url}/admin/get_places`);
    const data = await response.json();
    if (response.status === 200) {
      // console.log(response.message, "message");
      setData_set(data.places);
      console.log(data_set, "data_set");
    }
  };
  useEffect(() => {
    handel_data_request();
    redirect_if_not_logged_in_admin();
  }, []);

  return (
    <div>
      {data_set.map((data) => {
        return (
          <Admin_display_info
            key={data.id}
            place_name={data.name}
            state_name={data.state}
            cat={data.category}
            rating={data.rating}
            price={data.price}
            description={data.description}
            images_data={data.images}
            id_place={data.id}
          />
        );
      })}
    </div>
  );
};

export default Admin_dashboard;
