const mongoose = require('mongoose');

const BlockCode = new mongoose.Schema({
  blockCodeNo: {
    type: Number,
  },
  constituencyName: {
    type: String,
  },
  moza: {
    type: String,
  },
  dehya: {
    type: String,
  },
  city: {
    type: String,
  },
  patwarHalka: {
    type: String,
  },
  tapaydar: {
    type: String,
  },
  tehseel: {
    type: String,
  },
  talka: {
    type: String,
  },
  district: {
    type: String,
  },
  unionCouncil: {
    type: String,
  },
  bookNo: {
    type: String,
  },
  constituency: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
  enteredBy: {
    type: Object,
  },
  createdAt: {
    type: String,
  },
});

export const BlockCodeSchema = mongoose.model('BlockCode', BlockCode);
