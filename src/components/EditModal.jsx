import { useRef } from 'react';
import { ACTIONS } from '../pages/ManageDocuments';
const EditModal = ({ setShowEditModal, toEdit, dispatch }) => {
  const label = useRef('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!label.current.value.trim()) {
      alert('Please write a label');
      return false;
    }
    setShowEditModal(false);
    dispatch({
      type: ACTIONS.EDIT_UPLOAD,
      payload: { label: label.current.value },
      toEdit: toEdit,
    });
  };

  return (
    <div className="manage-documents-modal-container" id="edit-modal-container">
      <div className="manage-documents-header-wrapper">
        <span></span>
        <h4>Edit</h4>
        <button
          className="close-button"
          onClick={() => setShowEditModal(false)}
        >
          &#10005;
        </button>
      </div>

      <form
        action="#"
        className="form-manage-documents-modal form-manage-documents-modal-edit"
      >
        <div>
          <label>Label</label>
          <input
            className="file-description-input"
            type="text"
            name="file-description-edit"
            defaultValue={toEdit.label}
            ref={label}
          />
        </div>
        <div className="edit-modal-buttons-wrapper">
          <input
            className="manage-documents-modal-button"
            type="submit"
            value="Save"
            onClick={(e) => handleSave(e)}
          />
          <input
            className="manage-documents-modal-button"
            type="button"
            value="Cancel"
            onClick={() => setShowEditModal(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditModal;
