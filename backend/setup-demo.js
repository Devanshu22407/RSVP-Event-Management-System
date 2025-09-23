const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./src/models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rsvp_system');
    console.log('MongoDB Connected for demo setup');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Create demo user
const createDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('Demo user already exists');
      return;
    }

    // Create demo user (password will be hashed by the pre-save hook)
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      passwordHash: 'demo123', // This will be hashed by the pre-save hook
      emailVerified: true // Skip email verification for demo
    });

    await demoUser.save();
    console.log('Demo user created successfully!');
    console.log('Email: demo@example.com');
    console.log('Password: demo123');
  } catch (error) {
    console.error('Error creating demo user:', error);
  }
};

// Run the setup
const setup = async () => {
  await connectDB();
  await createDemoUser();
  mongoose.connection.close();
  console.log('Demo setup completed!');
};

setup();