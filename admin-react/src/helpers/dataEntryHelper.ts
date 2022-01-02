import { Dispatch } from 'react';
import { VotesModel } from '../interfaces/VotesModel';
import {
  setCurrentRejectedVote,
  setDefaultBlockCodeData,
  setMessage,
  setMessageVariant,
  setRejectedVotes,
} from '../store';
import unAuthorizedService from '../services/unAuthorizedService';
import { BlockCodeService } from '../services/BlockCodeService';
import { UserService } from '../services/UserService';

export const dataEntryFormInitial: VotesModel = {
  blockCode: null,
  voteSNo: null,
  familyNo: null,
  gender: '',
  name: '',
  fatherHusbandName: '',
  maritalStatus: '',
  cnic: '',
  age: null,
  houseNo: '',
  street: '',
  phase: '',
  sector: '',
  lane: '',
  boulevardAvenue: '',
  otherArea: '',
  constituencyName: '',
  moza: '',
  dehya: '',
  city: '',
  patwarHalka: '',
  tapaydar: '',
  tehseel: '',
  talka: '',
  district: '',
  unionCouncil: '',
  bookNo: '',
  constituency: '',
};

export const getRejectedVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
) => {
  const res = await unAuthorizedService.getRejectedVotes();
  dispatch(setRejectedVotes(res));
  dispatch(setCurrentRejectedVote(res[0]));
};

export const submitVote = async (
  data: any,
  // setData: Dispatch<SetStateAction<VotesModel>>
) => {
  const res = await unAuthorizedService.addNewUnauthorizedData(data);
  return res;
  // setData(dataEntryFormInitial);
};

export const getDefaultBlockCodeData = async (
  defaultBlockCode: number,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setData: any,
  setLoading: any,
  source?: any,
) => {
  const res = await BlockCodeService.getBlockCodeByNumber(defaultBlockCode, {
    cancelToken: source?.token,
  });
  console.log(res);
  if (res?.success) {
    await dispatch(setDefaultBlockCodeData(res.data));
    const data = res.data;
    setData({
      ...dataEntryFormInitial,
      blockCode: data.blockCode,
      constituencyName: data.constituencyName,
      moza: data.moza,
      dehya: data.dehya,
      city: data.city,
      patwarHalka: data.patwarHalka,
      tapaydar: data.tapaydar,
      tehseel: data.tehseel,
      talka: data.talka,
      district: data.district,
      unionCouncil: data.unionCouncil,
      bookNo: data.bookNo,
      constituency: data.constituency,
    });
    setLoading(false);
  } else {
    dispatch(setMessageVariant('danger'));
    dispatch(
      setMessage(
        'Failed to load default Block Code | Set Default Block Code | Contact Admin',
      ),
    );
    setLoading(false);
  }
};

export const onBlockCodeSelect = async (
  userId: string,
  defaultBlockCode: number,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setData: any,
  setLoading: any,
) => {
  const res = await UserService.setDefaultBlockCode(userId, defaultBlockCode);
  console.log(res);
  if (res && !res.success) {
    dispatch(setMessageVariant('danger'));
    dispatch(setMessage(res.error.message));
  }

  res?.success === true &&
    getDefaultBlockCodeData(defaultBlockCode, dispatch, setData, setLoading);
};

export const submitNewVote = async (
  data: any,
  currentUser: any,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setData: any,
  setLoading: any,
) => {
  const res: any = await submitVote(data);
  if (res.success) {
    getDefaultBlockCodeData(
      currentUser.defaultBlockCode,
      dispatch,
      setData,
      setLoading,
    );
    dispatch(setMessageVariant('info'));
    dispatch(setMessage('Vote Submitted SuccessFully'));
    return;
  }

  if (res.error) {
    dispatch(setMessageVariant('danger'));
    dispatch(setMessage(res.error.message));
    return;
  }
  if (!res.success) {
    dispatch(setMessageVariant('danger'));
    dispatch(setMessage(res.message));
    return;
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
