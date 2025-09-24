import Comment from '../models/Comment.js';

export async function addComment(req, res) {
  const { eventId } = req.params;
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ message: 'Comment required' });
  const created = await Comment.create({ eventId, userId: req.user.id, comment });
  res.status(201).json(created);
}

export async function listComments(req, res) {
  const { eventId } = req.params;
  const comments = await Comment.find({ eventId }).sort({ createdAt: -1 }).populate('userId', 'name');
  res.json(comments);
}


