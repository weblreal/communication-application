import { Navigate, Outlet } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

const ProtectedRoute = () => {
  const { loggedIn } = useGlobalContext();
  if (!loggedIn.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
