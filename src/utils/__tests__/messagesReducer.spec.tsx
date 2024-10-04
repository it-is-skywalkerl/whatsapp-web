import { messagesReducer } from "../messagesReducer";
import { AllUserMessages } from "@/constant/types/common-types";
import { handleMessageActionTypes } from "@/constant/types/onAction-types";

describe("messagesReducer", () => {
  let initialMessages: AllUserMessages;

  beforeEach(() => {
    initialMessages = {
      "user-1": [
        { id: "msg-1", text: "First message", timeStamp: "12:00" },
        { id: "msg-2", text: "Second message", timeStamp: "12:05" },
      ],
      "user-2": [],
    };
  });

  it("should handle SEND_MESSAGE action", () => {
    const action = {
      type: handleMessageActionTypes.SEND_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        newMessageText: "New test message",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState["user-1"]).toHaveLength(3);
    expect(newState["user-1"][2]).toMatchObject({
      text: "New test message",
    });
  });

  it("should not send a message if newMessageText is empty", () => {
    const action = {
      type: handleMessageActionTypes.SEND_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        newMessageText: "",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState).toEqual(initialMessages);
  });

  it("should handle EDIT_MESSAGE action", () => {
    const action = {
      type: handleMessageActionTypes.EDIT_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        selectedMessageId: "msg-1",
        editedMessageText: "Edited message",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState["user-1"][0]).toMatchObject({
      text: "Edited message",
    });
  });

  it("should not edit a message if the selectedMessageId does not exist", () => {
    const action = {
      type: handleMessageActionTypes.EDIT_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        selectedMessageId: "non-existent-id",
        editedMessageText: "Edited message",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState).toEqual(initialMessages);
  });

  it("should handle DELETE_MESSAGE action", () => {
    const action = {
      type: handleMessageActionTypes.DELETE_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        selectedMessageId: "msg-1",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState["user-1"]).toHaveLength(1);
    expect(newState["user-1"][0]).toMatchObject({
      id: "msg-2",
    });
  });

  it("should not delete a message if the selectedMessageId does not exist", () => {
    const action = {
      type: handleMessageActionTypes.DELETE_MESSAGE,
      payload: {
        selectedUserId: "user-1",
        selectedMessageId: "non-existent-id",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState).toEqual(initialMessages);
  });

  it("should handle DELETE_USER_ALL_MESSAGES action", () => {
    const action = {
      type: handleMessageActionTypes.DELETE_USER_ALL_MESSAGES,
      payload: {
        selectedUserId: "user-1",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState).not.toHaveProperty("user-1");
    expect(newState).toHaveProperty("user-2");
  });

  it("should handle ADD_NEW_USER_MESSAGES action", () => {
    const action = {
      type: handleMessageActionTypes.ADD_NEW_USER_MESSAGES,
      payload: {
        selectedUserId: "user-3",
      },
    };

    const newState = messagesReducer(initialMessages, action);

    expect(newState).toHaveProperty("user-3");
    expect(newState["user-3"]).toEqual([]);
  });
});
