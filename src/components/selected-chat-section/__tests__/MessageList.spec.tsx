import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendMessageBox from "../send-message-box/SendMessageBox";
import MessageList from "../message-list/MessageList";
import { UserMessage } from "../../../constant/types/common-types";
import "@testing-library/jest-dom";

const mockDispatchMessages = jest.fn();
const mockSelectedUserId = "user-123";
let mockSelectedUserMessages: UserMessage[];

const renderComponents = () => {
  render(
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
};

describe("SendMessageBox and MessageList", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    mockSelectedUserMessages = [
      { id: "msg-1", text: "First message", timeStamp: "" },
    ];
    mockDispatchMessages.mockClear();
  });

  test("send message and check if it's added to the message list", async () => {
    renderComponents();

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

    mockSelectedUserMessages.push({
      id: "msg-2",
      text: "New test message",
      timeStamp: "",
    });

    renderComponents();

    expect(screen.getByText("New test message")).toBeInTheDocument();
  });
});

describe("MessageList Functionality", () => {
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
        dispatchMessages={mockDispatchMessages}
      />
    );

    const editButton = screen.getAllByRole("button", { name: "Edit" })[0];
    fireEvent.click(editButton);

    expect(screen.getByRole("heading", { name: "Edit" })).toBeInTheDocument();
  });

  test("open delete modal on clicking Delete button", () => {
    render(
      <MessageList
        isSpaciousMode={false}
        selectedUserId="user-1"
        selectedUserMessages={mockMessages}
        dispatchMessages={mockDispatchMessages}
      />
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure you want to delete this message?")
    ).toBeInTheDocument();
  });
});
