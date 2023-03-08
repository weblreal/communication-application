import React, { useState, useEffect, createContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  // get item in the localstorage
  const getItem = (itemName) => {
    return localStorage.getItem(itemName)
      ? JSON.parse(localStorage.getItem(itemName))
      : [];
  };

  const [users, setUsers] = useState(getItem('users'));
  const [loggedIn, setLoggedIn] = useState(getItem('loggedIn'));
  const [chats, setChats] = useState(getItem('chats'));
  const [myUploads, setMyUploads] = useState(getItem('myUploads'));

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('myUploads', JSON.stringify(myUploads));
  }, [chats, users, loggedIn, myUploads]);

  const values = {
    setUsers,
    setMyUploads,
    setChats,
    setLoggedIn,
    loggedIn,
    users,
    chats,
    myUploads,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
