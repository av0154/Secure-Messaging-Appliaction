const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); 


router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


router.get('/receiver/:receiver', async (req, res) => {
  try {
    const { receiver } = req.params;
    const messages = await Message.find({ receiver }); 
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
