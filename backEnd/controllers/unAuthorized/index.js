import { getData, getDataById } from './helpers/getData';
import { uploadData } from './helpers/uploadData';
import { deleteRecord } from './helpers/deleteRecord';
import { rejectVote } from './helpers/rejectVote';


export const unAuthorized = {
  getData,
  getDataById,
  uploadData,
  rejectVote,
  deleteRecord,
};
