import mongoose from 'mongoose';

const Authorized = new mongoose.Schema({
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
  gender: {
    type: String,
  },
  voteSNo: {
    type: Number,
  },
  familyNo: {
    type: Number,
  },
  name: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  fatherHusbandName: {
    type: String,
  },
  nic: {
    type: Number,
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
  address: {
    type: String,
  },
  user: {
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
