import AddUploadModal from '../components/AddUploadModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';

import '../styles/ManageDocuments.css';
const ManageDocuments = () => {
  return (
    <div>
      <h2>My Uploads</h2>
      <table className="table-wrapper">
        <thead>
          <tr className="table-row-header">
            <td className="first-column-width">Label</td>
            <td className="second-column-width">File Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody id="tbody-myUploads"></tbody>
      </table>

      <h2>Shared Uploads</h2>
      <table className="table-wrapper">
        <thead>
          <tr className="table-row-header">
            <td className="first-column-width">Label</td>
            <td className="second-column-width">File Name</td>
            <td>Shared by</td>
          </tr>
        </thead>
        <tbody id="tbody-shared-upload">
          {/* <button
              onclick="showAddUpload('upload-modal-container')"
              className="add-upload-button"
            >
              + Add Upload
            </button> */}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDocuments;
