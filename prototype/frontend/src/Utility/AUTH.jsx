import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { url } from ".././Utility/URL";
// import { useNavigate } from "react-router-dom";
// import { url } from "../data/URL";

//function to store the cookies data
export const store_cookies_data = (refresh_token, access_token) => {
  const authdata = {
    access_token: access_token,
    refresh_token: refresh_token,
  };

  const serilize_auth_data = JSON.stringify(authdata);
  Cookies.set("authdata", serilize_auth_data, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
  sessionStorage.setItem("admin", "true");
  // window.location.reload();
};

//function to delete the cookies data
export const delete_cookies_storedata = () => {
  Cookies.remove("authdata");
  console.log("deleting data function");
  sessionStorage.removeItem("admin");
};

//function to get the cookies data
export const get_cookies_data = (refresh, access) => {
  const authdata = Cookies.get("authdata");
  if (authdata) {
    const data = JSON.parse(authdata);
    if (refresh) {
      return data.refresh_token;
    } else if (access) {
      return data.access_token;
    }
  }
  return false;
};

//function to edit the access token
export const edit_access_token = (new_access_token) => {
  const authdata = Cookies.get("authdata");
  if (authdata) {
    const data = JSON.parse(authdata);
    data.access_token = new_access_token;
    const updated_data = JSON.stringify(data);
    Cookies.set("authdata", updated_data, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
  }
};

//function to check the token exist or not
export const check_token = async () => {
  let access_token = get_cookies_data(false, true);
  let refresh_token = get_cookies_data(true, false);
  console.log("Access Token: ", access_token);
  console.log("Refresh Token: ", refresh_token);

  if (!access_token) {
    console.log("No access token found.");
    return false;
  } else if (!refresh_token) {
    console.log("No refresh token found.");
    return false;
  } else {
    console.log("Tokens exist.");

    try {
      // Check the access token
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      let response = await fetch(`${url}/check_token`, options);
      let data = await response.json();

      if (response.status === 200) {
        console.log(data.msg);
        return true;
      } else if (response.status === 401) {
        console.log(data.msg);

        // Attempt to refresh the token
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh_token}`,
          },
        };

        response = await fetch(
          `${url}/check_session_token/refresh_session_token`,
          options
        );
        let data = await response.json();

        if (response.status === 200) {
          console.log(data.msg);
          store_cookies_data(refresh_token, data.access_token);
          return true;
        } else {
          console.log(data.msg);
          return false;
        }
      }
    } catch (error) {
      console.error("Error checking token:", error);
      return false;
    }
  }
};

export const redirect_if_not_logged_in_admin = () => {
  check_token()
    .then((response) => {
      const navigate = useNavigate();
      if (!response) {
        console.log("Token not found. Redirecting to login page...");
        navigate("/admin/login");
      }
    })
    .catch((error) => {
      console.error("Error checking token:", error);
      // Optionally, you could redirect to an error page or show a notification
    });
};
