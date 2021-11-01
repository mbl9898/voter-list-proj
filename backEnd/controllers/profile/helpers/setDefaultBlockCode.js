import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const setDefaultBlockCode = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring email, remember_me & password from body
  const { _id, defaultBlockCode } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id });
    if (!isExisting) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Wrong Credentials',
        },
      });
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      { _id },
      {
        defaultBlockCode,
      },
      { new: true },
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
