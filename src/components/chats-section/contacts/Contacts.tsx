import { User } from "@/types/common-types";
import { CONNECTIONS } from "../../../constant/connections";
import "./styles.css";

function Contacts({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const USER = CONNECTIONS.find(
      (connection) => connection.id === event.currentTarget.id
    );
    if (USER !== undefined) {
      setSelectedUser(USER);
    }
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
