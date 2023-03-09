import React, { useState, useEffect, createContext } from 'react';
export const GlobalContext = createContext();

// Helper: get item in the local storage
const getItem = (itemName) => {
  return localStorage.getItem(itemName)
    ? JSON.parse(localStorage.getItem(itemName))
    : [];
};

export default function GlobalContextProvider({ children }) {
  const [users, setUsers] = useState(getItem('users'));
  const [chats, setChats] = useState(getItem('chats'));
  const [loggedIn, setLoggedIn] = useState(getItem('loggedIn'));
  const [myUploads, setMyUploads] = useState(getItem('myUploads'));

  // Updates the local storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
  }, [chats, users, loggedIn, myUploads]);

  const values = {
    setUsers,
    setChats,
    setLoggedIn,
    setMyUploads,
    users,
    chats,
    loggedIn,
    myUploads,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
