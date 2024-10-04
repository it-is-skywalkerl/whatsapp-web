import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendMessageBox from "../SendMessageBox";
import MessageList from "../../message-list/MessageList";
import { UserMessage } from "../../../../constant/types/common-types";
import "@testing-library/jest-dom";

describe("SendMessageBox and MessageList", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  test("send message and check if it's added to the message list", async () => {
    const mockDispatchMessages = jest.fn();
    const mockSelectedUserId = "user-123";

    let mockSelectedUserMessages: UserMessage[] = [
      { id: "msg-1", text: "First message", timeStamp: "" },
    ];

    const { rerender } = render(
      <>
        <MessageList
          isSpaciousMode={false}
          selectedUserId={mockSelectedUserId}
          selectedUserMessages={mockSelectedUserMessages}
          dispatchMessages={mockDispatchMessages}
        />
        <SendMessageBox
          dispatchMessages={mockDispatchMessages}
          selectedUserId={mockSelectedUserId}
        />
      </>
    );

    const input = screen.getByPlaceholderText("Type a message");
    const sendButton = screen.getByRole("button", { name: /send/i });

    await userEvent.type(input, "New test message");
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(mockDispatchMessages).toHaveBeenCalledWith({
        type: "SEND_MESSAGE",
        payload: {
          selectedUserId: mockSelectedUserId,
          newMessageText: "New test message",
        },
      });
    });

    mockSelectedUserMessages = [
      ...mockSelectedUserMessages,
      { id: "msg-2", text: "New test message", timeStamp: "" },
    ];

    rerender(
      <MessageList
        isSpaciousMode={false}
        selectedUserId={mockSelectedUserId}
        selectedUserMessages={mockSelectedUserMessages}
        dispatchMessages={mockDispatchMessages}
      />
    );

    expect(screen.getByText("New test message")).toBeInTheDocument();
  });
});

describe("MessageList Edit Functionality", () => {
  const mockDispatch = jest.fn();
  const mockMessages: UserMessage[] = [
    { id: "1", text: "First message", timeStamp: "12:00" },
    { id: "2", text: "Second message", timeStamp: "12:05" },
  ];

  test("open edit modal on clicking Edit button", () => {
    render(
      <MessageList
        isSpaciousMode={false}
        selectedUserId="user-1"
        selectedUserMessages={mockMessages}
        dispatchMessages={mockDispatch}
      />
    );

    const editButtons = screen.getAllByRole("button", { name: "Edit" });
    fireEvent.click(editButtons[0]);

    expect(screen.getByRole("heading", { name: "Edit" })).toBeInTheDocument();
  });
});

describe("MessageList Delete Functionality", () => {
  const mockDispatch = jest.fn();
  const mockMessages: UserMessage[] = [
    { id: "1", text: "First message", timeStamp: "12:00" },
    { id: "2", text: "Second message", timeStamp: "12:05" },
  ];

  test("open delete modal on clicking Delete button", () => {
    render(
      <MessageList
        isSpaciousMode={false}
        selectedUserId="user-1"
        selectedUserMessages={mockMessages}
        dispatchMessages={mockDispatch}
      />
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure you want to delete this message?")
    ).toBeInTheDocument();
  });
});
