import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
} from "@/constant/types/onAction-types";
import "@testing-library/jest-dom";

interface UserMessage {
  id: string;
  text: string;
  timeStamp: string;
}

describe("Modal Component", () => {
  const baseDataObj = {
    selectedUserId: "user-1",
    currentMessage: {
      id: "message-1",
      text: "Existing message text",
      timeStamp: "2024-01-01T00:00:00Z",
    } as UserMessage,
    setModalOpen: jest.fn(),
    dispatchMessages: jest.fn(),
    onAction: jest.fn(),
    setCurrentMessage: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the header text", () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.EDIT_MESSAGE}
        headerText="Edit Message"
        dataObj={baseDataObj}
      />
    );

    expect(screen.getByText("Edit Message")).toBeInTheDocument();
  });

  test("shows a textarea when editing a message", () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.EDIT_MESSAGE}
        headerText="Edit Message"
        dataObj={baseDataObj}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("disables the Yes button when textarea is empty", () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.EDIT_MESSAGE}
        headerText="Edit Message"
        dataObj={baseDataObj}
      />
    );

    const yesButton = screen.getByText("Yes");
    expect(yesButton).toBeDisabled();
  });

  test("enables Yes button when textarea has input", async () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.EDIT_MESSAGE}
        headerText="Edit Message"
        dataObj={baseDataObj}
      />
    );
    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "Updated message text");

    const yesButton = screen.getByText("Yes");
    expect(yesButton).toBeEnabled();
  });

  test("calls dispatchMessages with correct parameters on Yes for editing a message", async () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.EDIT_MESSAGE}
        headerText="Edit Message"
        dataObj={baseDataObj}
      />
    );

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "Updated message text");

    const yesButton = screen.getByText("Yes");
    await userEvent.click(yesButton);

    expect(baseDataObj.dispatchMessages).toHaveBeenCalledWith({
      type: handleMessageActionTypes.EDIT_MESSAGE,
      payload: {
        selectedUserId: baseDataObj.selectedUserId,
        selectedMessageId: baseDataObj.currentMessage.id,
        editedMessageText: "Updated message text",
      },
    });
    expect(baseDataObj.setModalOpen).toHaveBeenCalledWith(false);
    expect(baseDataObj.setCurrentMessage).toHaveBeenCalledWith(null);
  });

  test("calls dispatchMessages with correct parameters on Yes for deleting a message", async () => {
    render(
      <Modal
        modalType={handleMessageActionTypes.DELETE_MESSAGE}
        headerText="Delete Message"
        dataObj={baseDataObj}
      />
    );

    const yesButton = screen.getByText("Yes");
    await userEvent.click(yesButton);

    expect(baseDataObj.dispatchMessages).toHaveBeenCalledWith({
      type: handleMessageActionTypes.DELETE_MESSAGE,
      payload: {
        selectedUserId: baseDataObj.selectedUserId,
        selectedMessageId: baseDataObj.currentMessage.id,
      },
    });
    expect(baseDataObj.setModalOpen).toHaveBeenCalledWith(false);
  });

  test("calls onAction with correct parameters on Yes for adding a new user", async () => {
    render(
      <Modal
        modalType={handleUserActionTypes.ADD_NEW_USER}
        headerText="Add New User"
        dataObj={baseDataObj}
      />
    );

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "New User");

    const yesButton = screen.getByText("Yes");
    await userEvent.click(yesButton);

    expect(baseDataObj.onAction).toHaveBeenCalledWith(
      handleUserActionTypes.ADD_NEW_USER,
      {
        newUserName: "New User",
      }
    );
    expect(baseDataObj.setModalOpen).toHaveBeenCalledWith(false);
  });

  test("calls onAction with correct parameters on Yes for deleting a user", async () => {
    render(
      <Modal
        modalType={handleUserActionTypes.DELETE_USER}
        headerText="Delete User"
        dataObj={baseDataObj}
      />
    );

    const yesButton = screen.getByText("Yes");
    await userEvent.click(yesButton);

    expect(baseDataObj.onAction).toHaveBeenCalledWith(
      handleUserActionTypes.DELETE_USER,
      {}
    );
    expect(baseDataObj.setModalOpen).toHaveBeenCalledWith(false);
  });

  test("displays error message when textarea is empty and Yes is clicked", () => {
    render(
      <Modal
        modalType={handleUserActionTypes.ADD_NEW_USER}
        headerText="Add New User"
        dataObj={baseDataObj}
      />
    );

    const yesButton = screen.getByText("Yes");
    userEvent.click(yesButton);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("closes the modal when Cancel button is clicked", async () => {
    render(
      <Modal
        modalType={handleUserActionTypes.ADD_NEW_USER}
        headerText="Add New User"
        dataObj={baseDataObj}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(baseDataObj.setModalOpen).toHaveBeenCalledWith(false);
  });
});
