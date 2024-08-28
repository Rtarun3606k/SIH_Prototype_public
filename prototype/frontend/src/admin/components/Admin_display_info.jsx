import React from "react";
import { url } from "../../Utility/URL";
import { toast } from "react-toastify";
import { get_cookies_data } from "../../Utility/AUTH";

const Admin_display_info = ({
  place_name,
  state_name,
  price,
  description,
  rating,
  cat,
  images_data,
  id_place,
}) => {
  const handel_image_delete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };

    const response = await fetch(`${url}/admin/delete_image/${id}`, options);
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.message, "message");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handel_place_delete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };

    const response = await fetch(`${url}/admin/delete_place/${id}`, options);
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.message, "message");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="container_info">
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
          return (
            <>
              <img src={`${url}/admin/get_image/${img.id}`} alt="no" />;
              <button
                onClick={() => {
                  handel_image_delete(img.id);
                }}
              >
                Delete image
              </button>
            </>
          );
        })}
      </div>
      <div className="admin_buttons">
        <button
          onClick={() => {
            handel_place_delete(id_place);
          }}
        >
          Delete place
        </button>
      </div>
    </div>
  );
};

export default Admin_display_info;
