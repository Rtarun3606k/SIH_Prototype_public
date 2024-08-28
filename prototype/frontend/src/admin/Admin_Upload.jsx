import React, { useEffect, useState } from "react";
import "./css/Upload.css";
import { toast } from "react-toastify";
import { url } from "../Utility/URL";
import { get_cookies_data } from "../Utility/AUTH";

import { redirect_if_not_logged_in_admin } from "../Utility/AUTH";

const Admin_Upload = () => {
  const [state_loading, setState_loading] = useState(false);
  const [place_loading, setPlace_loading] = useState(false);
  const [state, setState] = useState("");
  const [state_array, setState_array] = useState([]);
  const [cat, setCat] = useState("");
  const [catList, setCatList] = useState([]);
  const [cat_loading, setCat_loading] = useState(false);

  //places data
  const [place_name, setPlace_name] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [state_name, setState_name] = useState("");
  const [cat_name, setCat_name] = useState("");

  useEffect(() => {
    redirect_if_not_logged_in_admin();
    load_states();
    load_cat();
  }, [state_loading, place_loading, cat_loading]);

  //Function to load states
  const load_states = async () => {
    const request = await fetch(`${url}/admin/get_states`);
    const data = await request.json();
    setState_array(data.states);
  };

  const load_cat = async () => {
    const request = await fetch(`${url}/admin/get_cat`);
    const data = await request.json();
    setCatList(data.cat);
  };

  // Function to handle place submission
  const handle_place_submit = async (e) => {
    e.preventDefault();
    setPlace_loading(true);

    const formData = new FormData();
    formData.append("place_name", place_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("state_name", state_name);
    formData.append("cat_name", cat_name);

    // Append multiple images to formData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await fetch(`${url}/admin/add_place`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: formData,
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

    setPlace_loading(false);
  };

  // Function to handle state submission
  const handle_state_submit = async (e) => {
    e.preventDefault();
    setState_loading(true);

    try {
      const response = await fetch(`${url}/admin/add_state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: JSON.stringify({ state_name: state }),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        setState(""); // Clear input
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
    setState_loading(false);
  };

  // Function to handle category submission
  const handle_cat_submit = async (e) => {
    e.preventDefault();
    setCat_loading(true);

    try {
      const response = await fetch(`${url}/admin/add_cat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_cookies_data(false, true)}`,
        },
        body: JSON.stringify({ cat_name: cat }),
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
    setCat_loading(false);
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="form-container">
            <p className="h2">Place Information</p>
            <form
              method="POST"
              onSubmit={handle_place_submit}
              encType="multipart/form-data"
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input"
                value={place_name}
                onChange={(e) => {
                  setPlace_name(e.target.value);
                }}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                required
                className="textarea"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>

              <label htmlFor="state">State:</label>
              <select
                id="state"
                onChange={(e) => setState_name(e.target.value)}
              >
                {state_array.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label htmlFor="cat">Category:</label>
              <select id="cat" onChange={(e) => setCat_name(e.target.value)}>
                {catList.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                required
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                required
                className="input"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              {/* PlaceImage Input Form */}
              <p className="h2">Place Images</p>
              <label htmlFor="images" className="label">
                Select Images:{" "}
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={(e) => {
                  setImages(e.target.files);
                }}
              />

              <button type="submit" className="submit_btn">
                {place_loading
                  ? "Uploading Place to database, please wait..."
                  : "Submit Place"}
              </button>
            </form>
          </div>
          {/* State and Category Forms */}
          <div className="form-container">
            <form method="POST" onSubmit={handle_state_submit}>
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
                  ? "Uploading State to database, please wait..."
                  : "Add State"}
              </button>
            </form>

            <form method="POST" onSubmit={handle_cat_submit}>
              <div className="flex-state">
                <label htmlFor="cat_input">Enter category name:</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  id="cat_input"
                  className="input"
                  required
                  value={cat}
                  onChange={(e) => {
                    setCat(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="submit_btn">
                {cat_loading
                  ? "Uploading Category to database, please wait..."
                  : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Upload;
