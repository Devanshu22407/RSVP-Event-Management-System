import Event from '../models/Event.js';
import Rsvp from '../models/Rsvp.js';

export async function joinEvent(req, res) {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  const rsvp = await Rsvp.findOneAndUpdate(
    { userId: req.user.id, eventId },
    { $set: { status: 'joined' } },
    { new: true, upsert: true }
  );
  res.status(201).json(rsvp);
}

export async function cancelRsvp(req, res) {
  const { eventId } = req.params;
  const rsvp = await Rsvp.findOneAndUpdate(
    { userId: req.user.id, eventId },
    { $set: { status: 'cancelled' } },
    { new: true }
  );
  if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });
  res.json(rsvp);
}


