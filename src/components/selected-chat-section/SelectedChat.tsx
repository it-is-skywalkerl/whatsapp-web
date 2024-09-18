import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { User, UserMessage } from "@/types/common-types";
import {
  handleMessageActionTypes,
  OnActionTypes,
} from "@/constant/types/onAction-types";

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
    actionType:
      | keyof typeof handleMessageActionTypes
      | typeof OnActionTypes.DELETE_USER,
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
            actionType:
              | typeof OnActionTypes.EDIT_MESSAGE
              | typeof OnActionTypes.DELETE_MESSAGE,
            payload: number | [number, string]
          ) => void
        }
      />

      <SendMessageBox
        onAction={
          onAction as (
            actionType: typeof OnActionTypes.SEND_MESSAGE,
            payload: string
          ) => void
        }
      />
    </div>
  );
}

export default SelectedChat;
