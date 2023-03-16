import { useRef } from 'react';
import useGlobalContext from '../hooks/useGlobalContext';
import '../styles/GroupChat.css';

// helper funciton returns data and time
const getDateTime = () => {
  const date = new Date().toLocaleDateString('zh-CN').split('/').join('-');
  const time = new Date().toLocaleTimeString('en-US').slice(0, 8);
  return `[${date} ${time}]`;
};

const GroupChat = () => {
  const { chats, loggedIn, setChats } = useGlobalContext();
  const newMessage = useRef();

  // render messages in the localstorage
  const renderMessage = chats.map((chat) => {
    return (
      <div key={chat.date} className="conversation-inner-wrapper">
        <div>
          <span>{chat.date}</span>
          <span className="message-sender">{chat.sender}: </span>
          <span>{chat.message}</span>
        </div>
      </div>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newMessage.current.value.trim()) {
      newMessage.current.value = '';
      return alert('Please write a message');
    }

    const chat = {
      date: getDateTime(),
      sender: loggedIn.fullName,
      message: newMessage.current.value,
    };

    setChats([...chats, chat]);
    newMessage.current.value = '';
  };

  return (
    <section className="group-chat-container">
      <div className="group-chat-header">
        <span></span>
        <span>Group Chat</span>
        <button className="close-button">&#10005;</button>
      </div>
      <div className="conversation-wrapper">
        <div className="conversation-inner-wrapper">{renderMessage}</div>
      </div>
      <form className="send-message-form" onSubmit={handleSubmit}>
        <label className="sender-name">{loggedIn.fullName}</label>
        <input
          ref={newMessage}
          type="text"
          name="message"
          className="message-input"
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
            onClick={() => window.location.reload()}
          />
        </div>
      </form>
    </section>
  );
};

export default GroupChat;
