import { User } from "../constant/types/common-types";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
  OnActionTypes,
} from "../constant/types/onAction-types";
import {
  getMessagesFromLocalStorage,
  getUsersFromLocalStorage,
} from "../utils/localStorageUtils";
import { messagesReducer } from "../utils/messagesReducer";
import { usersReducer } from "../utils/usersReducer";
import { useReducer, useState } from "react";

export const useWhatsappActions = () => {
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

  const onAction = (
    actionType: keyof typeof OnActionTypes,
    payload: {
      [key: string]: string;
    }
  ) => {
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
  };

  return {
    messages,
    users,
    selectedUser,
    isSpaciousMode,
    onAction,
    dispatchMessages,
  };
};
