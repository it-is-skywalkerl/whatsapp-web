export interface User {
  id: string;
  name: string;
  profileImg: string;
}

export interface UserMessage {
  id: number;
  text: string;
  timeStamp: string;
}

export interface AllUserMessages {
  [userID: string]: UserMessage[];
}
