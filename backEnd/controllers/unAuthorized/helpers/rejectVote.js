import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const rejectVote = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const id = req.body.id;
    const voteUpdate = await UnAuthorizedSchema.findByIdAndUpdate(
      { _id: id },
      { status: 'rejected' },
    );

    return res.json({
      success: true,
      voteUpdate,
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
