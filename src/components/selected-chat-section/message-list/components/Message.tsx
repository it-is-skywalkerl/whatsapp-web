import { UserMessage } from "@/constant/types/common-types";

function Message({
  isSpaciousMode,
  message,
  setCurrentMessage,
  setEditModalOpen,
  setDeleteModalOpen,
}: {
  isSpaciousMode: boolean;
  message: UserMessage;
  setCurrentMessage: React.Dispatch<React.SetStateAction<UserMessage | null>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function openEditModal(message: UserMessage) {
    setCurrentMessage(message);
    setEditModalOpen(true);
  }

  function openDeleteModal(message: UserMessage) {
    setCurrentMessage(message);
    setDeleteModalOpen(true);
  }
  return (
    <div key={message.id} className="Message">
      <div className="MessageOptions">
        <div className="EditDiv">
          <button className="EditButton" onClick={() => openEditModal(message)}>
            Edit
          </button>
        </div>
        <div className="DeleteDiv">
          <button
            className="DeleteButton"
            onClick={() => openDeleteModal(message)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="MessageText">
        <div className="messageText">{message.text}</div>
        {isSpaciousMode && (
          <div className="TimeStamp">{message.timeStamp.slice(0, 5)}</div>
        )}
      </div>
    </div>
  );
}

export default Message;
