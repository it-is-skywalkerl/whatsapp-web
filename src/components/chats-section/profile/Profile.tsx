import {
  DarkModeIcon,
  NoNotificationIcon,
  MoreOptionsIcon,
  NewChatIcon,
  OpenStatusIcon,
  CloseIcon,
} from "../../../assets/icons/Icons";

import "./styles.css";

function Profile() {
  return (
    <div>
      <div className="ProfileOuter">
        <div className="ProfileImage">
          <img src="/src/assets/images/profile.png" alt="" />
        </div>
        <div className="ProfileOptions">
          <DarkModeIcon />
          <OpenStatusIcon />
          <NewChatIcon />
          <MoreOptionsIcon />
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
