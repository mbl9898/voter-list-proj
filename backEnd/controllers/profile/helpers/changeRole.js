import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

dotenv.config();

export const changeRole = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring userId, role from the body
  const { userId, role } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findById(userId, { password: 1 });

    if (!isExisting) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Email does not exist',
        },
      });
    }

    //Updating the role
    await UserSchema.updateOne(
      {
        _id: new mongoose.Types.ObjectId(isExisting._id),
      },
      { $set: { role: role } },
    );

    //Sending response in case everything went well!
    return res.json({
      success: true,
      data: {
        code: OK,
        message: `Role Changed Successfully to ${role}`,
      },
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
