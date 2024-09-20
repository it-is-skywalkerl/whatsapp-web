import { useState } from "react";
import "./styles.css";

function AddContact({
  onAction,
}: {
  onAction: (actionType: "ADD_NEW_USER", payload: string) => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactName, setcontactName] = useState("");

  function openContactModal() {
    setModalOpen(true);
  }

  function closeContactModal() {
    setModalOpen(false);
  }

  function startNewChat() {
    onAction("ADD_NEW_USER", contactName);
    setcontactName("");
    setModalOpen(false);
  }
  return (
    <div>
      <button onClick={openContactModal}>Start new chat</button>
      {isModalOpen && (
        <div className="Modal">
          <div className="ModalContent">
            <textarea
              value={contactName}
              onChange={(e) => setcontactName(e.target.value)} // Update state with new text
            />
            <div className="ModalActions">
              <button onClick={startNewChat}>Start new chat</button>
              <button onClick={closeContactModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddContact;
