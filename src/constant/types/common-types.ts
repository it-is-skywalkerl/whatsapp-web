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
