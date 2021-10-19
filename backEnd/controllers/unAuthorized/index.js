import { getData, getDataById } from './helpers/getData';
import { uploadData } from './helpers/uploadData';
import { deleteRecord } from './helpers/deleteRecord';
import { rejectVote } from './helpers/rejectVote';
import { updateRejectedVote } from './helpers/updateRejectedVote';
import { getRejectedVotes } from './helpers/getRejectedVotes';

export const unAuthorized = {
  getData,
  getDataById,
  uploadData,
  rejectVote,
  updateRejectedVote,
  getRejectedVotes,
  deleteRecord,
};

export const getVoteData = (req) => {
  const {
    blockCode,
    voteSNo,
    familyNo,
    gender,
    name,
    fatherHusbandName,
    maritalStatus,
    cnic,
    age,
    houseNo,
    street,
    phase,
    sector,
    lane,
    boulevardAvenue,
    otherArea,
    constituencyName,
    moza,
    dehya,
    city,
    patwarHalka,
    tapaydar,
    tehseel,
    talka,
    district,
    unionCouncil,
    bookNo,
    constituency,
    address,
  } = req.body;
  return {
    blockCode,
    voteSNo,
    familyNo,
    gender,
    name,
    fatherHusbandName,
    maritalStatus,
    cnic,
    age,
    houseNo,
    street,
    phase,
    sector,
    lane,
    boulevardAvenue,
    otherArea,
    constituencyName,
    moza,
    dehya,
    city,
    patwarHalka,
    tapaydar,
    tehseel,
    talka,
    district,
    unionCouncil,
    bookNo,
    constituency,
    address,
  };
};
export const getVoteTypes = () => {
  const voteType = {
    blockCode: 'required|integer',
    voteSNo: 'required|integer',
    familyNo: 'required|integer',
    gender: 'required|string',
    name: 'required|string',
    fatherHusbandName: 'required|string',
    maritalStatus: 'required|string',
    cnic: 'required|string|regex:/[0-9]{5}(?:-)[0-9]{7}(?:-)[0-9]{1}/',
    age: 'required|integer',
    houseNo: 'required|string',
    street: 'required|string',
    phase: 'required|string',
    sector: 'required|string',
    lane: 'required|string',
    boulevardAvenue: 'required|string',
    otherArea: 'required|string',
    constituencyName: 'required|string',
    moza: 'required|string',
    dehya: 'required|string',
    city: 'required|string',
    patwarHalka: 'required|string',
    tapaydar: 'required|string',
    tehseel: 'required|string',
    talka: 'required|string',
    district: 'required|string',
    unionCouncil: 'required|string',
    bookNo: 'required|string',
    constituency: 'required|string',
    address: 'string',
    status: 'string',
  };
  return voteType;
};
