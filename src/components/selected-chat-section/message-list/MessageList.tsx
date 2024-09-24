import {
  messagesReducerPayloadType,
  UserMessage,
} from "../../../constant/types/common-types";
import "./styles.css";
import { useEffect, useRef } from "react";
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
            key={message.id}
            isSpaciousMode={isSpaciousMode}
            message={message}
            selectedUserId={selectedUserId}
            dispatchMessages={dispatchMessages}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessageList;
