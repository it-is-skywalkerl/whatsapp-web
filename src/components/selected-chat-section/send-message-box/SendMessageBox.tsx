import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "../../../assets/icons/Icons";
import "./styles.css";

function SendMessageBox({
  selectedUser,
  messages,
  setMessages,
}: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  };
  messages: {
    [key: string]: {
      text: string;
      timeStamp: string;
    }[];
  };
  setMessages: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        text: string;
        timeStamp: string;
      }[];
    }>
  >;
}) {
  const [inputMessage, setInputMessage] = useState<string>("");

  function sendMessage() {
    if (inputMessage.length > 0) {
      const timeStamp = new Date().toTimeString().split(" ")[0];
      if (Array.isArray(messages[selectedUser.id])) {
        const newMessageArray = messages[selectedUser.id];
        newMessageArray.push({ text: inputMessage, timeStamp });
        const newMessages = { ...messages, [selectedUser.id]: newMessageArray };
        setMessages(newMessages);
      } else {
        const newMessageArray = [];
        newMessageArray.push({ text: inputMessage, timeStamp });
        const newMessages = { ...messages, [selectedUser.id]: newMessageArray };
        setMessages(newMessages);
      }
    }
    console.log(messages);
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
