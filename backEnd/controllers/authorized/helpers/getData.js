import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from '~/schemas';
import { votesData } from './../../votesData/index';

export const getData = async (_, res) => {
  const { SERVER_ERROR } = status;
  try {
    const votesData = await AuthorizedSchema.find();

    if (!votesData[0]) {
      console.log(new Error('Invalid Request Or No Data'));
      return res.json({
        success: false,
        message: 'Invalid Request Or No Data',
      });
    }

    return res.json({
      success: true,
      votesData,
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
