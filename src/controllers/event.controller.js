import Event from '../models/Event.js';
import Rsvp from '../models/Rsvp.js';

export async function createEvent(req, res) {
  const data = req.body;
  const event = await Event.create({ ...data, createdBy: req.user.id });
  res.status(201).json(event);
}

export async function listEvents(req, res) {
  const { q, category, dateFrom, dateTo, createdBy, attendeeId } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = new Date(dateFrom);
    if (dateTo) filter.date.$lte = new Date(dateTo);
  }
  if (createdBy) filter.createdBy = createdBy;

  let events = await Event.find(filter).sort({ date: 1 }).populate('createdBy', 'name');

  if (attendeeId) {
    const rsvps = await Rsvp.find({ userId: attendeeId, status: 'joined' }).select('eventId');
    const ids = new Set(rsvps.map(r => String(r.eventId)));
    events = events.filter(e => ids.has(String(e._id)));
  }
  res.json(events);
}

export async function getEvent(req, res) {
  const event = await Event.findById(req.params.id).populate('createdBy', 'name');
  if (!event) return res.status(404).json({ message: 'Event not found' });
  const rsvpCount = await Rsvp.countDocuments({ eventId: event._id, status: 'joined' });
  res.json({ ...event.toJSON(), rsvpCount });
}

export async function updateEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (String(event.createdBy) !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  Object.assign(event, req.body);
  await event.save();
  res.json(event);
}

export async function deleteEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (String(event.createdBy) !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await event.deleteOne();
  res.json({ message: 'Deleted' });
}


