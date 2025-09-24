import User from '../models/User.js';
import Event from '../models/Event.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function listUsers(_req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
}

export async function toggleBlockUser(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.status = user.status === 'active' ? 'blocked' : 'active';
  await user.save();
  res.json(user);
}

export async function listEventsForModeration(_req, res) {
  const events = await Event.find().sort({ createdAt: -1 }).populate('createdBy', 'name');
  res.json(events);
}

export async function approveEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, { $set: { status: 'approved' } }, { new: true });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
}

export async function rejectEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, { $set: { status: 'rejected' } }, { new: true });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
}

export async function deleteEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  await event.deleteOne();
  res.json({ message: 'Deleted' });
}

// EJS views
export function renderLogin(_req, res) {
  res.render('admin/login', { title: 'Admin Login' });
}

export async function adminLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.role !== 'admin') return res.status(401).render('admin/login', { title: 'Admin Login' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).render('admin/login', { title: 'Admin Login' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.redirect('/admin/dashboard');
}

export async function renderDashboard(_req, res) {
  const totalUsers = await User.countDocuments();
  const totalEvents = await Event.countDocuments();
  res.render('admin/dashboard', { title: 'Dashboard', stats: { totalUsers, totalEvents } });
}

export async function renderUsers(_req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.render('admin/users', { title: 'Manage Users', users });
}

export async function renderEvents(_req, res) {
  const events = await Event.find().sort({ createdAt: -1 }).populate('createdBy', 'name');
  res.render('admin/events', { title: 'Manage Events', events });
}


