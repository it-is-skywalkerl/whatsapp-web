import "./App.css";
import SideBar from "./components/sidebar/SideBar";
import ChatRoom from "./components/chat-room/ChatRoom";
import UnselectedChat from "./components/unselected-chat-section/UnselectedChat";
import { useState } from "react";

function App() {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; profileImg: string; } | null>(null);
  return (
    <div className="MainApp" >
      <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {selectedUser ? <ChatRoom selectedUser={selectedUser} /> : <UnselectedChat />}
    </div>
  )
}

export default App;
