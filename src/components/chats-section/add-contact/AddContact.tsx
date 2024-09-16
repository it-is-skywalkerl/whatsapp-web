import { useState } from "react";
import "./styles.css";
import { AllUserMessages, User } from "@/types/common-types";

function AddContact({
  messages,
  setMessages,
  setSelectedUser,
}: {
  messages: AllUserMessages;
  setMessages: React.Dispatch<React.SetStateAction<AllUserMessages>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
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
    const newUser = {
        id: "user_id_50",
        name: contactName,
        profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE"
    }
    setMessages({...messages, [newUser.id]: []});
    setSelectedUser(newUser);
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
