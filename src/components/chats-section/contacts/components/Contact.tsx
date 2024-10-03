import { OnActionTypes } from "../../../../constant/types/onAction-types";
import { User } from "../../../../constant/types/common-types";
import { memo } from "react";

const Contact = memo(
  function Contact({
    isSpaciousMode,
    contact,
    selectedUserId,
    latestMessage,
    onAction,
  }: {
    isSpaciousMode: boolean;
    contact: User;
    selectedUserId: string | undefined;
    latestMessage: string | undefined;
    onAction: (
      actionType: typeof OnActionTypes.SELECT_USER,
      payload: {
        [key: string]: string;
      }
    ) => void;
  }) {
    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
      onAction(OnActionTypes.SELECT_USER, {
        selectedUserId: event.currentTarget.id,
      });
    }

    return (
      <div
        key={contact.id}
        id={contact.id}
        className={
          selectedUserId == contact.id ? "Contact SelectedContact" : "Contact"
        }
        onClick={handleClick}
      >
        <div className="ProfilePhoto">
          <img src={contact.profileImg} alt="" />
        </div>
        <div className="NameAndLatestMessageDiv">
          <div className="ProfileName">
            <h2>{contact.name}</h2>
          </div>
          {latestMessage && isSpaciousMode && (
            <div className="LatestMessage">
              {latestMessage}
              <div className="Tooltip">{latestMessage}</div>
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Store the previous and next selection state of the current contact
    const prevSelected = prevProps.selectedUserId === prevProps.contact.id;
    const nextSelected = nextProps.selectedUserId === nextProps.contact.id;

    // If contact's selection state is same, prevent re-render
    if (prevSelected === nextSelected) {
      return (
        prevProps.isSpaciousMode === nextProps.isSpaciousMode &&
        prevProps.latestMessage === nextProps.latestMessage &&
        prevProps.contact === nextProps.contact
      );
    }

    // Otherwise, allow re-render when selected state changes
    return false;
  }
);

export default Contact;
