import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useState } from "react";

function App() {
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    profileImg: string;
  } | null>(null);
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
