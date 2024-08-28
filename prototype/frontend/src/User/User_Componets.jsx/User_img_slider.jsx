import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
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
                    <h1>Travel Now</h1>
                    <p>
                      Travel Now is a travel agency that provides a platform for
                      people to book their trips to various destinations around
                      the world. We offer a wide range of services that cater to
                      the needs of our customers, including flights,
                      accommodation, tours, and activities. Our goal is to make
                      travel planning easy and stress-free, so you can focus on
                      enjoying your trip.
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
