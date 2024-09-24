import { User, usersReducerPayloadType } from "../constant/types/common-types";
import { handleUserActionTypes } from "../constant/types/onAction-types";
import { saveUsersToLocalStorage } from "./localStorageUtils";
import { v4 as uuidv4 } from "uuid";

export function usersReducer(
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
