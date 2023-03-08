import { NavLink, Outlet } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

const Navigation = () => {
  const { loggedIn, setLoggedIn } = useGlobalContext();

  const handleLogout = () => {
    loggedIn.isLoggedIn = false;
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  };

  const links = [
    { label: 'Group Chat', path: '/groupchat' },
    { label: 'Manage Users', path: '/manageuser' },
    { label: 'Manage Documents', path: '/managedocuments' },
    { label: 'Logout', path: '/logout', onClick: () => handleLogout() },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <NavLink
        key={link.label}
        className={({ isActive }) => {
          return isActive ? 'nav-button active-page' : 'nav-button';
        }}
        to={link.path}
        onClick={link.onClick && link.onClick}
      >
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
