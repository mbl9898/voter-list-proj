import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from 'schemas/authorized';

export const searchAuthorizedUniqueData = async (req, res) => {
  const { SERVER_ERROR } = status;
  try {
    const reqData = req.query.reqData;
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
