import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const approveAccount = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring email, remember_me & password from body
  const { userId, rate, isApproved } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id: userId });
    if (!isExisting) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Wrong Credentials',
        },
      });
    }

    const updatedUser = await UserSchema.updateOne(
      { _id: userId },
      {
        $set: {
          rate,
          isApproved,
        },
      },
    );

    //Sending response in case everything went well!
    return res.json({
      success: true,
      data: updatedUser,
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
