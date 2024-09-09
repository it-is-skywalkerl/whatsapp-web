import "./styles.css"

function MessageList({ selectedUser, messages, setMessages }: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  }, messages: {
    [key: string]: {
      text: string;
      timeStamp: string;
    }[];
  }, setMessages: React.Dispatch<React.SetStateAction<{
    [key: string]: {
      text: string;
      timeStamp: string;
    }[];
  }>>
}) {

  function deleteMessage(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.target);
    const currentUserMessageList = messages[selectedUser.id].filter((message: { text: string, timeStamp: string }) => message.timeStamp !== event.target.id)
    const newMessage = { ...messages, [selectedUser.id]: currentUserMessageList }
    setMessages(newMessage);
  }

  return (
    <div className="MessageList">
      <p className="EncryptionMessage"><i className='bx bxs-lock-alt' ></i>Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.</p>
      {messages[selectedUser.id]?.map((message: { text: string, timeStamp: string }) => (
        <div key={message.timeStamp} className="Message">
          <button className="DeleteButton" id={message.timeStamp} onClick={deleteMessage}>Delete</button>
          <div className="MessageText">
            <p>{message.text}</p>
            <span className="Gap"></span>
            <p className="TimeStamp">{message.timeStamp.slice(0, 5)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList