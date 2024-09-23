import { ModalDataObjType } from "@/constant/types/common-types";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
} from "../../constant/types/onAction-types";
import { useState } from "react";

function Modal({
  modalType,
  headerText,
  dataObj,
}: {
  modalType:
    | keyof typeof handleMessageActionTypes
    | keyof typeof handleUserActionTypes;
  headerText: string;
  dataObj: ModalDataObjType;
}) {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  function closeModal() {
    dataObj.setModalOpen(false);
  }

  function yesFunction() {
    switch (modalType) {
      case handleMessageActionTypes.EDIT_MESSAGE:
        if (dataObj.selectedUserId)
          dataObj.dispatchMessages?.({
            type: handleMessageActionTypes.EDIT_MESSAGE,
            payload: {
              selectedUserId: dataObj.selectedUserId,
              selectedMessageId: dataObj.currentMessage?.id,
              editedMessageText: textAreaValue,
            },
          });
        dataObj.setModalOpen(false);
        dataObj.setCurrentMessage?.(null);
        break;

      case handleMessageActionTypes.DELETE_MESSAGE:
        if (dataObj.selectedUserId)
          dataObj.dispatchMessages?.({
            type: handleMessageActionTypes.DELETE_MESSAGE,
            payload: {
              selectedUserId: dataObj.selectedUserId,
              selectedMessageId: dataObj.currentMessage?.id,
            },
          });
        dataObj.setModalOpen(false);
        break;

      case handleUserActionTypes.ADD_NEW_USER:
        dataObj.onAction?.(handleUserActionTypes.ADD_NEW_USER, {
          newUserName: textAreaValue,
        });
        dataObj.setModalOpen(false);
        break;

      case handleUserActionTypes.DELETE_USER:
        dataObj.onAction?.(handleUserActionTypes.DELETE_USER, {});
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
        {(modalType === handleMessageActionTypes.EDIT_MESSAGE ||
          modalType === handleUserActionTypes.ADD_NEW_USER) && (
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
