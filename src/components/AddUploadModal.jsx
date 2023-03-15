import { useRef } from 'react';
import { ACTIONS } from '../pages/ManageDocuments';
import useGlobalContext from '../hooks/useGlobalContext';

const AddUploadModal = ({ setShowAddUpload, dispatch }) => {
  const { loggedIn } = useGlobalContext();
  const labelValue = useRef();
  const fileNameValue = useRef();

  //helper function
  const valueValidator = (input) => {
    if (!input.trim().length) {
      return true;
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (valueValidator(labelValue.current.value)) {
      alert('Please write a label');
      return false;
    }

    if (!fileNameValue.current.value) {
      alert('Please select to upload');
      return false;
    }

    const userUploadObj = {
      label: labelValue.current.value,
      fileName: fileNameValue.current.files[0].name,
      id: Number(new Date()),
      fileOwner: loggedIn.fullName,
      ownerEmail: loggedIn.email,
      sharedUploads: [],
    };
    dispatch({ type: ACTIONS.ADD_UPLOAD, payload: { ...userUploadObj } });
    setShowAddUpload(false);
  };

  return (
    <div
      className="manage-documents-modal-container"
      id="upload-modal-container">
      <div className="manage-documents-header-wrapper">
        <span></span>
        <h4>Upload</h4>
        <button
          className="close-button"
          onClick={() => setShowAddUpload(false)}>
          &#10005;
        </button>
      </div>
      <form
        className="form-manage-documents-modal"
        onSubmit={(e) => handleUpload(e)}>
        <div>
          <label>Label</label>
          <input
            className="file-description-input"
            type="text"
            name="file-description"
            id="file-description-input"
            ref={labelValue}
          />
        </div>
        <div>
          <label>File Upload</label>
          <input
            className="choose-file-button"
            type="file"
            name="file"
            id="choose-file-button"
            ref={fileNameValue}
          />
        </div>
        <div>
          <input
            className="manage-documents-modal-button"
            type="submit"
            value="Upload Now"
          />
          <input
            className="manage-documents-modal-button"
            type="button"
            value="Cancel"
            onClick={() => setShowAddUpload(false)}
          />
        </div>
      </form>
    </div>
  );
};
export default AddUploadModal;
