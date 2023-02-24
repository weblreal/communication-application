import { Link } from 'react-router-dom';
const Welcome = () => {
  return (
    <main>
      <h1>Welcome to Users Module</h1>
      <h3>Existing Users</h3>
      <Link to="/login">
        <button className="form-button">Login</button>
      </Link>
      <h3>New Users</h3>
      <Link to="/register">
        <button className="form-button">Register</button>
      </Link>
    </main>
  );
};
export default Welcome;
