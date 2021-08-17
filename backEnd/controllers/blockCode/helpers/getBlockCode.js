import { BlockCodeSchema } from '~/schemas';
import { logger } from '~/utils';
import { status } from '~/constants';

export const getData = async (_, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const data = await BlockCodeSchema.find();
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

export const getDataByBlockCodeNo = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  const { blockCodeNo } = req.params;
  try {
    const data = await BlockCodeSchema.findOne({ blockCodeNo });
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
