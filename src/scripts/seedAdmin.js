import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/db.js';
import User from '../models/User.js';

async function main() {
  await connectToDatabase();
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@rsvp.local';
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const name = process.env.SEED_ADMIN_NAME || 'Admin';

  let user = await User.findOne({ email });
  if (user) {
    user.role = 'admin';
    if (password) user.passwordHash = await bcrypt.hash(password, 10);
    await user.save();
    // eslint-disable-next-line no-console
    console.log('Updated existing admin:', email);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, passwordHash, role: 'admin' });
    // eslint-disable-next-line no-console
    console.log('Created admin:', email);
  }
  await mongoose.connection.close();
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


