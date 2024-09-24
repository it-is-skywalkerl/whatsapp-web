import { User } from "../../../constant/types/common-types";
import "./styles.css";
import { DeleteIcon } from "../../../assets/icons/Icons";
import Modal from "../../modal/Modal";
import { memo, useState } from "react";
import { OnActionTypes } from "../../../constant/types/onAction-types";

const SelectedChatHeader = memo(function SelectedChatHeader({
  selectedUser,
  onAction,
}: {
  selectedUser: User;
  onAction: (
    actionType:
      | typeof OnActionTypes.DELETE_USER
      | typeof OnActionTypes.ADD_NEW_USER,
    payload: {
      [key: string]: string;
    }
  ) => void;
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
          modalType={OnActionTypes.DELETE_USER}
          headerText="Are you sure you want to delete this conversation?"
          dataObj={{ onAction: onAction, setModalOpen: setModalOpen }}
        />
      )}
    </div>
  );
});

export default SelectedChatHeader;
