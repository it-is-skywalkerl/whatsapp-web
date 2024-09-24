import "./App.css";
import Chats from "./components/chats-section/Chats";
import SelectedChat from "./components/selected-chat-section/SelectedChat";
import DefaultUnselectedChatDisplay from "./components/default-unselected-chat-display/DefaultUnselectedChatDisplay";
import { useWhatsappActions } from "./hooks/useWhatsappActions";

function App() {
  const {
    messages,
    users,
    selectedUser,
    isSpaciousMode,
    onAction,
    dispatchMessages,
  } = useWhatsappActions();

  return (
    <div className="MainApp">
      <Chats
        isSpaciousMode={isSpaciousMode}
        users={users}
        selectedUserId={selectedUser?.id}
        messages={messages}
        onAction={onAction}
      />
      {selectedUser ? (
        <SelectedChat
          isSpaciousMode={isSpaciousMode}
          selectedUser={selectedUser}
          selectedUserMessages={messages[selectedUser.id]}
          onAction={onAction}
          dispatchMessages={dispatchMessages}
        />
      ) : (
        <DefaultUnselectedChatDisplay />
      )}
    </div>
  );
}

export default App;
