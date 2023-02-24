import { ACTIONS } from '../pages/ManageDocuments';
import '../styles/DeleteModal.css';
import questionmark from '../img/question-mark.PNG';
const DeleteModal = ({
  setShowDeleteModal,
  toDelete,
  users,
  dispatch,
  setChats,
  chats,
}) => {
  const pathname = window.location.pathname;

  const handleDelete = () => {
    // UPDATE USERS
    users.splice(users.indexOf(toDelete), 1);
    localStorage.setItem('users', JSON.stringify(users));

    // UPDATE CHATS
    const chatsUpdated = chats.filter(
      ({ sender }) => sender !== toDelete.fullName
    );
    setChats(chatsUpdated);
    localStorage.setItem('chats', JSON.stringify(chatsUpdated));
    setShowDeleteModal(false);
  };

  const handleDeleteUploads = () => {
    dispatch({ type: ACTIONS.DELETE_UPLOAD, payload: toDelete });
    setShowDeleteModal(false);
  };

  return (
    <div className="delete-modal-container" id="delete-modal-container ">
      <div className="confirm-deletion-wrapper">
        <p className="confirm-deletion-title">Confirm File Deletion</p>
        <button
          className="close-button"
          onClick={() => setShowDeleteModal(false)}
        >
          &#10005;
        </button>
      </div>
      <div className="delete-modal-mid-content">
        <img src={questionmark} alt="question-mark-logo" />
        <span className="delete-modal-message">Are you sure?</span>
      </div>
      <div className="delete-modal-button-wrapper">
        <button
          className="modal-button modal-button-highlight"
          onClick={() => {
            pathname === '/managedocuments'
              ? handleDeleteUploads()
              : handleDelete();
          }}
        >
          Ok
        </button>
        <button
          className="modal-button"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteModal;
