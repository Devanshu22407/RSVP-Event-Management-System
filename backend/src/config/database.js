const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined. Please check your .env file.');
    }

    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('MongoDB is not running. Please start MongoDB server.');
      console.error('For local MongoDB: Run "mongod" in your terminal');
      console.error('For MongoDB Atlas: Check your connection string and network access');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;