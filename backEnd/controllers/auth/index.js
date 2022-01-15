import { registerUser } from './helpers/registerUser';
import { loginUser } from './helpers/loginUser';
import { logoutUser } from './helpers/logoutUser';
import { refreshSession } from './helpers/refreshSession';
import { sendCodePasswordRecovery } from './helpers/sendCodePasswordRecovery';
import { resetPassword } from './helpers/resetPassword';
import { validatorToken } from './helpers/tokenValidator';
import { updateUser, updateProfile } from './helpers/updateUser';
// import { getAllUsers } from './helpers/getAllUsers';

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendCodePasswordRecovery,
  resetPassword,
  validatorToken,
  // getAllUsers,
  updateUser,
  updateProfile,
};
