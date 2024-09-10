import { useState } from "react";
import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";

function SelectedChat({
  selectedUser,
}: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  };
}) {
  const [messages, setMessages] = useState<{
    [key: string]: { text: string; timeStamp: string }[];
  }>({});
  return (
    <div className="ChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} />
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

export default SelectedChat;
