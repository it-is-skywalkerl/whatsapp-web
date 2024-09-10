// import React from 'react'
import "./styles.css";
import Profile from "./profile/Profile";
import SearchField from "./search-field/SearchField";
import Contacts from "./contacts/Contacts";

function Chats({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  } | null;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      profileImg: string;
    } | null>
  >;
}) {
  return (
    <div className="SideBar">
      <Profile />
      <SearchField />
      <Contacts selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </div>
  );
}

export default Chats;
