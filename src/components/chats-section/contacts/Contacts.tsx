import { AllUserMessages, User } from "../../../constant/types/common-types";
import "./styles.css";
import { OnActionTypes } from "../../../constant/types/onAction-types";
import Contact from "./components/Contact";

function Contacts({
  isSpaciousMode,
  users,
  selectedUserId,
  messages,
  onAction,
}: {
  isSpaciousMode: boolean;
  users: User[];
  selectedUserId: string | undefined;
  messages: AllUserMessages;
  onAction: (
    actionType: typeof OnActionTypes.SELECT_USER,
    payload: {
      [key: string]: string;
    }
  ) => void;
}) {
  return (
    <div>
      {users.map((contact) => (
        <Contact
          key={contact.id}
          isSpaciousMode={isSpaciousMode}
          contact={contact}
          selectedUserId={selectedUserId}
          latestMessage={
            messages[contact.id]?.[messages[contact.id].length - 1]?.text
          }
          onAction={onAction}
        />
      ))}
    </div>
  );
}

export default Contacts;
