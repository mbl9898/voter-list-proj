import { registerUser } from './helpers/registerUser';
import { loginUser } from './helpers/loginUser';
import { logoutUser } from './helpers/logoutUser';
import { refreshSession } from './helpers/refreshSession';
import { sendCodePasswordRecovery } from './helpers/sendCodePasswordRecovery';
import { resetPassword } from './helpers/resetPassword';
import { validatorToken } from './helpers/tokenValidator';
<<<<<<< HEAD
=======
import { updateUser, updateProfile } from './helpers/updateUser';
import { getAllUsers } from './helpers/getAllUsers';
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendCodePasswordRecovery,
  resetPassword,
  validatorToken,
<<<<<<< HEAD
=======
  getAllUsers,
  updateUser,
  updateProfile,
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd
};
