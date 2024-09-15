import { UserMessage } from "@/types/common-types";
import "./styles.css";

function MessageList({
  selectedUserMessages,
  onAction,
}: {
  selectedUserMessages: UserMessage[];
  onAction: (actionType: "DELETE_MESSAGE", payload: number) => void;
}) {
  function deleteMessage(id: number) {
    onAction("DELETE_MESSAGE", id);
  }

  return (
    <div className="MessagesSection">
      <p className="EncryptionMessage">
        <i className="bx bxs-lock-alt"></i>Messages are end-to-end encrypted. No
        one outside of this chat, not even WhatsApp, can read or listen to them.
        Click to learn more.
      </p>
      <div className="MessageList">
        {selectedUserMessages?.map((message: UserMessage) => (
          <div key={message.id} className="Message">
            <div className="DeleteDiv">
              <button
                className="DeleteButton"
                onClick={() => deleteMessage(message.id)}
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
