import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import GroupChat from './pages/GroupChat';
import Logout from './pages/Logout';
import RegisterSuccessful from './pages/RegisterSuccessful';
import { Route, Routes } from 'react-router-dom';
import LoginSuccessful from './pages/LoginSuccessful';
import ManageUsers from './pages/ManageUsers';
import ManageDocuments from './pages/ManageDocuments';
import Navigation from './components/Navigation';

const getItem = (itemName) => {
  return localStorage.getItem(itemName)
    ? JSON.parse(localStorage.getItem(itemName))
    : [];
};
const users = getItem('users');
const loggedIn = getItem('loggedIn');
const chats = getItem('chats');
const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login users={users} />} />
      <Route path="/register" element={<Register users={users} />} />
      <Route path="/registersuccessful" element={<RegisterSuccessful />} />
      <Route element={<Navigation />}>
        <Route
          path="/loginsuccessful"
          element={<LoginSuccessful loggedIn={loggedIn} />}
        />
        <Route
          path="/groupchat"
          element={<GroupChat chats={chats} loggedIn={loggedIn} />}
        />
        <Route path="/manageuser" element={<ManageUsers />} />
        <Route path="/managedocuments" element={<ManageDocuments />} />
      </Route>
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};
export default Main;
