import { NavLink, Outlet } from 'react-router-dom';

//! refactor this: use param to set active page
const Navigation = () => {
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
        >
          Logout
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
