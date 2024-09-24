import {
  AllUserMessages,
  messagesReducerPayloadType,
  UserMessage,
} from "../constant/types/common-types";
import { handleMessageActionTypes } from "../constant/types/onAction-types";
import { saveMessagesToLocalStorage } from "./localStorageUtils";
import { v4 as uuidv4 } from "uuid";

export function messagesReducer(
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
