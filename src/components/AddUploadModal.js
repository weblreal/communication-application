const AddUploadModal = () => {
  return (
    <div
      className="manage-documents-modal-container"
      id="upload-modal-container"
    >
      <div className="manage-documents-header-wrapper">
        <span></span>
        <h4>Upload</h4>
        <button className="close-button">&#10005;</button>
      </div>
      <form className="form-manage-documents-modal">
        <div>
          <label>Label</label>
          <input
            className="file-description-input"
            type="text"
            name="file-description"
            id="file-description-input"
          />
        </div>
        <div>
          <label>File Upload</label>
          <input
            className="choose-file-button"
            type="file"
            name="file"
            required
            id="choose-file-button"
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
          />
        </div>
      </form>
    </div>
  );
};
export default AddUploadModal;
