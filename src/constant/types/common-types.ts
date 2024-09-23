import { handleMessageActionTypes, OnActionTypes } from "./onAction-types";

export interface User {
  id: string;
  name: string;
  profileImg: string;
}

export interface UserMessage {
  id: string;
  text: string;
  timeStamp: string;
}

export interface AllUserMessages {
  [userID: string]: UserMessage[];
}

export interface usersReducerPayloadType {
  selectedUser?: User;
  newUserName?: string;
  storedUsers?: User[];
}

export interface messagesReducerPayloadType {
  selectedUserId: string;
  newMessageText?: string;
  selectedMessageId?: string;
  editedMessageText?: string;
  storedMessages?: AllUserMessages;
}

export interface ModalDataObjType {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchMessages?: React.Dispatch<{
    type: keyof typeof handleMessageActionTypes;
    payload: messagesReducerPayloadType;
  }>;
  onAction?: (
    actionType:
      | typeof OnActionTypes.ADD_NEW_USER
      | typeof OnActionTypes.DELETE_USER,
    payload: {
      [key: string]: string;
    }
  ) => void;
  selectedUserId?: string;
  currentMessage?: UserMessage;
  setCurrentMessage?: React.Dispatch<React.SetStateAction<UserMessage | null>>;
}
