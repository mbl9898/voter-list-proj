import { logger } from '~/utils';
import { status } from '~/constants';
import { UserSchema } from '~/schemas/User';

export const updateUser = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring email, remember_me & password from body
  const { _id, username, email, role, rate, assignedBlockCodes } = req.body;

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
export const updatedUserDataAccess = async (req, res) => {
  //Codes that we might return coming from status
  const { OK, SERVER_ERROR, UNAUTHROIZED } = status;

  //Destructuring body
  const { userId } = req.body;
  const reqData = {
    fullAccess: req.body.fullAccess,
    district: req.body.district,
    city: req.body.city,
    tehseel: req.body.tehseel,
    constituency: req.body.constituency,
    unionCouncil: req.body.unionCouncil,
    constituencyName: req.body.constituencyName,
    blockCode: req.body.blockCode,
    phase: req.body.phase,
    sector: req.body.sector,
    street: req.body.street,
    gender: req.body.gender,
    lane: req.body.lane,
    boulevardAvenue: req.body.boulevardAvenue,
  };

  try {
    const dataAccess = {};
    const createExistingFindData = () => {
      for (const key in reqData) {
        if (Object.hasOwnProperty.call(reqData, key)) {
          const element = reqData[key];
          if (key !== 'fullAccess' && element?.trim()) {
            dataAccess[key] = element.trim();
          }
          if (key === 'fullAccess') {
            dataAccess[key] = element;
          }
        }
      }
    };
    createExistingFindData();

    //Making sure that the user exists
    const isExisting = await UserSchema.findOne({ _id: userId });
    if (!isExisting) {
      return res.json({
        success: false,
        message: 'User Not Found',
        error: {
          code: UNAUTHROIZED,
        },
      });
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      { _id: userId },
      { dataAccess },
      { new: true },
    );

    //Sending response in case everything went well!
    return res.json({
      status: OK,
      success: true,
      data: updatedUser,
      message: 'User Updated Successfully',
    });
  } catch (e) {
    //Log in case of any abnormal crash
    logger('error', 'Error:', e.message);
    return res.json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: SERVER_ERROR,
      },
    });
  }
};
