import { getData, getDataByBlockCode } from './helpers/getBlockCode';
import { updateBlockCode } from './helpers/putBlockCode';
import { postData } from './helpers/postBlockCode';
import { deleteRecord } from './helpers/deleteBlockCode';

export const blockCode = {
  getData,
  getDataByBlockCode,
  updateBlockCode,
  postData,
  deleteRecord,
};

export const getBlockCodeReqData = (req) => {
  const {
    blockCode,
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
  } = req.body;
  return {
    blockCode,
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
  };
};
export const getBlockCodeTypes = () => {
  const blockCodeType = {
    blockCode: 'required|integer',
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
  };
  return blockCodeType;
};
