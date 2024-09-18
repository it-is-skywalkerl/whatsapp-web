import { AllUserMessages, User } from "../../../constant/types/common-types";
import "./styles.css";
import { OnActionTypes } from "../../../constant/types/onAction-types";

function Contacts({
  isSpaciousMode,
  users,
  selectedUser,
  messages,
  onAction,
}: {
  isSpaciousMode: boolean;
  users: User[];
  selectedUser: User | null;
  messages: AllUserMessages;
  onAction: (
    actionType: typeof OnActionTypes.SELECT_USER,
    payload: string
  ) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onAction(OnActionTypes.SELECT_USER, event.currentTarget.id);
  }

  return (
    <div>
      {users.map((contact) => (
        <div
          key={contact.id}
          id={contact.id}
          className={
            selectedUser?.id == contact.id
              ? "Contact SelectedContact"
              : "Contact"
          }
          onClick={handleClick}
        >
          <div className="ProfilePhoto">
            <img src={contact.profileImg} alt="" />
          </div>
          <div className="NameAndLatestMessageDiv">
            <div className="ProfileName">
              <h2>{contact.name}</h2>
            </div>
            {messages[contact.id].length > 0 && isSpaciousMode && (
              <div className="LatestMessage">
                {messages[contact.id][messages[contact.id].length - 1].text}
                <div className="Tooltip">
                  {messages[contact.id][messages[contact.id].length - 1].text}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
