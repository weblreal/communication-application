import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TableEmpty from '../components/TableEmpty';
import '../styles/Share.css';
import DeleteModal from '../components/DeleteModal';
import { useLocation } from 'react-router-dom';

export default function Share() {
  const { myUploads, setMyUploads, users, loggedIn } =
    useContext(GlobalContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const selectButton = useRef('');
  const dataSelected = useLocation().state;
  const [selectedObj, setSelectedObj] = useState(
    myUploads.find((upload) => upload.id === dataSelected.id)
  );
  const [selectedToDelete, setSelectedToDelete] = useState('');

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

  const renderOptions = users.map((user) => {
    return user.fullName === loggedIn.fullName ? (
      ''
    ) : (
      <option key={user.id}>{user.fullName}</option>
    );
  });

  const handleAddShare = () => {
    const toShareUser = selectButton.current.value;
    if (selectedObj.sharedUploads.includes(toShareUser)) return;

    selectedObj.sharedUploads = [...selectedObj.sharedUploads, toShareUser];
    setSelectedObj({ ...selectedObj });
  };

  const updateShare = () => {
    const indexSelected = myUploads.findIndex(
      (upload) => upload.id === dataSelected.id
    );
    myUploads[indexSelected].sharedUploads = selectedObj.sharedUploads;
    setMyUploads(myUploads);
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
  };

  useEffect(() => {
    updateShare();
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
