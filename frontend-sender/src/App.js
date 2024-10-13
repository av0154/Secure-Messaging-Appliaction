import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js'; 
import './App.css';

const App = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSendMessage = async () => {
    try {
      
      const encryptedMessage = CryptoJS.AES.encrypt(message, 'your-secret-key').toString();
      
      const res = await axios.post('http://localhost:5000/api/messages/send', {
        sender,
        receiver,
        message: encryptedMessage, 
      });
      setStatus(res.data.message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message. Please check your network and server.');
    }
  };

  return (
    <div className="App">
      <h1>Secure Messaging - Sender</h1>
      <label htmlFor="sender">Sender:</label>
      <input
        type="text"
        id="sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <label htmlFor="receiver">Receiver:</label>
      <input
        type="text"
        id="receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <label htmlFor="message">Enter your message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleSendMessage}>Send Message</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default App;
