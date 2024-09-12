import { useState } from "react";
import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { AllUserMessages, User } from "@/types/common-types";

function SelectedChat({ selectedUser }: { selectedUser: User }) {
  const [messages, setMessages] = useState<AllUserMessages>({});

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
