import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidateEmail from '../helper/ValidateEmail';
import useGlobalContext from '../hooks/useGlobalContext';

const Register = () => {
  const initialValue = {
    id: Number(new Date()),
    fullName: '',
    email: '',
    password: '',
    isLoggedIn: false,
  };

  const { users, setUsers } = useGlobalContext();
  const [userValues, setUserValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const confirmPassword = useRef();
  const navigate = useNavigate();

  // store array of emails in the {users} local storage
  const emails = useMemo(() => {
    return users.map((user) => user.email);
  }, [users]);

  // returns error message
  const validation = () => {
    const errors = {};
    if (!userValues.fullName) {
      errors.fullName = 'Please enter your full name';
    }

    if (emails.includes(userValues.email)) {
      errors.emailExist = 'Sorry, Email already exist';
    }

    if (!ValidateEmail(userValues.email)) {
      errors.invalidEmail = 'Invalid Email';
    }

    if (userValues.password.length <= 7 || !userValues.password) {
      errors.password = 'Password length must be 8 characters';
    }

    if (confirmPassword.current.value !== userValues.password) {
      errors.confirmPassword = 'Password not match';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation();

    if (Object.keys(errors).length !== 0) {
      return;
    }

    // registration user object
    const newUser = {
      id: userValues.id,
      fullName: userValues.fullName,
      email: userValues.email,
      password: userValues.password,
      isLoggedIn: false,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    navigate('/registersuccessful');
  };

  return (
    <div className="section-container">
      <h1>Register</h1>
      <form className="default-form register-from" onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            className="input-form"
            type="text"
            name="fullName"
            placeholder="Name"
            onChange={(e) =>
              setUserValues({ ...userValues, fullName: e.target.value })
            }
          />
        </div>
        <p className="error-message-registration">{formErrors.fullName}</p>
        <div>
          <label>Email</label>
          <input
            className="input-form"
            type="mail"
            placeholder="Email"
            name="email"
            onChange={(e) =>
              setUserValues({ ...userValues, email: e.target.value })
            }
          />
        </div>
        <p className="error-message-registration">
          {formErrors.emailExist || formErrors.invalidEmail}
        </p>
        <div>
          <label>Password</label>
          <input
            className="input-form"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setUserValues({ ...userValues, password: e.target.value })
            }
          />
        </div>
        <p className="error-message-registration">{formErrors.password}</p>
        <div>
          <label>Comfirm Password</label>
          <input
            className="input-form"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            ref={confirmPassword}
          />
        </div>
        <p className="error-message-registration">
          {formErrors.confirmPassword}
        </p>
        <div>
          <input
            className="form-button register-submit-button"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
