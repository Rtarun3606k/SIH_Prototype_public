import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

class DemoCarousel extends Component {
  data_images = [];

  handel_data_request = async () => {
    const response = await fetch(`${url}/admin/get_places`);
    const data = await response.json();
    if (response.status === 200) {
      // console.log(response.message, "message");
      images_index = data.places_list.images_list;
      for (let i = 0; i < images_index.length; i++) {
        this.data_images[i] = images_index.id[i];
        console.log(images_index[i].id);
      }
      console.log(data_set, "data_set");
    }
  };

  let_links = [
    "https://plus.unsplash.com/premium_photo-1661915320026-84ca2c96faa7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1678597143479-c4655b8f0b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  render() {
    return (
      <Carousel showThumbs={false}>
        {this.let_links.map((link) => {
          return (
            <>
              <div>
                <img src={link} />
                <div
                  className="legend slider_box"
                  style={{ background: "rgba(97, 92, 92, 0.285)" }}
                >
                  <div className="slider_content">
                    <h1>Taj Mahal</h1>
                    <p>
                      The Taj Mahal is a white marble mausoleum in Agra, India,
                      built between 1631 and 1648 by Mughal emperor Shah Jahan
                      as a tomb for his wife, Mumtaz Mahal
                    </p>
                    <center className="slider_buttons">
                      <button className="slider_book_now">Book Now</button>
                      <button className="slider_deltails_now">
                        More Details
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </Carousel>
    );
  }
}

export default DemoCarousel;
