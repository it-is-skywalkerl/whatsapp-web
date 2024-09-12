import { User } from "@/types/common-types";
import "./styles.css";

function MessageList({
  selectedUser,
  messages,
  setMessages,
}: {
  selectedUser: User;
  messages: {
    [key: string]: {
      text: string;
      timeStamp: string;
    }[];
  };
  setMessages: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        text: string;
        timeStamp: string;
      }[];
    }>
  >;
}) {
  function deleteMessage(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.target);
    const currentUserMessageList = messages[selectedUser.id].filter(
      (message: { text: string; timeStamp: string }) =>
        message.timeStamp !== event.target.id
    );
    const newMessage = {
      ...messages,
      [selectedUser.id]: currentUserMessageList,
    };
    setMessages(newMessage);
  }

  return (
    <div className="MessagesSection">
      <p className="EncryptionMessage">
        <i className="bx bxs-lock-alt"></i>Messages are end-to-end encrypted. No
        one outside of this chat, not even WhatsApp, can read or listen to them.
        Click to learn more.
      </p>
      <div className="MessageList">
        {messages[selectedUser.id]?.map(
          (message: { text: string; timeStamp: string }) => (
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
          )
        )}
      </div>
    </div>
  );
}

export default MessageList;
