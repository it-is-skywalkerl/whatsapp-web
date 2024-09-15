import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { User, UserMessage } from "@/types/common-types";

function SelectedChat({
  selectedUser,
  selectedUserMessages,
  onAction,
}: {
  selectedUser: User;
  selectedUserMessages: UserMessage[];
  onAction: (
    actionType: "SEND_MESSAGE" | "DELETE_MESSAGE",
    payload: string
  ) => void;
}) {
  return (
    <div className="SelectedChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} />
      <MessageList
        selectedUserMessages={selectedUserMessages}
        onAction={
          onAction as (actionType: "DELETE_MESSAGE", payload: string) => void
        }
      />
      <SendMessageBox
        onAction={
          onAction as (actionType: "SEND_MESSAGE", payload: string) => void
        }
      />
    </div>
  );
}

export default SelectedChat;
