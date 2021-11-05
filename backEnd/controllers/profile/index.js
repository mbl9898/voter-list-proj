import { changePassword } from './helpers/changePassword';
import { userData } from './helpers/userData';
<<<<<<< HEAD
import { getUserDataByEmail } from './helpers/getUserDataByEmail';
import { setDefaultBlockCode } from './helpers/setDefaultBlockCode';
import { getAllUsers } from './helpers/getAllUsers';
import { updateUser, updatedUserDataAccess } from './helpers/updateUser';
=======
import { getUserDataByEmail } from './helpers/getProfileData';
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd

export const profile = {
  changePassword,
  userData,
  getUserDataByEmail,
  setDefaultBlockCode,
  getAllUsers,
  updateUser,
  updatedUserDataAccess,
};
