import React from "react";

const Chat_bot = () => {
  return (
    <>
      <div className="chatbot-container">
        <div className="chat-header">
          <h2 className="h2">TravelBot</h2>
          <p className="p">Your travel companion</p>
        </div>
        <div className="chat-window" id="chat-window">
          <div className="bot-messages-div">
            <div className="chat-message bot-message">
              <p>
                Hello! I’m here to help you plan your next adventure. How can I
                assist you today?
              </p>
            </div>
            <img src="/bot.png" alt="" className="bot-img" />
          </div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            autofocus
            className="input"
          />
          <button id="send-btn" className="button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat_bot;
