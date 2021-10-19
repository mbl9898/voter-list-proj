import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';
import { OtpsSchema } from '~/schemas/Otps';
import { unAuthorized } from 'controllers/unAuthorized';

dotenv.config();

export const resetPassword = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHORIZED } = status;

  //Destructuring otp, password from body
  const { _id } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id });
    if (!isExisting) {
      return res.json({
        success: false,
        code: UNAUTHORIZED,
        message: 'Wrong Credentials',
      });
    }

    // Verifying old password
    const passValidation = await bcrypt.compare(
      oldPassword,
      isExisting.password,
    );
    if (!passValidation) {
      return res.json({
        success: false,
        code: UNAUTHORIZED,
        message: "Old Password Don't Match",
      });
    }

    //Generating the hash of password
    const passHash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS, 10),
    );

    //Updating the password
    await UserSchema.updateOne({ _id }, { $set: { password: passHash } });

    //Sending response in case everything went well!
    return res.json({
      success: true,
      code: OK,
      message: 'Password Changed Successfully',
    });
  } catch (e) {
    //Log in case of any abnormal crash
    logger('error', 'Error:', e.message);
    return res.json({
      success: false,
      code: SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
};
