import React from "react";
// import User_Navigation from "./User_Componets.jsx/User_Navigation";
import DemoCarousel from "./User_Componets.jsx/User_img_slider";
import "./Css/User_navigation.css";
import Chat_bot from "./Chat_bot/Chat_bot";
import { useState } from "react";
import "./Css/User_home.css";

const User_Home = () => {
  const [chat_bot_active, setChat_bot_active] = useState(false);
  const handel_chat_bot_status = () => {
    setChat_bot_active(!chat_bot_active);
  };
  return (
    <>
      <div className="slider">
        <DemoCarousel />
      </div>
      home
      <div className="chat_bot_button" onClick={handel_chat_bot_status}>
        {chat_bot_active ? <Chat_bot /> : ""}
        <img src="./bot.png" alt="" className="bot_img_button" />
      </div>
    </>
  );
};

export default User_Home;
