import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const getAllUsers = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  try {
    //Making sure that the user exists
    const users = await UserSchema.find();
    if (!users) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Not Allowed',
        },
      });
    }
    return res.json({
      success: true,
      data: users,
    });
  } catch (e) {
    //Log in case of any abnormal crash
    logger('error', 'Error:', e.message);
    return res.json({
      success: false,
      error: {
        code: SERVER_ERROR,
        message: 'Internal Server Error',
      },
    });
  }
};
