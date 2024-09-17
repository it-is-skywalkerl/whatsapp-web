import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { User, UserMessage } from "@/types/common-types";

function SelectedChat({
  isSpaciousMode,
  selectedUser,
  selectedUserMessages,
  onAction,
}: {
  isSpaciousMode: boolean;
  selectedUser: User;
  selectedUserMessages: UserMessage[];
  onAction: (
    actionType: "SEND_MESSAGE" | "DELETE_MESSAGE" | "DELETE_USER",
    payload: string | number
  ) => void;
}) {
  return (
    <div className="SelectedChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} onAction={onAction} />
      <MessageList
        isSpaciousMode={isSpaciousMode}
        selectedUserMessages={selectedUserMessages}
        onAction={
          onAction as (
            actionType: "EDIT_MESSAGE" | "DELETE_MESSAGE",
            payload: number | [number, string]
          ) => void
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
