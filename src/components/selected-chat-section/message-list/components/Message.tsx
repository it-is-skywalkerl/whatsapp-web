import Modal from "../../../../components/modal/Modal";
import {
  messagesReducerPayloadType,
  UserMessage,
} from "../../../../constant/types/common-types";
import { handleMessageActionTypes } from "../../../../constant/types/onAction-types";
import { memo, useState } from "react";

const Message = memo(function Message({
  isSpaciousMode,
  message,
  selectedUserId,
  dispatchMessages,
}: {
  isSpaciousMode: boolean;
  message: UserMessage;
  selectedUserId: string;
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

  function openEditModal(message: UserMessage) {
    setCurrentMessage(message);
    setEditModalOpen(true);
  }

  function openDeleteModal(message: UserMessage) {
    setCurrentMessage(message);
    setDeleteModalOpen(true);
  }

  return (
    <div key={message.id} className="Message">
      <div className="MessageOptions">
        <div className="EditDiv">
          <button className="EditButton" onClick={() => openEditModal(message)}>
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
});

export default Message;
