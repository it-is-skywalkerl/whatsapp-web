import { useState } from "react";
import SelectedChatHeader from "./selected-chat-header/SelectedChatHeader";
import MessageList from "./message-list/MessageList";
import SendMessageBox from "./send-message-box/SendMessageBox";
import "./styles.css";
import { AllUserMessages, User, UserMessage } from "@/types/common-types";

function SelectedChat({ selectedUser }: { selectedUser: User }) {
  const [messages, setMessages] = useState<AllUserMessages>({});

  function onAction(
    actionType: "sendMessage" | "deleteMessage",
    payload: string
  ) {
    switch (actionType) {
      case "sendMessage":
        if (payload.length > 0) {
          const timeStamp = new Date().toTimeString().split(" ")[0];
          const selectedUserMessageList: UserMessage[] =
            messages[selectedUser.id] ?? [];
          setMessages({
            ...messages,
            [selectedUser.id]: [
              ...selectedUserMessageList,
              { text: payload, timeStamp: timeStamp },
            ],
          });
          console.log("added");
        }
        break;

      case "deleteMessage":
        const selectedUserMessageList = messages[selectedUser.id].filter(
          (message: UserMessage) => message.timeStamp !== payload
        );
        setMessages({
          ...messages,
          [selectedUser.id]: selectedUserMessageList,
        });
        break;

      default:
        console.warn(`Unhandled action type: ${actionType}`);
    }
  }

  return (
    <div className="ChatSection">
      <div className="BackgroundImage"></div>
      <SelectedChatHeader selectedUser={selectedUser} />
      <MessageList
        selectedUser={selectedUser}
        messages={messages}
        onAction={onAction}
      />
      <SendMessageBox onAction={onAction} />
    </div>
  );
}

export default SelectedChat;
