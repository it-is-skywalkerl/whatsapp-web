export interface User {
  id: string;
  name: string;
  profileImg: string;
}

export interface UserMessage {
  text: string;
  timeStamp: string;
}

export interface AllUserMessages {
  [userID: string]: UserMessage[];
}
