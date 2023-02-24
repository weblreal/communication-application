import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';

const Login = () => {
  const { users, setLoggedIn } = useContext(GlobalContext);
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let user of users) {
      // check email & password
      if (emailInput === user.email && passwordInput === user.password) {
        const loggedIn = users.find(({ email }) => email === emailInput);
        loggedIn.isLoggedIn = true;
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        setLoggedIn(loggedIn);
        navigate('/loginsuccessful');
        return true;
      }
    }
    //not found in the localstorage
    alert('Wrong Email or Password');
    return false;
  };

  return (
    <div className="section-container">
      <h1>Login</h1>
      <form
        // action="../pages/login-success.html"
        className="default-form"
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Email</label>
          <input
            id="email-login-input"
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
            id="password-login-input"
            className="input-form"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            id="login-button"
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
