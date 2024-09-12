import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useState } from "react";
import { AllUserMessages, User, UserMessage } from "./types/common-types";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AllUserMessages>({});

  function onAction(
    actionType: "sendMessage" | "deleteMessage",
    payload: string
  ) {
    if (selectedUser)
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
          {
            const selectedUserMessageList = messages[selectedUser.id].filter(
              (message: UserMessage) => message.timeStamp !== payload
            );
            setMessages({
              ...messages,
              [selectedUser.id]: selectedUserMessageList,
            });
          }
          break;

        default:
          console.warn(`Unhandled action type: ${actionType}`);
      }
  }

  return (
    <div className="MainApp">
      <Chats selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <SelectedChat
          selectedUser={selectedUser}
          messages={messages}
          onAction={onAction}
        />
      ) : (
        <DefaultUnselectedChatDisplay />
      )}
    </div>
  );
}

export default App;
