import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

const Login = () => {
  const { users, setLoggedIn } = useGlobalContext();
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let user of users) {
      // check email & password
      if (emailInput === user.email && passwordInput === user.password) {
        const loggedIn = users.find(({ email }) => email === emailInput);
        loggedIn.isLoggedIn = true;
        setLoggedIn(loggedIn);
        navigate('/loginsuccessful');
        return true;
      }
    }
    //not found in the localstorage
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
    return false;
  };

  return (
    <div className="section-container">
      <h1>Login</h1>
      <p
        className={
          error ? 'error-message-login shake-message' : 'error-message-login'
        }>
        Wrong Email or Password
      </p>
      <form className="default-form" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            className="input-form"
            type="mail"
            name="email"
            placeholder="Email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="input-form"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className="form-button login-submit-button"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
