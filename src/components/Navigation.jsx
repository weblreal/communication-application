import { NavLink, Outlet } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

const Navigation = () => {
  const { loggedIn, setLoggedIn } = useGlobalContext();

  const handleLogout = () => {
    const copyLoggedIn = { ...loggedIn };
    copyLoggedIn.isLoggedIn = false;
    setLoggedIn(copyLoggedIn);
  };

  // Array of Link names and path
  const links = [
    { label: 'Group Chat', path: '/groupchat' },
    { label: 'Manage Users', path: '/manageuser' },
    { label: 'Manage Documents', path: '/managedocuments' },
    { label: 'Logout', path: '/logout', logout: () => handleLogout() },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <NavLink
        key={link.label}
        className={({ isActive }) => {
          return isActive ? 'nav-button active-page' : 'nav-button';
        }}
        to={link.path}
        onClick={link.logout && link.logout}>
        {link.label}
      </NavLink>
    );
  });

  return (
    <>
      <nav className="nav-container">{renderedLinks}</nav>
      <Outlet />
    </>
  );
};

export default Navigation;
