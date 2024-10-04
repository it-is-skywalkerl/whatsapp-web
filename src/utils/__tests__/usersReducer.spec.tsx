import { usersReducer } from "../usersReducer";
import { handleUserActionTypes } from "@/constant/types/onAction-types";
import { saveUsersToLocalStorage } from "../localStorageUtils";

jest.mock("../localStorageUtils");

describe("usersReducer", () => {
  const initialUsers = [
    {
      id: "user-1",
      name: "Alice",
      profileImg: "https://ui-avatars.com/api/?name=Alice",
    },
    {
      id: "user-2",
      name: "Bob",
      profileImg: "https://ui-avatars.com/api/?name=Bob",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add a new user when ADD_NEW_USER action is dispatched", () => {
    const newUserName = "Charlie";
    const action = {
      type: handleUserActionTypes.ADD_NEW_USER,
      payload: { newUserName },
    };

    const newState = usersReducer(initialUsers, action);

    expect(newState).toHaveLength(initialUsers.length + 1);
    expect(newState).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: newUserName })])
    );
  });

  test("should not add a new user if newUserName is not provided", () => {
    const action = {
      type: handleUserActionTypes.ADD_NEW_USER,
      payload: { newUserName: "" },
    };

    const newState = usersReducer(initialUsers, action);

    expect(newState).toEqual(initialUsers);
  });

  test("should delete a user when DELETE_USER action is dispatched", () => {
    const action = {
      type: handleUserActionTypes.DELETE_USER,
      payload: { selectedUser: initialUsers[0] },
    };

    const newState = usersReducer(initialUsers, action);

    expect(newState).toHaveLength(initialUsers.length - 1);
    expect(newState).not.toEqual(expect.arrayContaining([initialUsers[0]]));
  });

  test("should not modify the state if DELETE_USER action is dispatched with a user not in the list", () => {
    const action = {
      type: handleUserActionTypes.DELETE_USER,
      payload: {
        selectedUser: {
          id: "non-existent",
          name: "Non-existent",
          profileImg: "",
        },
      },
    };

    const newState = usersReducer(initialUsers, action);

    expect(newState).toEqual(initialUsers);
  });

  test("should save the updated users to local storage after adding a new user", () => {
    const newUserName = "Charlie";
    const action = {
      type: handleUserActionTypes.ADD_NEW_USER,
      payload: { newUserName },
    };

    const newState = usersReducer(initialUsers, action);

    expect(saveUsersToLocalStorage).toHaveBeenCalledWith(newState);
    expect(newState).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: newUserName })])
    );
  });

  test("should save the updated users to local storage after deleting a user", () => {
    const action = {
      type: handleUserActionTypes.DELETE_USER,
      payload: { selectedUser: initialUsers[0] },
    };

    usersReducer(initialUsers, action);

    expect(saveUsersToLocalStorage).toHaveBeenCalledWith(
      expect.not.arrayContaining([initialUsers[0]])
    );
  });
});
