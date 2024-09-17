import { User } from "@/types/common-types";
import "./styles.css";
import { DeleteIcon } from "../../../assets/icons/Icons";
import Modal from "../../modal/Modal";
import { useState } from "react";

function SelectedChatHeader({
  selectedUser,
  onAction,
}: {
  selectedUser: User;
  onAction: (actionType: "DELETE_USER", payload: string | number) => void;
}) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="SelectedChatHeader">
      <div className="ProfileImage">
        <img src={selectedUser.profileImg} alt="" />
      </div>
      <div className="UserName">
        <span>{selectedUser.name}</span>
      </div>
      <div className="SearchAndOptions">
        <button className="DeleteIconButton" onClick={() => setModalOpen(true)}>
          <DeleteIcon />
        </button>
        <i className="bx bx-search-alt-2"></i>
        <i className="bx bx-dots-vertical-rounded"></i>
      </div>
      {isModalOpen && (
        <Modal
          modalType="DELETE_USER"
          headerText="Are you sure you want to delete this conversation?"
          dataObj={{ onAction: onAction, setModalOpen: setModalOpen }}
        />
      )}
    </div>
  );
}

export default SelectedChatHeader;
