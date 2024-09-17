// import React from 'react'
import "./styles.css";
import Profile from "./profile/Profile";
import SearchField from "./search-field/SearchField";
import Contacts from "./contacts/Contacts";
import { AllUserMessages, User } from "@/types/common-types";
import AddContact from "./add-contact/AddContact";

function Chats({
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
    actionType: "SELECT_USER" | "ADD_NEW_USER" | "TOGGLE_VIEW",
    payload: string
  ) => void;
}) {
  return (
    <div className="Chats">
      <Profile
        isSpaciousMode={isSpaciousMode}
        onAction={
          onAction as (actionType: "TOGGLE_VIEW", payload: string) => void
        }
      />
      <SearchField />
      <Contacts
        isSpaciousMode={isSpaciousMode}
        users={users}
        selectedUser={selectedUser}
        messages={messages}
        onAction={
          onAction as (actionType: "SELECT_USER", payload: string) => void
        }
      />
      <AddContact
        onAction={
          onAction as (actionType: "ADD_NEW_USER", payload: string) => void
        }
      />
    </div>
  );
}

export default Chats;
