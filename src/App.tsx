import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useState } from "react";
import { User } from "./types/common-types";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div className="MainApp">
      <Chats selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <SelectedChat selectedUser={selectedUser} />
      ) : (
        <DefaultUnselectedChatDisplay />
      )}
    </div>
  );
}

export default App;
