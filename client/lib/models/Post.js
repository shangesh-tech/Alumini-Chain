import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  avatar: { type: String },
  title: { type: String },
  company: { type: String },
  timestamp: { type: String, default: () => new Date().toISOString() }, // Auto-set on creation
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
  image: { type: String },
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
