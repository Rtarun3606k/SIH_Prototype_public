import React from "react";
import "./css/Upload.css";

const Admin_Upload = () => {
  return (
    <>
      <div class="body">
        <div class="container">
          {/* <!-- Place Input Form --> */}
          <div class="form-container">
            <p class="h2">Place Information</p>
            <form action="/submit_place" method="POST">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required class="input" />

              <label for="description">Description:</label>
              <textarea
                id="description"
                name="description"
                required
                class="textarea"
              ></textarea>

              <label for="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                class="input"
              />

              <label for="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                required
                class="input"
              />

              <label for="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                required
                class="input"
              />

              <label for="rating">Rating:</label>
              <input
                type="text"
                id="rating"
                name="rating"
                required
                class="input"
              />

              <label for="image">Select Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                required
                class="choose"
              />

              <button type="submit" class="submit_btn">
                Submit Place
              </button>
            </form>
          </div>

          {/* <!-- PlaceImage Input Form --> */}
          <div class="form-container">
            <p class="h2">Place Image</p>
            <form action="/submit_image" method="POST">
              <label for="image" class="label">
                Select Image:
              </label>
              <input type="file" id="image" name="image" required />

              <button type="submit" class="submit_btn">
                Submit Image
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Upload;
