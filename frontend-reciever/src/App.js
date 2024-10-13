import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js'; 
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(''); 
  const [decryptedMessages, setDecryptedMessages] = useState([]); 

  
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/receiver/${receiver}`);
      setMessages(res.data.messages);
      
      const decrypted = res.data.messages.map(msg => {
        const bytes = CryptoJS.AES.decrypt(msg.message, 'your-secret-key');
        const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
        return { ...msg, originalMessage }; 
      });
      setDecryptedMessages(decrypted);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  
  useEffect(() => {
    if (receiver) {
      fetchMessages();
    }
  }, [receiver]);

  return (
    <div className="App">
      <h1>Secure Messaging - Receiver</h1>

      <label htmlFor="receiver">Receiver:</label>
      <input
        type="text"
        id="receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder="Enter receiver name"
      />

      <h2>Received Messages</h2>
      {decryptedMessages.length > 0 ? (
        <ul>
          {decryptedMessages.map((msg, index) => (
            <li key={index}>
              <strong>From:</strong> {msg.sender} <br />
              <strong>Encrypted Message:</strong> {msg.message} <br /> {/* Display Encrypted Message */}
              <strong>Decrypted Message:</strong> {msg.originalMessage} {/* Display Decrypted Message */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages to display</p>
      )}
    </div>
  );
};

export default App;
