import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const rejectVote = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const { id, rejections } = req.body;
    const voteUpdate = await UnAuthorizedSchema.findByIdAndUpdate(
      { _id: id },
      { status: 'rejected', rejections: rejections },
      { new: true },
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
