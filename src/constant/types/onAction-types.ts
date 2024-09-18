export const OnActionTypes = {
  SEND_MESSAGE: "SEND_MESSAGE",
  EDIT_MESSAGE: "EDIT_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  SELECT_USER: "SELECT_USER",
  ADD_NEW_USER: "ADD_NEW_USER",
  DELETE_USER: "DELETE_USER",
  TOGGLE_VIEW: "TOGGLE_VIEW",
} as const;

export const handleMessageActionTypes = {
  SEND_MESSAGE: "SEND_MESSAGE",
  EDIT_MESSAGE: "EDIT_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
} as const;

export const handleUserActionTypes = {
  SELECT_USER: "SELECT_USER",
  ADD_NEW_USER: "ADD_NEW_USER",
  DELETE_USER: "DELETE_USER",
} as const;
