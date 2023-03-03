import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ValidateEmail from '../components/ValidateEmail';
import { GlobalContext } from '../components/GlobalContext';

const EditUsers = () => {
  const { users, chats, myUploads, loggedIn } = useContext(GlobalContext);

  const [user, setUser] = useState({});
  const [userUploads, setuserUploads] = useState([]);
  const [userChats, setUserChats] = useState({});
  const fullNameValue = useRef();
  const emailValue = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const userObj = useMemo(
    () => users.find((user) => user.id === location.state),
    [users]
  );

  useEffect(() => {
    const id = location.state;
    const user = users.find((user) => user.id === id);
    const userChats = chats.filter(({ sender }) => sender === user.fullName);
    const userUploads = myUploads.filter(
      ({ ownerEmail }) => ownerEmail === user.email
    );
    setuserUploads(userUploads);
    setUserChats(userChats);
    setUser(user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNameInput = fullNameValue.current.value;
    const emailInput = emailValue.current.value;

    if (!fullNameInput.trim()) {
      alert('Please enter full name');
      return false;
    }

    if (!emailInput) {
      alert('Please enter email');
      return false;
    }

    // check if email already exist
    if (!ValidateEmail(emailInput)) {
      alert('Invalid email');
      return false;
    }

    // store all emails in the userObj
    const emails = [];
    users.map((user) => {
      emails.push(user.email);
    });

    emails.splice(users.indexOf(user), 1);
    // loop emails except current user
    for (let email of emails) {
      if (email === emailInput) {
        alert('Email already exist');
        return false;
      }
    }

    // shared uploads
    myUploads.map((upload) => {
      if (upload.sharedUploads.includes(userObj.fullName)) {
        upload.sharedUploads.splice(
          upload.sharedUploads.indexOf(userObj.fullName),
          1,
          fullNameInput
        );
      }
      return upload;
    });

    localStorage.setItem('myUploads', JSON.stringify(myUploads));
    // Update for USERS object
    user.fullName = fullNameInput;
    user.email = emailInput;

    // Update for CHATS object
    userChats.map((chat) => {
      chat.sender = fullNameInput;
    });

    // Update for MYUPLOADS object
    userUploads.map((upload) => {
      upload.ownerEmail = emailInput;
      upload.fileOwner = fullNameInput;
    });

    // Update for LOGGEDIN object
    if (loggedIn.id === user.id) {
      loggedIn.fullName = fullNameInput;
      loggedIn.email = emailInput;
    }

    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/manageuser');
  };

  return (
    <div className="section-container default">
      <h1>Edit User Information</h1>
      <form className="default-form" noValidate onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            ref={fullNameValue}
            defaultValue={user.fullName}
            className="input-form"
            type="text"
            name="full-name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            ref={emailValue}
            defaultValue={user.email}
            className="input-form"
            type="email"
            name="email"
          />
        </div>
        <div>
          <input
            className="form-button edit-user-save-button"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
