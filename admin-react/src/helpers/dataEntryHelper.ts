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
    dispatch(setRejectedVotes(await unAuthorizedService.getRejectedVotes()));
  } catch (error) {
    console.log(error);
  }
};

export const submitVote = async (
  data: any,
  setData: Dispatch<SetStateAction<VotesModel>>
) => {
  try {
    const res = await unAuthorizedService.addNewUnauthorizedData(data);
    console.log(res);
    if (res.success) {
      setData(dataEntryFormInitial);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateRejectedVote = async (
  data: any,
  setData: Dispatch<SetStateAction<VotesModel>>,
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  try {
    const res = await unAuthorizedService.updateRejectedVote(data);
    console.log(res);
    if (res.success) {
      setData(dataEntryFormInitial);
      dispatch(setCurrentRejectedVote(null));
      getRejectedVotes(dispatch);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
