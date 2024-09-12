import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "../../../assets/icons/Icons";
import "./styles.css";
import { User, UserMessage, AllUserMessages } from "@/types/common-types";

function SendMessageBox({
  selectedUser,
  messages,
  setMessages,
}: {
  selectedUser: User;
  messages: AllUserMessages;
  setMessages: React.Dispatch<React.SetStateAction<AllUserMessages>>;
}) {
  const [inputMessage, setInputMessage] = useState<string>("");

  function sendMessage() {
    if (inputMessage.length > 0) {
      const timeStamp = new Date().toTimeString().split(" ")[0];
      const selectedUserMessageList: UserMessage[] =
        messages[selectedUser.id] ?? [];
      setMessages({
        ...messages,
        [selectedUser.id]: [
          ...selectedUserMessageList,
          { text: inputMessage, timeStamp: timeStamp },
        ],
      });
    }
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
