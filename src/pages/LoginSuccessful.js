const LoginSuccessful = ({ loggedIn }) => {
  return (
    <div className="section-container default">
      <h1>Login Successful</h1>
      <h3>
        Welcome!
        <span className="username-display" id="username">
          {loggedIn.email}
        </span>
      </h3>
    </div>
  );
};

export default LoginSuccessful;
