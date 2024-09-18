import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "../../../assets/icons/Icons";
import "./styles.css";
import { OnActionTypes } from "../../../constant/types/onAction-types";

function SendMessageBox({
  onAction,
}: {
  onAction: (
    actionType: typeof OnActionTypes.SEND_MESSAGE,
    payload: string
  ) => void;
}) {
  const [inputMessage, setInputMessage] = useState<string>("");

  function sendMessage() {
    onAction(OnActionTypes.SEND_MESSAGE, inputMessage);
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
