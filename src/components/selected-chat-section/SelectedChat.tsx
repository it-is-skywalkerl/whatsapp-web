import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { User, UserMessage } from "../../constant/types/common-types";
import {
  handleMessageActionTypes,
  OnActionTypes,
} from "@/constant/types/onAction-types";

function SelectedChat({
  isSpaciousMode,
  selectedUser,
  selectedUserMessages,
  onAction,
  dispatchMessages,
}: {
  isSpaciousMode: boolean;
  selectedUser: User;
  selectedUserMessages: UserMessage[];
  onAction: (
    actionType: typeof OnActionTypes.DELETE_USER,
    payload: {
      [key: string]: number | string;
    }
  ) => void;
  dispatchMessages: React.Dispatch<{
    type: keyof typeof handleMessageActionTypes;
    payload: {
      selectedUserId: string;
      newMessageText?: string;
      selectedMessageId?: string;
      editedMessageText?: string;
    };
  }>;
}) {
  return (
    <div className="SelectedChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} onAction={onAction} />

      <MessageList
        isSpaciousMode={isSpaciousMode}
        selectedUserId={selectedUser.id}
        selectedUserMessages={selectedUserMessages}
        dispatchMessages={dispatchMessages}
      />

      <SendMessageBox
        dispatchMessages={dispatchMessages}
        selectedUserId={selectedUser.id}
      />
    </div>
  );
}

export default SelectedChat;
