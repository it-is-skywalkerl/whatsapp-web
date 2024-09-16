// import React from 'react'
import "./styles.css";
import Profile from "./profile/Profile";
import SearchField from "./search-field/SearchField";
import Contacts from "./contacts/Contacts";
import { AllUserMessages, User } from "@/types/common-types";
import AddContact from "./add-contact/AddContact";

function Chats({
  users,
  setUsers,
  selectedUser,
  setSelectedUser,
  messages,
  setMessages,
  onAction,
}: {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  messages: AllUserMessages;
  setMessages: React.Dispatch<React.SetStateAction<AllUserMessages>>;
  onAction: (actionType: "SELECT_USER", payload: string) => void;
}) {
  return (
    <div className="Chats">
      <Profile />
      <SearchField />
      <Contacts
        users={users}
        selectedUser={selectedUser}
        messages={messages}
        onAction={onAction}
      />
      <AddContact
      users={users}
      setUsers={setUsers}
        messages={messages}
        setMessages={setMessages}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default Chats;
