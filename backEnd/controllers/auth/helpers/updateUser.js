import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const updateUser = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHORIZED } = status;

  //Destructuring email, remember_me & password from body
  const { _id, username, email, role, rate, assignedBlockCodes } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id });
    if (!isExisting) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHORIZED,
          message: 'Wrong Credentials',
        },
      });
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      { _id },
      {
        username,
        email,
        role,
        rate,
        assignedBlockCodes,
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
export const updateProfile = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHORIZED } = status;

  //Destructuring email, remember_me & password from body
  const { _id } = req.user;
  const { username, mobileNo } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id });
    if (!isExisting) {
      return res.json({
        success: false,
        errorCode: UNAUTHORIZED,
        errorMessage: 'Wrong Credentials',
      });
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      { _id },
      {
        username,
        mobileNo,
      },
      { new: true },
    );

    //Sending response in case everything went well!
    return res.json({
      success: true,
      data: updatedUser,
      message: 'Profile Updated Successfully',
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
