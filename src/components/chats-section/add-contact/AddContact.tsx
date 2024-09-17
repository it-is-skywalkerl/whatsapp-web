import { useState } from "react";
import "./styles.css";
import Modal from "../../modal/Modal";

function AddContact({
  onAction,
}: {
  onAction: (actionType: "ADD_NEW_USER", payload: string) => void;
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
          modalType="ADD_NEW_USER"
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
