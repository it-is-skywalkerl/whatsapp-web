import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useState } from "react";
import { AllUserMessages, User, UserMessage } from "./types/common-types";
import { CONNECTIONS } from "./constant/connections";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AllUserMessages>({});

  function handleMessages(actionType: "SEND_MESSAGE" | "DELETE_MESSAGE", payload: string) {
    if (selectedUser)
      switch (actionType) {
        case "SEND_MESSAGE":
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
          }
          break;

        case "DELETE_MESSAGE":
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
      }
  }

  function handleUser(actionType: "SELECT_USER", payload: string) {
    switch (actionType) {
      case "SELECT_USER":
        {
          const USER = CONNECTIONS.find(
            (connection) => connection.id === payload
          );
          if (USER !== undefined) {
            setSelectedUser(USER);
          }
        }
        break;
    }
  }

  function onAction(
    actionType: "SEND_MESSAGE" | "DELETE_MESSAGE" | "SELECT_USER",
    payload: string
  ) {
    switch (actionType) {
      case "SEND_MESSAGE":
        handleMessages(actionType, payload);
        break;

      case "DELETE_MESSAGE":
        handleMessages(actionType, payload);
        break;

      case "SELECT_USER":
        handleUser(actionType, payload);
        break;

      default:
        console.warn(`Unhandled action type: ${actionType}`);
    }
  }

  return (
    <div className="MainApp">
      <Chats selectedUser={selectedUser} onAction={onAction as (actionType: "SELECT_USER", payload: string) => void} />
      {selectedUser ? (
        <SelectedChat
          selectedUser={selectedUser}
          selectedUserMessages={messages[selectedUser.id]}
          onAction={onAction}
        />
      ) : (
        <DefaultUnselectedChatDisplay />
      )}
    </div>
  );
}

export default App;
