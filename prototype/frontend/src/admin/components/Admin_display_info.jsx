import React from "react";
import { url } from "../../Utility/URL";

const Admin_display_info = ({
  place_name,
  state_name,
  price,
  description,
  rating,
  cat,
  images_data,
}) => {
  return (
    <div className="container">
      <div className="data_box">
        <p>place_name: {place_name}</p>
        <p>state_name : {state_name}</p>
        <p>price : {price}</p>
        <p>description : {description}</p>
        <p>rating : {rating}</p>
        <p>cat : {cat}</p>
      </div>
      <div className="img_box">
        {images_data.map((img) => {
          return <img src={`${url}/admin/get_image/${img.id}`} alt="no" />;
        })}
      </div>
      <div className="admin_buttons">
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Admin_display_info;
