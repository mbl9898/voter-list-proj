import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const getData = async (_, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const data = await UnAuthorizedSchema.find();
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

export const getDataById = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  const { id } = req.params;
  try {
    const data = await UnAuthorizedSchema.findById(id);
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
