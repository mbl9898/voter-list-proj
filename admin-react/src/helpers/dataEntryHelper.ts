import { Dispatch, SetStateAction } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import { setCurrentRejectedVote, setRejectedVotes } from "../store";
import unAuthorizedService from "../services/unAuthorizedService";

export const dataEntryFormInitial: VotesModel = {
  blockCode: null,
  constituencyName: "",
  moza: "",
  dehya: "",
  city: "",
  patwarHalka: "",
  tapaydar: "",
  tehseel: "",
  talka: "",
  district: "",
  unionCouncil: "",
  bookNo: "",
  constituency: "",
  gender: "",
  voteSNo: null,
  familyNo: null,
  name: "",
  maritalStatus: "",
  fatherHusbandName: "",
  cnic: "",
  age: null,
  houseNo: "",
  street: "",
  phase: "",
  sector: "",
  lane: "",
  boulevardAvenue: "",
  otherArea: "",
};

export const getRejectedVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  try {
    const res = await unAuthorizedService.getRejectedVotes();
    dispatch(setRejectedVotes(res));
    dispatch(setCurrentRejectedVote(res[0]));
  } catch (error) {
    console.log(error);
  }
};

export const submitVote = async (
  data: any
  // setData: Dispatch<SetStateAction<VotesModel>>
) => {
  try {
    const res = await unAuthorizedService.addNewUnauthorizedData(data);
    return res;
    // setData(dataEntryFormInitial);
  } catch (error) {
    console.log(error);
  }
};
export const updateRejectedVote = async (data: any) => {
  try {
    const res = await unAuthorizedService.updateRejectedVote(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
