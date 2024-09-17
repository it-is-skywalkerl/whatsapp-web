import { useState } from "react";

function Modal({
  modalType,
  headerText,
  dataObj,
}: {
  modalType: "EDIT_MESSAGE" | "DELETE_MESSAGE" | "ADD_NEW_USER" | "DELETE_USER";
  headerText: string;
  dataObj: { [key: string]: any };
}) {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  function closeModal() {
    switch (modalType) {
      case "EDIT_MESSAGE":
      case "DELETE_MESSAGE":
      case "ADD_NEW_USER":
      case "DELETE_USER":
        dataObj.setModalOpen(false);
        break;

      default:
        console.warn("Unhandled close modal case");
    }
  }

  function yesFunction() {
    switch (modalType) {
      case "EDIT_MESSAGE":
        dataObj.onAction("EDIT_MESSAGE", [
          dataObj.currentMessage.id,
          textAreaValue,
        ]);
        dataObj.setModalOpen(false);
        dataObj.setCurrentMessage(null);
        break;

      case "DELETE_MESSAGE":
        dataObj.onAction("DELETE_MESSAGE", dataObj.currentMessage.id);
        dataObj.setModalOpen(false);
        break;

      case "ADD_NEW_USER":
        dataObj.onAction("ADD_NEW_USER", textAreaValue);
        dataObj.setModalOpen(false);
        break;

      case "DELETE_USER":
        dataObj.onAction("DELETE_USER", "");
        dataObj.setModalOpen(false);
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
