// import React from 'react'
import "./styles.css";
function DefaultUnselectedChatDisplay() {
  return (
    <div className="DefaultUnselectedChatDisplay">
      <img src="/src/assets/images/default-unselected-chat.png" alt="" />
      <div className="whatsAppWebDescriptionWrapper">
        <h2>WhatsApp Web</h2>
        <p>
          Send and receive messages without keeping your phone online. Use
          WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
      </div>
      <div className="bottomContentWrapper">
        <i className="bx bxs-lock-alt"></i>
        <p>Your personal messages are end-to-end encrypted</p>
      </div>
    </div>
  );
}

export default DefaultUnselectedChatDisplay;
