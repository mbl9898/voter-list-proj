const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isApproved: {
    type: Boolean,
  },
  rate: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

export const UserSchema = mongoose.model('User', User);
