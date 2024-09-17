import { UserMessage } from "@/types/common-types";

function Modal({
  headerText,
  editedText,
  setEditedText,
  desiredFunction,
  closeModalFunction,
}: {
  headerText: string;
  editedText?: string;
  setEditedText?: React.Dispatch<React.SetStateAction<string>>;
  desiredFunction: (currentMessage: UserMessage) => void;
  closeModalFunction: () => void;
}) {
    console.log("entered Modal component");
  return (
    <div className="Modal">
      <div className="ModalContent">
        <h2>{headerText}</h2>
        {editedText && setEditedText && (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}
        <div className="ModalActions">
          <button onClick={closeModalFunction}>Cancel</button>
          <button onClick={() => desiredFunction}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
