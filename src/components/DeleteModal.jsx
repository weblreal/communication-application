import { ACTIONS } from '../pages/ManageDocuments';
import '../styles/DeleteModal.css';
import questionmark from '../img/question-mark.PNG';
const DeleteModal = ({
  setMyUploads,
  selectedObj,
  myUploads,
  selectedToDelete,
  setShowDeleteModal,
  toDelete,
  users,
  dispatch,
  setChats,
  chats,
}) => {
  const pathname = window.location.pathname;

  // MANAGE USER
  const handleDeleteUsers = () => {
    // UPDATE USERS
    users.splice(users.indexOf(toDelete), 1);
    localStorage.setItem('users', JSON.stringify(users));

    // UPDATE CHATS
    const chatsUpdated = chats.filter(
      ({ sender }) => sender !== toDelete.fullName
    );
    setChats(chatsUpdated);
    localStorage.setItem('chats', JSON.stringify(chatsUpdated));

    // UPDATE MYUPLOADS
    const myUploadsUpdated = myUploads.filter(
      (uploads) => uploads.ownerEmail !== toDelete.email
    );
    myUploadsUpdated.map((upload) => {
      if (upload.sharedUploads.includes(toDelete.fullName)) {
        upload.sharedUploads.splice(
          upload.sharedUploads.indexOf(toDelete.fullName),
          1
        );
      }
    });
    setMyUploads(myUploadsUpdated);
    localStorage.setItem('myUploads', JSON.stringify(myUploadsUpdated));
    setShowDeleteModal(false);
  };

  // MANAGE DOCUMENTS
  const handleDeleteUploads = () => {
    dispatch({ type: ACTIONS.DELETE_UPLOAD, payload: toDelete });
    setShowDeleteModal(false);
  };

  // SHARE
  const handleDeleteShared = () => {
    const indexToDelete = myUploads.findIndex(
      (upload) => upload.id === selectedObj.id
    );

    myUploads[indexToDelete].sharedUploads.splice(
      myUploads[indexToDelete].sharedUploads.indexOf(selectedToDelete),
      1
    );

    setMyUploads(myUploads);
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
    setShowDeleteModal(false);
  };

  return (
    <div className="delete-modal-container">
      <div className="confirm-deletion-wrapper">
        <p className="confirm-deletion-title">Confirm File Deletion</p>
        <button
          className="close-button"
          onClick={() => setShowDeleteModal(false)}>
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
            if (pathname === '/managedocuments') {
              handleDeleteUploads();
            } else if (pathname === '/manageuser') {
              handleDeleteUsers();
            } else {
              handleDeleteShared();
            }
          }}>
          Ok
        </button>
        <button
          className="modal-button"
          onClick={() => setShowDeleteModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteModal;
