// import React from 'react'
import "./styles.css";
import Profile from "./profile/Profile";
import SearchField from "./search-field/SearchField";
import Contacts from "./contacts/Contacts";
import { User } from "@/types/common-types";

function Chats({
  selectedUser,
  onAction,
}: {
  selectedUser: User | null;
  onAction: (actionType: "SELECT_USER", payload: string) => void;
}) {
  return (
    <div className="Chats">
      <Profile />
      <SearchField />
      <Contacts selectedUser={selectedUser} onAction={onAction} />
    </div>
  );
}

export default Chats;
