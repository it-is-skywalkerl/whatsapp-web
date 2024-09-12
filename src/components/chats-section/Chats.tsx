// import React from 'react'
import "./styles.css";
import Profile from "./profile/Profile";
import SearchField from "./search-field/SearchField";
import Contacts from "./contacts/Contacts";
import { User } from "@/types/common-types";

function Chats({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  return (
    <div className="Chats">
      <Profile />
      <SearchField />
      <Contacts selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </div>
  );
}

export default Chats;
