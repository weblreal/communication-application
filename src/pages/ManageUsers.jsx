import DeleteModal from '../components/DeleteModal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TableEmpty from '../components/TableEmpty';
import useGlobalContext from '../hooks/useGlobalContext';

const ManageUsers = () => {
  const { setChats, setMyUploads, users, chats, loggedIn, myUploads } =
    useGlobalContext();
  const [toDelete, setToDelete] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const renderUsers = users.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>
          <Link
            to="/manageuser/editusers"
            className="edit-button button-table-modifier"
            state={user.id}>
            Edit
          </Link>
          {loggedIn.id !== user.id && (
            <button
              className="delete-button button-table-modifier"
              onClick={() => {
                setShowDeleteModal(true);
                setToDelete(user);
              }}>
              | Delete
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Users</h2>
      <table className="table-wrapper">
        <thead>
          <tr className="table-row-header">
            <td className="first-column-width">Name</td>
            <td className="second-column-width">User Email ID</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {renderUsers}
          {<TableEmpty times={13 - users.length} />}
        </tbody>
      </table>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          toDelete={toDelete}
          users={users}
          setChats={setChats}
          chats={chats}
          myUploads={myUploads}
          setMyUploads={setMyUploads}
        />
      )}
    </div>
  );
};

export default ManageUsers;
