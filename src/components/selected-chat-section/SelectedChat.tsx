import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { AllUserMessages, User } from "@/types/common-types";

function SelectedChat({
  selectedUser,
  messages,
  onAction,
}: {
  selectedUser: User;
  messages: AllUserMessages;
  onAction: (
    actionType: "sendMessage" | "deleteMessage",
    payload: string
  ) => void;
}) {
  return (
    <div className="SelectedChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} />
      <MessageList
        selectedUser={selectedUser}
        messages={messages}
        onAction={
          onAction as (actionType: "deleteMessage", payload: string) => void
        }
      />
      <SendMessageBox
        onAction={
          onAction as (actionType: "sendMessage", payload: string) => void
        }
      />
    </div>
  );
}

export default SelectedChat;
