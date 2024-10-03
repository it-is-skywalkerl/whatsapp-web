import { ModalDataObjType } from "@/constant/types/common-types";
import {
  handleMessageActionTypes,
  handleUserActionTypes,
} from "../../constant/types/onAction-types";
import { useState } from "react";
import "./styles.css";
import { createPortal } from "react-dom";

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
  const isTextAreaVisible =
    modalType === handleMessageActionTypes.EDIT_MESSAGE ||
    modalType === handleUserActionTypes.ADD_NEW_USER;

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

  return createPortal(
    <div className="Modal">
      <div className="ModalContent">
        <h2>{headerText}</h2>
        {isTextAreaVisible && (
          <>
            <textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            />
            {textAreaValue.trim() === "" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </>
        )}
        <div className="ModalActions">
          <button
            onClick={() => {
              dataObj.setModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={yesFunction}
            disabled={isTextAreaVisible && textAreaValue.trim() === ""}
          >
            Yes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
