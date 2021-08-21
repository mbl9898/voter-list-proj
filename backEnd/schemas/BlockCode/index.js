const mongoose = require('mongoose');

const BlockCode = new mongoose.Schema({
  blockCode: {
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
  enteredBy: {
    type: Object,
  },
  createdAt: {
    type: String,
  },
});

export const BlockCodeSchema = mongoose.model('BlockCode', BlockCode);
