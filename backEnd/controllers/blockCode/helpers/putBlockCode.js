import { logger } from '~/utils';
import { status } from '~/constants';
import { BlockCodeSchema } from '~/schemas';
import { getBlockCodeReqData, getVoteData } from '..';

export const updateBlockCode = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    // const user = req.user;
    const data = await BlockCodeSchema.findByIdAndUpdate(
      { _id: req.body._id },
      { ...getBlockCodeReqData(req) },
      { new: true },
    );

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
