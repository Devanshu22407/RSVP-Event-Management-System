import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    status: { type: String, enum: ['joined', 'cancelled'], default: 'joined' },
  },
  { timestamps: true }
);

rsvpSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.model('Rsvp', rsvpSchema);


