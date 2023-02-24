const EditModal = () => {
  return (
    <div class="manage-documents-modal-container" id="edit-modal-container">
      <div class="manage-documents-header-wrapper">
        <span></span>
        <h4>Edit</h4>
        <button class="close-button" onclick="hide('edit-modal-container')">
          &#10005;
        </button>
      </div>

      <form
        action="#"
        class="form-manage-documents-modal form-manage-documents-modal-edit"
      >
        <div>
          <label>Label</label>
          <input
            class="file-description-input"
            type="text"
            name="file-description-edit"
            id="label"
          />
        </div>
        <div class="edit-modal-buttons-wrapper">
          <input
            class="manage-documents-modal-button"
            type="submit"
            value="Save"
            onclick="return saveEdit()"
          />
          <input
            class="manage-documents-modal-button"
            type="button"
            value="Cancel"
            onclick="hide('edit-modal-container')"
          />
        </div>
      </form>
    </div>
  );
};

export default EditModal;
