import { useEffect, useState, useRef, useContext } from 'react';
import { GlobalContext } from '../components/GlobalContext';
import '../styles/GroupChat.css';

const GroupChat = () => {
  const { chats, loggedIn, setChats } = useContext(GlobalContext);
  const date = new Date().toLocaleDateString('zh-CN').split('/').join('-');
  const time = new Date().toLocaleTimeString('en-US').slice(0, 8);
  const [newDate, setNewDate] = useState('');

  const newMessage = useRef();

  useEffect(() => {
    if (!chats) return null;
    setChats(chats);
    setNewDate(`[${date} ${time}]`);
  }, [chats]);

  const renderMessage = chats.map((chat) => {
    return (
      <div
        key={chat.date}
        className="conversation-inner-wrapper"
        id="conversation-inner-wrapper"
      >
        <div>
          <span id="date-time">{chat.date}</span>
          <span id="sender">{chat.sender}: </span>
          <span id="message">{chat.message}</span>
        </div>
      </div>
    );
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.current.value.trim()) {
      newMessage.current.value = '';
      return alert('Please write a message');
    }
    const chat = {
      date: newDate,
      // change to context or memo
      sender: loggedIn.fullName,
      message: newMessage.current.value,
    };
    setChats((prevChat) => [...prevChat, chat]);
    chats.push(chat);
    localStorage.setItem('chats', JSON.stringify(chats));
    newMessage.current.value = '';
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <section className="group-chat-container">
      <div className="group-chat-header">
        <span></span>
        <span>Group Chat</span>
        <button className="close-button">&#10005;</button>
      </div>
      <div className="conversation-wrapper">
        <div
          className="conversation-inner-wrapper"
          id="conversation-inner-wrapper"
        >
          {renderMessage}
        </div>
      </div>
      <form className="send-message-form" onSubmit={handlerSubmit}>
        <label className="sender-name" id="sender-name">
          {loggedIn.fullName}
        </label>
        <input
          ref={newMessage}
          type="text"
          name="message"
          className="message-input"
          id="message-input"
        />
        <div>
          <input
            className="message-button"
            type="submit"
            name="send"
            value="Send"
          />
          <input
            className="message-button"
            type="button"
            name="refresh"
            value="Refresh"
            onClick={() => reloadPage()}
          />
        </div>
      </form>
    </section>
  );
};

export default GroupChat;