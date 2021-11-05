const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  defaultBlockCode: String,
  role: String,
  rate: {
    type: Number,
    default: 0,
  },
<<<<<<< HEAD
=======
  role: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd
  assignedBlockCodes: {
    type: [Number],
    default: [],
  },
  dataAccess: {
    fullAccess: Boolean,
    district: String,
    city: String,
    tehseel: String,
    constituency: String,
    unionCouncil: String,
    constituencyName: String,
    blockCode: Number,
    phase: String,
    sector: String,
    street: String,
    gender: String,
    lane: String,
    boulevardAvenue: String,
  },
  createdAt: String,
});

export const UserSchema = mongoose.model('User', User);
