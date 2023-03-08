import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import GroupChat from './pages/GroupChat';
import Logout from './pages/Logout';
import RegisterSuccessful from './pages/RegisterSuccessful';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginSuccessful from './pages/LoginSuccessful';
import ManageUsers from './pages/ManageUsers';
import ManageDocuments from './pages/ManageDocuments';
import Navigation from './components/Navigation';
import EditUsers from './pages/EditUsers';
import Share from './pages/Share';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectiveRoute';
import GlobalContextProvider from './context/GlobalContext';

const Main = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/registersuccessful"
            replace
            element={<RegisterSuccessful />}
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<Navigation />}>
              <Route path="/loginsuccessful" element={<LoginSuccessful />} />
              <Route path="/groupchat" element={<GroupChat />} />
              <Route path="/manageuser">
                <Route index element={<ManageUsers />} />
                <Route path="editusers" element={<EditUsers />} />
              </Route>
              <Route path="/managedocuments">
                <Route index element={<ManageDocuments />} />
                <Route path="share" element={<Share />} />
              </Route>
            </Route>
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default Main;
