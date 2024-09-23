import {
  messagesReducerPayloadType,
  UserMessage,
} from "../../../constant/types/common-types";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../../modal/Modal";
import { handleMessageActionTypes } from "../../../constant/types/onAction-types";

function MessageList({
  isSpaciousMode,
  selectedUserId,
  selectedUserMessages,
  dispatchMessages,
}: {
  isSpaciousMode: boolean;
  selectedUserId: string;
  selectedUserMessages: UserMessage[];
  dispatchMessages: React.Dispatch<{
    type: keyof typeof handleMessageActionTypes;
    payload: messagesReducerPayloadType;
  }>;
}) {
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<UserMessage | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUserMessages]);

  function openEditModal(message: UserMessage) {
    setCurrentMessage(message);
    setEditModalOpen(true);
  }

  function openDeleteModal(message: UserMessage) {
    setCurrentMessage(message);
    setDeleteModalOpen(true);
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
                  onClick={() => openDeleteModal(message)}
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

      {isEditModalOpen && currentMessage && (
        <Modal
          modalType={handleMessageActionTypes.EDIT_MESSAGE}
          headerText="Edit"
          dataObj={{
            currentMessage: currentMessage,
            selectedUserId: selectedUserId,
            setModalOpen: setEditModalOpen,
            setCurrentMessage: setCurrentMessage,
            dispatchMessages: dispatchMessages,
          }}
        />
      )}
      {isDeleteModalOpen && currentMessage && (
        <Modal
          modalType={handleMessageActionTypes.DELETE_MESSAGE}
          headerText="Are you sure you want to delete this message?"
          dataObj={{
            selectedUserId: selectedUserId,
            setModalOpen: setDeleteModalOpen,
            dispatchMessages: dispatchMessages,
            currentMessage: currentMessage,
          }}
        />
      )}
    </div>
  );
}

export default MessageList;
