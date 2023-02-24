import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidateEmail from '../components/ValidateEmail';
import { GlobalContext } from '../components/GlobalContext';

const Register = () => {
  const { users } = useContext(GlobalContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emails = [];
    users.map((user) => {
      emails.push(user.email);
    });

    if (!fullName) {
      alert('Please enter your full name');
      return false;
    }

    if (emails.includes(email)) {
      alert('Email already exist');
      return false;
    }

    if (!ValidateEmail(email)) {
      alert('Invalid Email');
      return false;
    }

    if (password.length <= 7 || !password) {
      alert('Password length must be 8 characters');
      return false;
    }

    if (confirmPassword !== password) {
      alert('Password not match');
      return false;
    }

    // registration user object
    const usersCopy = users;
    const user = {
      id: Number(new Date()),
      fullName: fullName,
      email: email,
      password: password,
      isLoggedIn: false,
    };
    usersCopy.push(user);
    // update the localStorage
    localStorage.setItem('users', JSON.stringify(usersCopy));
    navigate('/registersuccessful');
  };

  return (
    <div className="section-container">
      <h1>Register</h1>
      <form className="default-form" onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            className="input-form"
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="input-form"
            id="email"
            type="mail"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="input-form"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Comfirm Password</label>
          <input
            className="input-form"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
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
