import { Dispatch } from "react";
import { setUnauthorizedData, setUnauthorizedRejectedVotes } from "../store";
import UnAuthorizedService from "../services/unAuthorizedService";
import UnAuthorizedModel from "../services/UnAuthorizedModel";
import { VoteRejection } from "../interfaces/VoteRejection";
import AuthorizedService from "../services/AuthorizedService";

export const voteRejectInitial: VoteRejection = {
  blockCode: false,
  constituencyName: false,
  moza: false,
  dehya: false,
  city: false,
  patwarHalka: false,
  tapaydar: false,
  tehseel: false,
  talka: false,
  district: false,
  unionCouncil: false,
  bookNo: false,
  constituency: false,
  gender: false,
  voteSNo: false,
  familyNo: false,
  name: false,
  maritalStatus: false,
  fatherHusbandName: false,
  cnic: false,
  age: false,
  houseNo: false,
  street: false,
  phase: false,
  sector: false,
  lane: false,
  boulevardAvenue: false,
  otherArea: false,
};

export const getUnAuthorizedList = async (
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  try {
    const res = await UnAuthorizedService.getUnAuthorized();
    const rejected = res.filter((x: any) => x.status === "rejected");
    const pending = res.filter((x: any) => x.status === "pending");

    console.log(res);
    console.log(rejected);
    console.log(pending);

    dispatch(setUnauthorizedRejectedVotes(rejected));
    dispatch(setUnauthorizedData(pending));
  } catch (error) {
    console.log(error);
  }
};

export const approveVote = async (vote: UnAuthorizedModel) => {
  const res = await AuthorizedService.addNewAuthorizedVote(vote);
  return res.success;
};
export const rejectVote = async (id: string, rejections?: VoteRejection) => {
  const res = await UnAuthorizedService.rejectVote(id, rejections);
  return res.success;
};
