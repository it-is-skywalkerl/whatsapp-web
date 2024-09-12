import { User, UserMessage, AllUserMessages } from "@/types/common-types";
import "./styles.css";

function MessageList({
  selectedUser,
  messages,
  setMessages,
}: {
  selectedUser: User;
  messages: AllUserMessages;
  setMessages: React.Dispatch<React.SetStateAction<AllUserMessages>>;
}) {
  function deleteMessage(event: React.MouseEvent<HTMLButtonElement>) {
    const selectedUserMessageList = messages[selectedUser.id].filter(
      (message: UserMessage) => message.timeStamp !== event.target.id
    );
    setMessages({
      ...messages,
      [selectedUser.id]: selectedUserMessageList,
    });
  }

  return (
    <div className="MessagesSection">
      <p className="EncryptionMessage">
        <i className="bx bxs-lock-alt"></i>Messages are end-to-end encrypted. No
        one outside of this chat, not even WhatsApp, can read or listen to them.
        Click to learn more.
      </p>
      <div className="MessageList">
        {messages[selectedUser.id]?.map((message: UserMessage) => (
          <div key={message.timeStamp} className="Message">
            <div className="DeleteDiv">
              <button
                className="DeleteButton"
                id={message.timeStamp}
                onClick={deleteMessage}
              >
                Delete
              </button>
            </div>

            <div className="MessageText">
              <div className="messageText">{message.text}</div>
              <div className="TimeStamp">{message.timeStamp.slice(0, 5)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
