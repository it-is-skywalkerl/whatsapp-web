import { UserMessage } from "@/types/common-types";
import "./styles.css";
import { useState } from "react";

function MessageList({
  selectedUserMessages,
  onAction,
}: {
  selectedUserMessages: UserMessage[];
  onAction: (actionType: "EDIT_MESSAGE" | "DELETE_MESSAGE", payload: number | [number, string]) => void;
}) {
  console.log("rendering message list component");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<UserMessage | null>(null);
  const [editedText, setEditedText] = useState("");

  function openEditModal(message: UserMessage) {
    setCurrentMessage(message); // Set the message to be edited
    setEditedText(message.text); // Set the initial value of the modal input
    setModalOpen(true); // Open the modal
  }

  function closeEditModal() {
    setModalOpen(false); // Close the modal
    setCurrentMessage(null); // Clear the current message
  }

  function saveMessage() {
    if (currentMessage) {
      onAction("EDIT_MESSAGE", [currentMessage.id, editedText]);
      closeEditModal(); // Close the modal after saving
    }
  }

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
            <div className="MessageOptions">
              <div className="EditDiv">
                <button
                  className="EditButton"
                  onClick={() => openEditModal(message)}
                >
                  Edit
                </button>
              </div>
              <div className="DeleteDiv">
                <button
                  className="DeleteButton"
                  onClick={() => deleteMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="MessageText">
              <div className="messageText">{message.text}</div>
              <div className="TimeStamp">{message.timeStamp.slice(0, 5)}</div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="Modal">
          <div className="ModalContent">
            <h2>Edit Message</h2>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)} // Update state with new text
            />
            <div className="ModalActions">
              <button onClick={saveMessage}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
