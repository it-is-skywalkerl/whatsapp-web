import {
  DarkModeIcon,
  NoNotificationIcon,
  NewChatIcon,
  OpenStatusIcon,
  CloseIcon,
} from "../../../assets/icons/Icons";

import "./styles.css";

function Profile({
  isSpaciousMode,
  onAction,
}: {
  isSpaciousMode: boolean;
  onAction: (actionType: "TOGGLE_VIEW", payload: string) => void;
}) {
  return (
    <div>
      <div className="ProfileOuter">
        <div className="ProfileImage">
          <img src="/src/assets/images/profile.jpeg" alt="" />
        </div>
        <div className="ProfileOptions">
          <DarkModeIcon />
          <OpenStatusIcon />
          <NewChatIcon />
          <button
            className="ViewModeButton"
            onClick={() => onAction("TOGGLE_VIEW", "")}
          >
            {isSpaciousMode ? "Compact Mode" : "Spacious Mode"}
          </button>
        </div>
      </div>
      <div className="ImportContactsNotification">
        <div className="NoWifiIconWrapper">
          <NoNotificationIcon />
        </div>
        <div className="ErrorDescription">
          <CloseIcon />
          <p className="NoContactsText">Turn on notifications</p>
          <p className="NotificationSuggestion">
            Get notified of new messages on your computer.{" "}
            <a href="" rel="noreferrer">
              Turn on desktop notifications
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
