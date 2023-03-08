import AddUploadModal from '../components/AddUploadModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { useContext, useEffect, useReducer, useState } from 'react';
import '../styles/ManageDocuments.css';
import { GlobalContext } from '../context/GlobalContext';
import TableEmpty from '../components/TableEmpty';
import { Link } from 'react-router-dom';

export const ACTIONS = {
  ADD_UPLOAD: 'add-upload',
  EDIT_UPLOAD: 'edit-upload',
  DELETE_UPLOAD: 'delete-upload',
};

const reducer = (myUploadsArr, action) => {
  switch (action.type) {
    case ACTIONS.ADD_UPLOAD:
      localStorage.setItem(
        'myUploads',
        JSON.stringify([...myUploadsArr, action.payload])
      );
      return [...myUploadsArr, action.payload];
    case ACTIONS.EDIT_UPLOAD:
      myUploadsArr[myUploadsArr.indexOf(action.toEdit)].label =
        action.payload.label;
      localStorage.setItem('myUploads', JSON.stringify(myUploadsArr));
      return [...myUploadsArr];
    case ACTIONS.DELETE_UPLOAD:
      myUploadsArr.splice(myUploadsArr.indexOf(action.payload), 1);
      localStorage.setItem('myUploads', JSON.stringify(myUploadsArr));
      return [...myUploadsArr];

    default:
      return [...myUploadsArr];
  }
};

const ManageDocuments = () => {
  const { loggedIn, myUploads, setMyUploads } = useContext(GlobalContext);
  const [myUploadsArr, dispatch] = useReducer(reducer, [...myUploads]);
  const [toEdit, setToEdit] = useState('');
  const [toDelete, setToDelete] = useState('');
  const [showAddUpload, setShowAddUpload] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userUploads = myUploadsArr.filter(
    ({ ownerEmail }) => ownerEmail === loggedIn.email
  );

  useEffect(() => {
    setMyUploads(myUploadsArr);
  }, [myUploadsArr]);

  const renderUploads = userUploads.map((upload) => {
    return (
      <tr key={upload.id}>
        <td>{upload.label}</td>
        <td>{upload.fileName}</td>
        <td>
          <button
            className="button-table-modifier edit-button"
            onClick={() => {
              setShowEditModal(!showEditModal);
              setToEdit(upload);
            }}
          >
            Edit
          </button>
          |
          <button
            className="button-table-modifier"
            onClick={() => {
              setShowDeleteModal(true);
              setToDelete(upload);
            }}
          >
            Delete
          </button>
          |
          <Link to={'share'} state={upload}>
            Share
          </Link>
        </td>
      </tr>
    );
  });

  let rowCount = 0;
  const renderSharedUploads = myUploads.map((upload) => {
    if (upload.sharedUploads.includes(loggedIn.fullName)) {
      rowCount++;
      return (
        <tr key={upload.id} className="tr-shared-upload-table">
          <td>{upload.label}</td>
          <td>{upload.fileName}</td>
          <td>{upload.ownerEmail}</td>
        </tr>
      );
    }
  });

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
        <tbody>
          {renderUploads}
          <TableEmpty times={5 - userUploads.length} />
        </tbody>
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
        <tbody>
          {renderSharedUploads}
          <TableEmpty times={5 - rowCount} />
        </tbody>
      </table>
      {showAddUpload && (
        <AddUploadModal
          setShowAddUpload={setShowAddUpload}
          loggedIn={loggedIn}
          dispatch={dispatch}
        />
      )}
      <button
        className="add-upload-button"
        onClick={() => setShowAddUpload(!showAddUpload)}
      >
        + Add Upload
      </button>
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          toEdit={toEdit}
          dispatch={dispatch}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          dispatch={dispatch}
          toDelete={toDelete}
        />
      )}
    </div>
  );
};

export default ManageDocuments;
