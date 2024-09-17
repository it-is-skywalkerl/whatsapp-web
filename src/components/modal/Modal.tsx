import { useState } from "react";

function Modal({
  modalType,
  headerText,
  dataObj,
}: {
  modalType: "EDIT_MESSAGE" | "DELETE_MESSAGE" | "ADD_NEW_USER";
  headerText: string;
  dataObj: { [key: string]: any };
}) {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  function closeEditModal() {
    dataObj.setModalOpen(false);
    dataObj.setCurrentMessage(null);
  }

  function saveMessage() {
    if (dataObj.currentMessage) {
      dataObj.onAction("EDIT_MESSAGE", [
        dataObj.currentMessage.id,
        textAreaValue,
      ]);
      closeEditModal();
    }
  }

  function closeContactModal() {
    dataObj.setModalOpen(false);
  }

  function startNewChat() {
    dataObj.onAction("ADD_NEW_USER", textAreaValue);
    closeContactModal();
  }

  function closeModal() {
    switch (modalType) {
      case "EDIT_MESSAGE":
        closeEditModal();
        break;
      case "ADD_NEW_USER":
        closeContactModal();
        break;
      default:
        console.warn("Unhandled close modal case");
    }
  }

  function yesFunction() {
    switch (modalType) {
      case "EDIT_MESSAGE":
        saveMessage();
        break;
      case "ADD_NEW_USER":
        startNewChat();
        break;
      default:
        console.warn("Unhandled yes function case");
    }
  }

  return (
    <div className="Modal">
      <div className="ModalContent">
        <h2>{headerText}</h2>
        {(modalType === "EDIT_MESSAGE" || modalType === "ADD_NEW_USER") && (
          <textarea
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        )}
        <div className="ModalActions">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={yesFunction}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
