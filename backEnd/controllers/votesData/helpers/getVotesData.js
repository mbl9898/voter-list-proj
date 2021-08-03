import { logger } from '~/utils';
import { status } from '~/constants';
import { VoteSchema } from '~/schemas';

export const getVotesData = async (_, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const votesData = await VoteSchema.find();
    if (!votesData) {
      throw new Error('Invalid Request');
    }
    return res.json({
      status: OK,
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
