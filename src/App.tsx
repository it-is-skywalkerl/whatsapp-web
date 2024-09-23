import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useReducer, useState } from "react";
import {
  AllUserMessages,
  messagesReducerPayloadType,
  User,
  UserMessage,
  usersReducerPayloadType,
} from "./constant/types/common-types";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
  OnActionTypes,
} from "./constant/types/onAction-types";
import { v4 as uuidv4 } from "uuid";
import {
  getMessagesFromLocalStorage,
  getUsersFromLocalStorage,
  saveMessagesToLocalStorage,
  saveUsersToLocalStorage,
} from "./utils/localStorageUtils";

function messagesReducer(
  messages: AllUserMessages,
  action: {
    type: keyof typeof handleMessageActionTypes;
    payload: messagesReducerPayloadType;
  }
): AllUserMessages {
  let updatedMessages = messages;

  switch (action.type) {
    case handleMessageActionTypes.SEND_MESSAGE:
      if (action.payload.newMessageText) {
        const selectedUserMessageList =
          messages[action.payload.selectedUserId] ?? [];
        const timeStamp = new Date().toTimeString().split(" ")[0];
        const messageId = uuidv4();
        updatedMessages = {
          ...messages,
          [action.payload.selectedUserId]: [
            ...selectedUserMessageList,
            { id: messageId, text: action.payload.newMessageText, timeStamp },
          ],
        };
      }
      break;

    case handleMessageActionTypes.EDIT_MESSAGE:
      {
        const selectedUserMessageList = messages[
          action.payload.selectedUserId
        ].map((message: UserMessage) =>
          message.id === action.payload.selectedMessageId
            ? { ...message, text: action.payload.editedMessageText ?? "" }
            : message
        );
        updatedMessages = {
          ...messages,
          [action.payload.selectedUserId]: selectedUserMessageList,
        };
      }
      break;

    case handleMessageActionTypes.DELETE_MESSAGE:
      {
        const selectedUserMessageList = messages[
          action.payload.selectedUserId
        ].filter(
          (message: UserMessage) =>
            message.id !== action.payload.selectedMessageId
        );
        updatedMessages = {
          ...messages,
          [action.payload.selectedUserId]: selectedUserMessageList,
        };
      }
      break;

    case handleMessageActionTypes.DELETE_USER_ALL_MESSAGES:
      {
        updatedMessages = Object.entries(messages).reduce(
          (acc, [key, value]) => {
            if (key !== action.payload.selectedUserId) {
              acc[key] = value;
            }
            return acc;
          },
          {} as AllUserMessages
        );
      }
      break;

    case handleMessageActionTypes.ADD_NEW_USER_MESSAGES:
      {
        updatedMessages = { ...messages, [action.payload.selectedUserId]: [] };
      }
      break;

    default:
      console.warn("Unhandled message action type");
  }

  saveMessagesToLocalStorage(updatedMessages);
  return updatedMessages;
}

function usersReducer(
  users: User[],
  action: {
    type: keyof typeof handleUserActionTypes;
    payload: usersReducerPayloadType;
  }
): User[] {
  let updatedUsers = users;

  switch (action.type) {
    case handleUserActionTypes.ADD_NEW_USER:
      if (action.payload.newUserName) {
        const newUserId = uuidv4();
        const newUser = {
          id: newUserId + "",
          name: action.payload.newUserName,
          profileImg: `https://ui-avatars.com/api/?name=${action.payload.newUserName}`,
        };
        updatedUsers = [...users, newUser];
      }
      break;

    case handleUserActionTypes.DELETE_USER:
      updatedUsers = users.filter(
        (user: User) => user !== action.payload.selectedUser
      );
      break;

    default:
      console.warn("Unhandled user action type");
  }

  saveUsersToLocalStorage(updatedUsers);
  return updatedUsers;
}

function App() {
  const [messages, dispatchMessages] = useReducer(
    messagesReducer,
    getMessagesFromLocalStorage()
  );
  const [users, dispatchUsers] = useReducer(
    usersReducer,
    getUsersFromLocalStorage()
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSpaciousMode, setIsSpaciousMode] = useState<boolean>(true);

  function onAction(
    actionType: keyof typeof OnActionTypes,
    payload: {
      [key: string]: string;
    }
  ) {
    switch (actionType) {
      case OnActionTypes.SELECT_USER:
        {
          const USER = users.find((user) => user.id === payload.selectedUserId);
          if (USER !== undefined) {
            setSelectedUser(USER);
          }
        }
        break;

      case OnActionTypes.ADD_NEW_USER:
        {
          dispatchUsers({
            type: handleUserActionTypes.ADD_NEW_USER,
            payload: { newUserName: payload.newUserName.toString() },
          });
        }
        break;

      case OnActionTypes.DELETE_USER:
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
        selectedUserId={selectedUser?.id}
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
}

export default App;
