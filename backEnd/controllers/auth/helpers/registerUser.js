import bcrypt from 'bcrypt';

import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const registerUser = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, CONFLICT } = status;

  //Destructuring email & password from body
  const { username, email, password } = req.body;
  try {
    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ email }, { _id: 1 });

    if (isExisting) {
      return res.json({
        success: false,
        error: {
          code: CONFLICT,
          message: 'This email is already associated with an account',
        },
      });
    }

    //Generating the hash of the password
    const passHash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS, 10),
    );

    //Registering the user
    const newUser = new UserSchema({
      username,
      email,
      password: passHash,
      role: 'dataEntry',
      isApproved: false,
      createdAt: new Date().toISOString(),
    });
    await newUser.save();

    //Sending response in case everything went well!
    return res.json({
      success: true,
      data: {
        ...newUser._doc,
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
