import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "../../../assets/icons/Icons";
import "./styles.css";
import { handleMessageActionTypes } from "../../../constant/types/onAction-types";
import { messagesReducerPayloadType } from "@/constant/types/common-types";

function SendMessageBox({
  dispatchMessages,
  selectedUserId,
}: {
  dispatchMessages: React.Dispatch<{
    type: keyof typeof handleMessageActionTypes;
    payload: messagesReducerPayloadType;
  }>;
  selectedUserId: string;
}) {
  const [inputMessage, setInputMessage] = useState<string>("");

  function sendMessage() {
    dispatchMessages({
      type: handleMessageActionTypes.SEND_MESSAGE,
      payload: { selectedUserId: selectedUserId, newMessageText: inputMessage },
    });
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
