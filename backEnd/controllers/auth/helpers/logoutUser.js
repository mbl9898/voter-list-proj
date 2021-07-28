// var ObjectId = require('mongoose').Types.ObjectId;
import mongoose from 'mongoose';
import { LoginSessionSchema } from '../../../schemas';

export const logoutUser = async (req, res) => {
  const { accessToken, userId } = req.body;

  try {
    console.log('logout user initialized');
    const response = await LoginSessionSchema.deleteMany({
      user_id: mongoose.Types.ObjectId(userId),
    });
    if (response.ok) {
      return res.json({
        success: true,
        data: {
          message: 'done',
        },
      });
    } else {
      throw Error;
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      data: {
        message: 'some thing went wrong',
      },
    });
  }
};
