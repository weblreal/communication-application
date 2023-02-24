import '../styles/DeleteModal.css';
const DeleteModal = () => {
  return (
    <div className="delete-modal-container" id="delete-modal-container">
      <div className="confirm-deletion-wrapper">
        <p cslassName="confirm-deletion-title">Confirm File Deletion</p>
        <button
          className="close-button"
          onclick="hide('delete-modal-container')"
        >
          &#10005;
        </button>
      </div>
      <div className="delete-modal-mid-content">
        <img src="../img/question-mark.PNG" alt="question-mark-logo" />
        <span className="delete-modal-message">Are you sure?</span>
      </div>
      <div className="delete-modal-button-wrapper">
        <button className="modal-button modal-button-highlight">Ok</button>
        <button className="modal-button">Cancel</button>
      </div>
    </div>
  );
};
export default DeleteModal;
