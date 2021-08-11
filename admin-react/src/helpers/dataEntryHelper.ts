import { Dispatch } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import { setRejectedVotes } from "../store";
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
    dispatch(setRejectedVotes(await unAuthorizedService.getRejectedVotes()));
  } catch (error) {
    console.log(error);
  }
};
