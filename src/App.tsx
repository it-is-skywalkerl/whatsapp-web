import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useEffect, useState } from "react";
import {
  AllUserMessages,
  User,
  UserMessage,
} from "./constant/types/common-types";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
  OnActionTypes,
} from "./constant/types/onAction-types";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AllUserMessages>({});
  const [users, setUsers] = useState<User[]>([]);
  const [isSpaciousMode, setIsSpaciousMode] = useState<boolean>(true);

  useEffect(() => {
    const storedMessages = getMessagesFromLocalStorage();
    const storedUsers = getUsersFromLocalStorage();
    if (Object.keys(storedMessages).length > 0) setMessages(storedMessages);
    if (Object.keys(storedUsers).length > 0) setUsers(storedUsers);
  }, []);

  useEffect(() => {
    saveMessagesToLocalStorage(messages);
  }, [messages]);

  useEffect(() => {
    saveUsersToLocalStorage(users);
  }, [users]);

  function handleMessages(
    actionType: keyof typeof handleMessageActionTypes,
    payload: string | number | [number, string]
  ) {
    if (selectedUser)
      switch (actionType) {
        case handleMessageActionTypes.SEND_MESSAGE:
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

        case handleMessageActionTypes.EDIT_MESSAGE:
          {
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
          break;

        case handleMessageActionTypes.DELETE_MESSAGE:
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

  function handleUser(
    actionType: keyof typeof handleUserActionTypes,
    payload: string
  ) {
    switch (actionType) {
      case handleUserActionTypes.SELECT_USER:
        {
          const USER = users.find((connection) => connection.id === payload);
          if (USER !== undefined) {
            setSelectedUser(USER);
          }
        }
        break;

      case handleUserActionTypes.ADD_NEW_USER:
        {
          const newUserId =
            users.length > 0 ? users[users.length - 1].id + 1 : 0;
          const newUser = {
            id: newUserId + "",
            name: payload,
            profileImg: `https://ui-avatars.com/api/?name=${payload}`,
          };
          if (users) {
            setUsers([...users, newUser]);
          } else {
            setUsers([newUser]);
          }
          setSelectedUser(newUser);
          setMessages({ ...messages, [newUser.id]: [] });
        }
        break;

      case handleUserActionTypes.DELETE_USER:
        if (selectedUser) {
          delete messages[selectedUser.id];
          setUsers(users.filter((user: User) => user !== selectedUser));
          setSelectedUser(null);
        }
        break;
    }
  }

  function onAction(
    actionType: keyof typeof OnActionTypes,
    payload: string | number
  ) {
    switch (actionType) {
      case OnActionTypes.SEND_MESSAGE:
      case OnActionTypes.EDIT_MESSAGE:
      case OnActionTypes.DELETE_MESSAGE:
        handleMessages(actionType, payload);
        break;

      case OnActionTypes.SELECT_USER:
      case OnActionTypes.ADD_NEW_USER:
      case OnActionTypes.DELETE_USER:
        payload = payload.toString();
        handleUser(actionType, payload);
        break;

      case OnActionTypes.TOGGLE_VIEW:
        setIsSpaciousMode(!isSpaciousMode);
        break;

      default:
        console.warn(`Unhandled action type: ${actionType}`);
    }
  }

  return (
    <div className="MainApp">
      <Chats
        isSpaciousMode={isSpaciousMode}
        users={users}
        selectedUser={selectedUser}
        messages={messages}
        onAction={onAction}
      />
      {selectedUser ? (
        <SelectedChat
          isSpaciousMode={isSpaciousMode}
          selectedUser={selectedUser}
          selectedUserMessages={messages[selectedUser.id]}
          onAction={onAction}
        />
      ) : (
        <DefaultUnselectedChatDisplay />
      )}
    </div>
  );

  function saveMessagesToLocalStorage(userMessages: AllUserMessages) {
    localStorage.setItem("messages", JSON.stringify(userMessages));
  }

  function getMessagesFromLocalStorage(): AllUserMessages {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : {};
  }

  function saveUsersToLocalStorage(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function getUsersFromLocalStorage(): User[] {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : {};
  }
}

export default App;
