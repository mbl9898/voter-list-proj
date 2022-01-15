import { changePassword } from './helpers/changePassword';
import { userData } from './helpers/userData';
// import { getUserDataByEmail } from './helpers/getUserDataByEmail';
import { setDefaultBlockCode } from './helpers/setDefaultBlockCode';
import { updateUser, updatedUserDataAccess } from './helpers/updateUser';
import { getAllUsers } from './helpers/getAllUsers';

export const profile = {
  changePassword,
  userData,
  // getUserDataByEmail,
  setDefaultBlockCode,
  getAllUsers,
  updateUser,
  updatedUserDataAccess,
};
