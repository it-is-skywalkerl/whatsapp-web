import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "../../../assets/icons/Icons";
import "./styles.css";

function SendMessageBox({
  onAction,
}: {
  onAction: (
    actionType: "sendMessage" | "deleteMessage",
    payload: string
  ) => void;
}) {
  const [inputMessage, setInputMessage] = useState<string>("");

  function sendMessage() {
    onAction("sendMessage", inputMessage);
    setInputMessage("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="MessageBoxOuterDiv">
      <div className="MessageBoxInnerDiv">
        <AttachmentIcon />
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          className="SendMessageBox"
          onChange={(event) => setInputMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="SendButton" onClick={sendMessage}>
          <SendButtonIcon />
        </button>
      </div>
    </div>
  );
}

export default SendMessageBox;
