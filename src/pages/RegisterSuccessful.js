import { Link } from 'react-router-dom';
const RegisterSuccessful = () => {
  return (
    <div className="section-container">
      <h1>Registration Successful</h1>
      <p>Thank you for your registration</p>
      <Link className="return-home-register-success" to="/">
        Click to return to home page
      </Link>
    </div>
  );
};
export default RegisterSuccessful;
