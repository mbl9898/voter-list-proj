import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

dotenv.config();
export const userRole = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring email, remember_me & password from body
  const { email, password, role } = req.body;

  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne(
      { email },
      { _id: 1, username: 1, password: 1 },
    );
    if (!isExisting) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Wrong Credentials',
        },
      });
    }

    //Verifying the password
    const passValidation = await bcrypt.compare(password, isExisting.password);

    if (!passValidation) {
      return res.json({
        success: false,
        error: {
          code: UNAUTHROIZED,
          message: 'Wrong Credentials',
        },
      });
    }

    const updatedRole = await UserSchema.updateOne(
      { email },
      { $set: { role } },
    );

    //Sending response in case everything went well!
    return res.json({
      success: true,
      data: updatedRole,
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
