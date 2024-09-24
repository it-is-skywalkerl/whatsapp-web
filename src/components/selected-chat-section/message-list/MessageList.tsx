import {
  messagesReducerPayloadType,
  UserMessage,
} from "../../../constant/types/common-types";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../../modal/Modal";
import { handleMessageActionTypes } from "../../../constant/types/onAction-types";
import Message from "./components/Message";
import EncryptionMessage from "./components/EncryptionMessage";

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

  return (
    <div className="MessagesSection">
      <EncryptionMessage />
      <div className="MessageList">
        {selectedUserMessages?.map((message: UserMessage) => (
          <Message
            isSpaciousMode={isSpaciousMode}
            message={message}
            setCurrentMessage={setCurrentMessage}
            setEditModalOpen={setEditModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
          />
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
