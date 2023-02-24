import DeleteModal from '../components/DeleteModal';
import EditUsers from './EditUsers';
const ManageUsers = () => {
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
        <tbody id="tbody-users"></tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
