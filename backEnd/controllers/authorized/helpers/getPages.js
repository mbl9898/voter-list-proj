import { logger } from '~/utils';
import { status } from '~/constants';

export const getPages = async (_, res) => {
  const { SERVER_ERROR } = status;
  try {
    const results = res.paginatedResults;

    return res.json({
      success: true,
      results,
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
