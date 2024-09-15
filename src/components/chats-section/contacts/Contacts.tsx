import { User } from "@/types/common-types";
import { CONNECTIONS } from "../../../constant/connections";
import "./styles.css";

function Contacts({
  selectedUser,
  onAction
}: {
  selectedUser: User | null;
  onAction: (actionType: "SELECT_USER", payload: string) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onAction("SELECT_USER", event.currentTarget.id);
  }

  return (
    <div>
      {CONNECTIONS.map((contact) => (
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
          <div className="ProfileName">
            <h2>{contact.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
