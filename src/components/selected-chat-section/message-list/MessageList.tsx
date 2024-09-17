import { UserMessage } from "@/types/common-types";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../../modal/Modal";

function MessageList({
  isSpaciousMode,
  selectedUserMessages,
  onAction,
}: {
  isSpaciousMode: boolean;
  selectedUserMessages: UserMessage[];
  onAction: (
    actionType: "EDIT_MESSAGE" | "DELETE_MESSAGE",
    payload: number | [number, string]
  ) => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<UserMessage | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUserMessages]);

  function openEditModal(message: UserMessage) {
    setCurrentMessage(message);
    setModalOpen(true);
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
              {isSpaciousMode && (
                <div className="TimeStamp">{message.timeStamp.slice(0, 5)}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isModalOpen && (
        <Modal
          modalType="EDIT_MESSAGE"
          headerText="Edit"
          dataObj={{
            currentMessage: currentMessage,
            setModalOpen: setModalOpen,
            setCurrentMessage: setCurrentMessage,
            onAction: onAction,
          }}
        />
      )}
    </div>
  );
}

export default MessageList;
