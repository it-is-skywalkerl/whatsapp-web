import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useState } from "react";
import { AllUserMessages, User, UserMessage } from "./types/common-types";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AllUserMessages>({});
  const [users, setUsers] = useState<User[]>([]);

  function handleMessages(
    // Convert this Constants in seperate file and use them everywhere
    /*
      1. If we need to change the key it will be convenient to chang at one place
      2. We should avoid typos in code base as it is quite obvious to make type while defining string
      3. Explore keyof typeof for giving types
    */
    actionType: "SEND_MESSAGE" | "EDIT_MESSAGE" | "DELETE_MESSAGE",
    // payload: { [key: string]: string |  }
    payload: string | number | [number, string]
  ) {
    if (selectedUser)
      switch (actionType) {
        case "SEND_MESSAGE":
          payload = payload.toString();
          if (payload.length > 0) {
            const timeStamp = new Date().toTimeString().split(" ")[0];
            const selectedUserMessageList: UserMessage[] =
              messages[selectedUser.id] ?? [];
            const messageId =
              selectedUserMessageList.length > 0
                ? selectedUserMessageList[selectedUserMessageList.length - 1]
                    .id + 1
                : 0;
            setMessages({
              ...messages,
              [selectedUser.id]: [
                ...selectedUserMessageList,
                { id: messageId, text: payload, timeStamp: timeStamp },
              ],
            });
          }
          break;

        case "EDIT_MESSAGE":
          {
            // remove check 
            if (Array.isArray(payload)) {
              const selectedUserMessageList = messages[selectedUser.id].map(
                (message: UserMessage) =>
                  message.id === (payload as [number, string])[0]
                    ? { ...message, text: (payload as [number, string])[1] }
                    : message
              );
              setMessages({
                ...messages,
                [selectedUser.id]: selectedUserMessageList,
              });
            }
          }
          break;

        case "DELETE_MESSAGE":
          {
            const selectedUserMessageList = messages[selectedUser.id].filter(
              (message: UserMessage) => message.id !== payload
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
          const USER = users.find((connection) => connection.id === payload);
          if (USER !== undefined) {
            setSelectedUser(USER);
          }
        }
        break;
    }
  }

  function onAction(
    actionType:
      | "SEND_MESSAGE"
      | "EDIT_MESSAGE"
      | "DELETE_MESSAGE"
      | "SELECT_USER",
    payload: string | number
  ) {
    switch (actionType) {
      case "SEND_MESSAGE":
        handleMessages(actionType, payload);
        break;

      case "EDIT_MESSAGE":
        handleMessages(actionType, payload);
        break;

      case "DELETE_MESSAGE":
        handleMessages(actionType, payload);
        break;

      case "SELECT_USER":
        payload = payload.toString();
        handleUser(actionType, payload);
        break;

      default:
        console.warn(`Unhandled action type: ${actionType}`);
    }
  }

  return (
    <div className="MainApp">
      <Chats
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        messages={messages}
        setMessages={setMessages}
        onAction={
          onAction as (actionType: "SELECT_USER", payload: string) => void
        }
      />
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
