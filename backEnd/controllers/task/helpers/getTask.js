import { BlockCodeSchema, TaskSchema } from '~/schemas';
import { logger } from '~/utils';
import { status } from '~/constants';

export const getCurrentUserTasks = async (_, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const data = await TaskSchema.find();
    if (!data) {
      throw new Error('Invalid Request');
    }
    const userEmail = req.user.email;
    data = data.filter((x) => x.email === userEmail);
    return res.json({
      success: true,
      data,
    });
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getAllTasks = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const data = await TaskSchema.find();
    if (!data) {
      throw new Error('Invalid Request');
    }
    return res.json({
      success: true,
      data,
    });
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
