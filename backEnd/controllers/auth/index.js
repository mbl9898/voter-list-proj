import { registerUser } from './helpers/registerUser';
import { loginUser } from './helpers/loginUser';
import { logoutUser } from './helpers/logoutUser';
import { refreshSession } from './helpers/refreshSession';
import { sendCodePasswordRecovery } from './helpers/sendCodePasswordRecovery';
import { resetPassword } from './helpers/resetPassword';
import { validatorToken } from './helpers/tokenValidator';

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendCodePasswordRecovery,
  resetPassword,
  validatorToken,
};
