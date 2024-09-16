import { User } from "@/types/common-types";
import "./styles.css";
import { DeleteIcon } from "../../../assets/icons/Icons";

function SelectedChatHeader({
  selectedUser,
  onAction,
}: {
  selectedUser: User;
  onAction: (actionType: "DELETE_USER", payload: string | number) => void;
}) {
  function deleteConversation() {
    onAction("DELETE_USER", "");
  }
  return (
    <div className="SelectedChatHeader">
      <div className="ProfileImage">
        <img src={selectedUser.profileImg} alt="" />
      </div>
      <div className="UserName">
        <span>{selectedUser.name}</span>
      </div>
      <div className="SearchAndOptions">
        <button className="DeleteIconButton" onClick={deleteConversation}>
          <DeleteIcon />
        </button>
        <i className="bx bx-search-alt-2"></i>
        <i className="bx bx-dots-vertical-rounded"></i>
      </div>
    </div>
  );
}

export default SelectedChatHeader;
