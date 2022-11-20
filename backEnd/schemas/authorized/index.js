import mongoose from 'mongoose';

const Authorized = new mongoose.Schema({
  blockCode: {
    type: Number,
    required: true,
  },
  voteSNo: {
    type: Number,
  },
  familyNo: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherHusbandName: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  cnic: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
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
    required: true,
  },
  moza: {
    type: String,
    required: true,
  },
  dehya: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  patwarHalka: {
    type: String,
    required: true,
  },
  tapaydar: {
    type: String,
    required: true,
  },
  tehseel: {
    type: String,
    required: true,
  },
  talka: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  unionCouncil: {
    type: String,
    required: true,
  },
  bookNo: {
    type: String,
    required: true,
  },
  constituency: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  updateNo: Number,
  enteredBy: {
    type: Object,
  },
  verifiedBy: {
    type: Object,
  },
  createdAt: {
    type: String,
  },
});

export const AuthorizedSchema = mongoose.model('Authorized', Authorized);
