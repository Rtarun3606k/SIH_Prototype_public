import React from "react";
import "./css/Upload.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../Utility/URL";
import { get_cookies_data } from "../Utility/AUTH";

const Admin_Upload = () => {
  const [state_loading, setState_loading] = useState(false);
  const [place_loading, setPlace_loading] = useState(false);
  const [state, setState] = useState("");
  const [state_array, setState_array] = useState([]);
  const [cat, setcat] = useState("");
  const [catList, setCatList] = useState([]);
  const [cat_loading, setCat_loading] = useState(false);

  useEffect(() => {
    load_states();
    load_cat();
  }, [state_loading, place_loading]);

  //Function to load states
  const load_states = async () => {
    const request = await fetch(`${url}/admin/get_states`);
    const data = await request.json();
    setState_array(data.states);
    // console.log(data.states);
    // toast(data.message);
  };

  const load_cat = async () => {
    const request = await fetch(`${url}/admin/get_cat`);
    const data = await request.json();
    setState_array(data.cat);
    // console.log(data.states);
    // toast(data.message);
  };

  // function handel submit
  const handel_submit = () => {
    return;
  };
  // function to handel state submit
  const handel_state_submit = async (e) => {
    e.preventDefault();
    setState_loading(true);
    const body = {
      state: state ? state : undefined,

      // password: password,
    };

    try {
      const response = await fetch(`${url}/admin/add_state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // navigate("/admin/dashboard");
        // Consider removing window.location.reload();
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    load_states();
    setState_loading(false);
    return;
  };

  // function to handel cat submit
  const handel_cat_submit = async (e) => {
    e.preventDefault();
    setCat_loading(true);
    const body = {
      cat: cat ? cat : undefined,

      // password: password,
    };

    try {
      const response = await fetch(`${url}/admin/add_cat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    load_cat();
    setCat_loading(false);
    return;
  };

  return (
    <>
      <div className="body">
        <div className="container">
          {/* <!-- Place Input Form --> */}
          <div className="form-container">
            <p className="h2">Place Information</p>
            <form method="POST" onSubmit={handel_submit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input"
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                required
                className="textarea"
              ></textarea>

              <label htmlFor="state">State:</label>

              <select id="state">
                {/* <hr /> */}
                {state_array.map((item) => {
                  return (
                    <>
                      {/* {" "} */}
                      {/* {console.log(item.name)} */}
                      <option
                        key={item.id}
                        value={`${item.name}`}
                      >{`${item.name}`}</option>
                      ;
                    </>
                  );
                })}
              </select>

              <label htmlFor="cat">Category:</label>

              <select id="cat">
                {/* <hr /> */}
                {state_array.map((item) => {
                  return (
                    <>
                      {/* {" "} */}
                      {/* {console.log(item.name)} */}
                      <option
                        key={item.id}
                        value={`${item.name}`}
                      >{`${item.name}`}</option>
                      ;
                    </>
                  );
                })}
              </select>

              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                required
                className="input"
              />

              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                id="rating"
                name="rating"
                required
                className="input"
              />

              <label htmlFor="image">Select Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                required
                className="choose"
              />
              {/* <!-- PlaceImage Input Form --> */}
              <p className="h2">Place Image</p>
              <label htmlFor="image" className="label">
                Select Image:{" "}
              </label>
              <input type="file" id="image" name="image" required />

              <button type="submit" className="submit_btn">
                {place_loading
                  ? "Uploading Place to data base please wait..."
                  : " Submit Place"}
              </button>
            </form>
          </div>
          <div className="form-container">
            <form method="POST" onSubmit={handel_state_submit}>
              <div className="flex-state">
                <label htmlFor="state_input">Enter state name:</label>
                <input
                  type="text"
                  placeholder="Enter state name"
                  id="state_input"
                  className="input"
                  required
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="submit_btn">
                {state_loading
                  ? "Uploading State to data base please wait..."
                  : "Submit State Name"}
              </button>
            </form>
            {/* category Submittion form */}
            <form method="POST" onSubmit={handel_cat_submit}>
              <div className="flex-state">
                <label htmlFor="cat_input">Enter Category name:</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  id="cat_input"
                  className="input"
                  required
                  value={cat}
                  onChange={(e) => {
                    setcat(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="submit_btn">
                {cat_loading
                  ? "Uploading Cat to data base please wait..."
                  : "Submit Cat Name"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Upload;
// --