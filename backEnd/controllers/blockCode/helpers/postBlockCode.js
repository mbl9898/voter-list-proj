import { logger } from '~/utils';
import { status } from '~/constants';
import { BlockCodeSchema } from '~/schemas';
import { getBlockCodeReqData } from '..';

export const postData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const user = req.user;

    const data = new BlockCodeSchema({
      ...getBlockCodeReqData(req),
      enteredBy: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      createdAt: new Date().toISOString(),
    });

    await data.save();

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
