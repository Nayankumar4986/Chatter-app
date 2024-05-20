// Chat.js
import React, { useState, useEffect } from 'react';
import './Chat.css';
import { db, auth } from '../firebase.js';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('Fetched messages: ', messages);
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === '') return;

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        room,
      });
      console.log('Message added: ', newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error adding message: ', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="roomname">
        <h2>{room.toUpperCase()}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <h5>{message.user}</h5>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
