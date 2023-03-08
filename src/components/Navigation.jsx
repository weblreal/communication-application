import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Navigation = () => {
  const { loggedIn, setLoggedIn } = useContext(GlobalContext);

  const handleLogout = () => {
    loggedIn.isLoggedIn = false;
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  };

  return (
    <>
      <nav className="nav-container">
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-button active-page' : 'nav-button';
          }}
          to="/groupchat"
        >
          Group Chat
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-button active-page' : 'nav-button';
          }}
          to="/manageuser"
        >
          Manage Users
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-button active-page' : 'nav-button';
          }}
          to="/managedocuments"
        >
          Manage Documents
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-button active-page' : 'nav-button';
          }}
          to="/logout"
          onClick={() => handleLogout()}
        >
          Logout
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
