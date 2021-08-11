import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const getRejectedVotes = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const userEmail = req.user.email;
    console.log(userEmail);
    let data = await UnAuthorizedSchema.find();
    data = data.filter((x) => x.enteredBy.email === userEmail);
    data = data.filter((x) => x.status === 'rejected');
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
