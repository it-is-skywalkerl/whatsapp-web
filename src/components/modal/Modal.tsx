import {
  handleMessageActionTypes,
  OnActionTypes,
} from "../../constant/types/onAction-types";
import { useState } from "react";

function Modal({
  modalType,
  headerText,
  dataObj,
}: {
  modalType: keyof typeof OnActionTypes;
  headerText: string;
  dataObj: { [key: string]: any };
}) {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  function closeModal() {
    switch (modalType) {
      case OnActionTypes.EDIT_MESSAGE:
      case OnActionTypes.DELETE_MESSAGE:
      case OnActionTypes.ADD_NEW_USER:
      case OnActionTypes.DELETE_USER:
        dataObj.setModalOpen(false);
        break;

      default:
        console.warn("Unhandled close modal case");
    }
  }

  function yesFunction() {
    switch (modalType) {
      case OnActionTypes.EDIT_MESSAGE:
        dataObj.dispatchMessages({
          type: handleMessageActionTypes.EDIT_MESSAGE,
          payload: {
            selectedUserId: dataObj.selectedUserId,
            selectedMessageId: dataObj.currentMessage.id,
            editedMessageText: textAreaValue,
          },
        });
        dataObj.setModalOpen(false);
        dataObj.setCurrentMessage(null);
        break;

      case OnActionTypes.DELETE_MESSAGE:
        dataObj.dispatchMessages({
          type: handleMessageActionTypes.DELETE_MESSAGE,
          payload: {
            selectedUserId: dataObj.selectedUserId,
            selectedMessageId: dataObj.currentMessage.id,
          },
        });
        dataObj.setModalOpen(false);
        break;

      case OnActionTypes.ADD_NEW_USER:
        dataObj.onAction(OnActionTypes.ADD_NEW_USER, textAreaValue);
        dataObj.setModalOpen(false);
        break;

      case OnActionTypes.DELETE_USER:
        dataObj.onAction(OnActionTypes.DELETE_USER, "");
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
        {(modalType === OnActionTypes.EDIT_MESSAGE ||
          modalType === OnActionTypes.ADD_NEW_USER) && (
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
