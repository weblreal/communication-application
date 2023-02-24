import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

const ProtectedRoute = () => {
  const { loggedIn } = useContext(GlobalContext);
  if (!loggedIn.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
