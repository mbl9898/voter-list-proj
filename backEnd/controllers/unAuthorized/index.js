import { getData, getDataById } from './helpers/getData';
import { uploadData } from './helpers/uploadData';
import { deleteRecord } from './helpers/deleteRecord';

export const unAuthorized = {
  getData,
  getDataById,
  uploadData,
  deleteRecord
};
