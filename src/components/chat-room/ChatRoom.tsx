import { useState } from "react";
import MessageHeader from "./message-header/MessageHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";

function ChatRoom({ selectedUser }: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  }
}) {
  const [messages, setMessages] = useState<{[key: string]: {text: string, timeStamp:string}[]}>({});
  return (
    <div className="ChatSection">
      <div className="BackgroundImage"></div>
      <MessageHeader selectedUser={selectedUser} />
      <MessageList
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
      />
      <SendMessageBox
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatRoom;
