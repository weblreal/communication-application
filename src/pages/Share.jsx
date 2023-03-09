import React, { useEffect, useRef, useState } from 'react';
import TableEmpty from '../components/TableEmpty';
import '../styles/Share.css';
import DeleteModal from '../components/DeleteModal';
import { useLocation } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

export default function Share() {
  const { myUploads, setMyUploads, users, loggedIn } = useGlobalContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const selectButton = useRef('');
  const dataSelected = useLocation().state;
  const [selectedObj, setSelectedObj] = useState(
    myUploads.find((upload) => upload.id === dataSelected.id)
  );
  const [selectedToDelete, setSelectedToDelete] = useState('');

  // display list of name of the user who selected to be shared with
  const renderShared = selectedObj.sharedUploads.map((shared) => {
    return (
      <tr key={shared}>
        <td>{shared}</td>
        <td>
          <button
            className="button-table-modifier remove-buttons"
            onClick={() => {
              setShowDeleteModal(true);
              setSelectedToDelete(shared);
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  // display user name in the dropdown option
  const renderOptions = users.map((user) => {
    return user.fullName === loggedIn.fullName ? (
      ''
    ) : (
      <option key={user.id}>{user.fullName}</option>
    );
  });

  // selected user will be added in the sharedUploads array
  const handleAddShare = () => {
    const toShareUser = selectButton.current.value;
    // condition to avoid duplication
    if (selectedObj.sharedUploads.includes(toShareUser)) return;

    selectedObj.sharedUploads = [...selectedObj.sharedUploads, toShareUser];
    setSelectedObj({ ...selectedObj });
  };

  // update myUploads in the local storage
  const updateMyUploads = () => {
    const indexSelected = myUploads.findIndex(
      (upload) => upload.id === dataSelected.id
    );
    myUploads[indexSelected].sharedUploads = selectedObj.sharedUploads;
    setMyUploads(myUploads);
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
  };

  useEffect(() => {
    updateMyUploads();
  }, [selectedObj]);

  return (
    <>
      <h2>
        Upload Sharing : <span>{dataSelected.fileName}</span>
      </h2>
      <table className="table-wrapper">
        <thead>
          <tr className="table-row-header">
            <td className="first-column-width">Shared User</td>
            <td className="second-column-width">Action</td>
          </tr>
        </thead>
        <tbody>
          {renderShared}
          <TableEmpty />
        </tbody>
      </table>
      <h2>Add Sharing</h2>
      <div className="add-sharing-form">
        <label>Choose User :</label>
        <select
          ref={selectButton}
          className="add-sharing-select"
          name="user-to-share"
        >
          {renderOptions}
        </select>
        <input
          className="manage-documents-modal-button"
          type="button"
          value="Add Share"
          onClick={handleAddShare}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          selectedToDelete={selectedToDelete}
          myUploads={myUploads}
          selectedObj={selectedObj}
          setMyUploads={setMyUploads}
        />
      )}
    </>
  );
}
