import mongoose from 'mongoose';

const UnAuthorized = new mongoose.Schema({
  blockCode: {
    type: Number,
  },
  voteSNo: {
    type: Number,
  },
  familyNo: {
    type: Number,
  },
  gender: {
    type: String,
  },
  name: {
    type: String,
  },
  fatherHusbandName: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  cnic: {
    type: String,
  },
  age: {
    type: Number,
  },
  houseNo: {
    type: String,
  },
  street: {
    type: String,
  },
  phase: {
    type: String,
  },
  sector: {
    type: String,
  },
  lane: {
    type: String,
  },
  boulevardAvenue: {
    type: String,
  },
  otherArea: {
    type: String,
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
  rejections: {
    type: Object,
  },
  enteredBy: {
    type: Object,
  },
  createdAt: {
    type: String,
  },
});

export const UnAuthorizedSchema = mongoose.model('UnAuthorized', UnAuthorized);
