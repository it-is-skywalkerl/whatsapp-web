import { useState } from "react";
import "./styles.css";
import Modal from "../../modal/Modal";
import { OnActionTypes } from "../../../constant/types/onAction-types";

function AddContact({
  onAction,
}: {
  onAction: (
    actionType: typeof OnActionTypes.ADD_NEW_USER,
    payload: {
      [key: string]: string;
    }
  ) => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  function openContactModal() {
    setModalOpen(true);
  }

  return (
    <div>
      <button onClick={openContactModal}>Start new chat</button>
      {isModalOpen && (
        <Modal
          modalType={OnActionTypes.ADD_NEW_USER}
          headerText="Start new chat"
          dataObj={{
            onAction: onAction,
            setModalOpen: setModalOpen,
          }}
        />
      )}
    </div>
  );
}

export default AddContact;
