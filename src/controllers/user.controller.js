import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function getUser(req, res) {
  const { id } = req.params;
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

export async function updateUser(req, res) {
  const { id } = req.params;
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { name, bio, profilePic } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { name, bio, profilePic } },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

export async function changePassword(req, res) {
  const { id } = req.params;
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Current password incorrect' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password updated' });
}


