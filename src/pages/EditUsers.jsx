import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';
import validation from '../helper/EditUserValidation';

const EditUsers = () => {
  const {
    users,
    chats,
    myUploads,
    loggedIn,
    setMyUploads,
    setUsers,
    setLoggedIn,
  } = useGlobalContext();

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

  // inital setup for userUploads, userChats, and user
  useEffect(() => {
    const user = users.find((user) => user.id === location.state);
    setUser(user);

    const userChats = chats.filter(({ sender }) => sender === user.fullName);
    setUserChats(userChats);

    const userUploads = myUploads.filter(
      ({ ownerEmail }) => ownerEmail === user.email
    );
    setuserUploads(userUploads);
  }, []);

  const updateShareUploads = (fullNameInput) => {
    const copyMyUploads = [...myUploads];
    copyMyUploads.forEach((upload) => {
      if (upload.sharedUploads.includes(userObj.fullName)) {
        upload.sharedUploads.splice(
          upload.sharedUploads.indexOf(userObj.fullName),
          1,
          fullNameInput
        );
      }
    });
    setMyUploads(copyMyUploads);
  };

  const updateUsers = (fullNameInput, emailInput) => {
    const copyUsers = [...users];

    const updatedCopyUser = {
      ...user,
      fullName: fullNameInput,
      email: emailInput,
    };

    copyUsers.splice(copyUsers.indexOf(user), 1, updatedCopyUser);

    setUsers(copyUsers);
  };

  const updateChats = (fullNameInput) => {
    const copyUserChats = [...userChats];

    copyUserChats.forEach((chat) => {
      chat.sender = fullNameInput;
    });
  };

  const updateMyUploads = (fullNameInput, emailInput) => {
    const copyUserUploads = [...userUploads];

    copyUserUploads.forEach((upload) => {
      upload.ownerEmail = emailInput;
      upload.fileOwner = fullNameInput;
    });
  };

  const updateLoggedIn = (fullNameInput, emailInput) => {
    const copyLoggedIn = { ...loggedIn };
    const updatedLoggedInObj = {
      ...copyLoggedIn,
      fullName: fullNameInput,
      email: emailInput,
    };
    setLoggedIn(updatedLoggedInObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNameInput = fullNameValue.current.value;
    const emailInput = emailValue.current.value;

    // Validate inputs
    const validate = validation(fullNameInput, emailInput, users, user);
    if (!validate) return;

    // Update SHAREDUPLOADS localstorage
    updateShareUploads(fullNameInput);

    // Update USERS localstorage
    updateUsers(fullNameInput, emailInput);

    // Update for CHATS localstorage
    updateChats(fullNameInput);

    // Update for MYUPLOADS object
    updateMyUploads(fullNameInput, emailInput);

    // only trigger update when loggedIn user selected
    if (loggedIn.id === user.id) {
      // Update for LOGGEDIN object
      updateLoggedIn(fullNameInput, emailInput);
    }

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
