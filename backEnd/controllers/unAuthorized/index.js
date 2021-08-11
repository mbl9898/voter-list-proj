import { getData, getDataById } from './helpers/getData';
import { uploadData } from './helpers/uploadData';
import { deleteRecord } from './helpers/deleteRecord';
import { rejectVote } from './helpers/rejectVote';
import { getRejectedVotes } from './helpers/getRejectedVotes';

export const unAuthorized = {
  getData,
  getDataById,
  uploadData,
  rejectVote,
  getRejectedVotes,
  deleteRecord,
};
