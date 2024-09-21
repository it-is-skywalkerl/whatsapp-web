import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useEffect, useReducer, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

function messagesReducer(
  messages: AllUserMessages,
  action: {
    type: keyof typeof handleMessageActionTypes;
    payload: {
      selectedUserId: string;
      newMessageText?: string;
      selectedMessageId?: string;
      editedMessageText?: string;
      storedMessages?: AllUserMessages;
    };
  }
): AllUserMessages {
  switch (action.type) {
    case handleMessageActionTypes.SYNC_WITH_LOCAL_STORAGE_MESSAGES:
      return action.payload.storedMessages ?? messages;

    case handleMessageActionTypes.SEND_MESSAGE:
      if (action.payload.newMessageText) {
        const selectedUserMessageList =
          messages[action.payload.selectedUserId] ?? [];
        const timeStamp = new Date().toTimeString().split(" ")[0];
        const messageId = uuidv4();
        return {
          ...messages,
          [action.payload.selectedUserId]: [
            ...selectedUserMessageList,
            { id: messageId, text: action.payload.newMessageText, timeStamp },
          ],
        };
      }
      return messages;

    case handleMessageActionTypes.EDIT_MESSAGE: {
      const selectedUserMessageList = messages[
        action.payload.selectedUserId
      ].map((message: UserMessage) =>
        message.id === action.payload.selectedMessageId
          ? { ...message, text: action.payload.editedMessageText ?? "" }
          : message
      );
      return {
        ...messages,
        [action.payload.selectedUserId]: selectedUserMessageList,
      };
    }

    case handleMessageActionTypes.DELETE_MESSAGE: {
      const selectedUserMessageList = messages[
        action.payload.selectedUserId
      ].filter(
        (message: UserMessage) =>
          message.id !== action.payload.selectedMessageId
      );
      return {
        ...messages,
        [action.payload.selectedUserId]: selectedUserMessageList,
      };
    }

    case handleMessageActionTypes.DELETE_USER_ALL_MESSAGES: {
      return Object.entries(messages).reduce((acc, [key, value]) => {
        if (key !== action.payload.selectedUserId) {
          acc[key] = value;
        }
        return acc;
      }, {} as AllUserMessages);
    }

    case handleMessageActionTypes.ADD_NEW_USER_MESSAGES: {
      return { ...messages, [action.payload.selectedUserId]: [] };
    }

    default:
      return messages;
  }
}

function usersReducer(
  users: User[],
  action: {
    type: keyof typeof handleUserActionTypes;
    payload: {
      selectedUser?: User;
      newUserName?: string;
      storedUsers?: User[];
    };
  }
): User[] {
  switch (action.type) {
    case handleUserActionTypes.SYNC_WITH_LOCAL_STORAGE_USERS:
      return action.payload.storedUsers ?? users;

    case handleUserActionTypes.ADD_NEW_USER:
      if (action.payload.newUserName) {
        const newUserId = uuidv4();
        const newUser = {
          id: newUserId + "",
          name: action.payload.newUserName,
          profileImg: `https://ui-avatars.com/api/?name=${action.payload.newUserName}`,
        };
        return [...users, newUser];
      }
      return users;

    case handleUserActionTypes.DELETE_USER:
      return users.filter((user: User) => user !== action.payload.selectedUser);

    default:
      return users;
  }
}

function App() {
  const [messages, dispatchMessages] = useReducer(messagesReducer, {});
  const [users, dispatchUsers] = useReducer(usersReducer, []);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSpaciousMode, setIsSpaciousMode] = useState<boolean>(true);

  useEffect(() => {
    const storedMessages = getMessagesFromLocalStorage();
    const storedUsers = getUsersFromLocalStorage();
    if (Object.keys(storedMessages).length > 0)
      dispatchMessages({
        type: handleMessageActionTypes.SYNC_WITH_LOCAL_STORAGE_MESSAGES,
        payload: { selectedUserId: "", storedMessages: storedMessages },
      });
    if (Object.keys(storedUsers).length > 0)
      dispatchUsers({
        type: handleUserActionTypes.SYNC_WITH_LOCAL_STORAGE_USERS,
        payload: { storedUsers: storedUsers },
      });
  }, []);

  useEffect(() => {
    saveMessagesToLocalStorage(messages);
  }, [messages]);

  useEffect(() => {
    saveUsersToLocalStorage(users);
  }, [users]);

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
          dispatchUsers({
            type: handleUserActionTypes.ADD_NEW_USER,
            payload: { newUserName: payload },
          });
        }
        break;

      case handleUserActionTypes.DELETE_USER:
        if (selectedUser) {
          dispatchUsers({
            type: handleUserActionTypes.DELETE_USER,
            payload: { selectedUser: selectedUser },
          });
          dispatchMessages({
            type: handleMessageActionTypes.DELETE_USER_ALL_MESSAGES,
            payload: { selectedUserId: selectedUser.id },
          });
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
          dispatchMessages={dispatchMessages}
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
