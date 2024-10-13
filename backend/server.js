const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');


dotenv.config({ path: './.env' }); 
console.log('MongoDB URI:', process.env.MONGODB_URI);


const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};
connectDB();


app.use('/api/messages', messageRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'API endpoint not found' });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Server error, please try again later' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
