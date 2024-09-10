import "./styles.css";

function SelectedChatHeader({
  selectedUser,
}: {
  selectedUser: {
    id: string;
    name: string;
    profileImg: string;
  };
}) {
  return (
    <div className="MessageHeader">
      <div className="ProfileImage">
        <img src={selectedUser.profileImg} alt="" />
      </div>
      <div className="UserName">
        <span>{selectedUser.name}</span>
      </div>
      <div className="SearchAndOptions">
        <i className="bx bx-search-alt-2"></i>
        <i className="bx bx-dots-vertical-rounded"></i>
      </div>
    </div>
  );
}

export default SelectedChatHeader;
