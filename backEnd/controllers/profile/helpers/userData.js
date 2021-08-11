import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema, UnAuthorizedSchema } from '~/schemas';

export const userData = async (req, res) => {
  //Codes that we might return coming from status
  const { SERVER_ERROR } = status;

  //Destructuring user from the req that we added in auth middleware
  const user = req.user;

  try {
    const UnAuthorizedData = await UnAuthorizedSchema.find();
    const AuthorizedData = await AuthorizedSchema.find();

    let pendingApprovals = [];
    let approvedData = [];
    let rejectedData = [];

    if (UnAuthorizedData || UnAuthorizedData.length > 0) {
      pendingApprovals = UnAuthorizedData.filter((x) => x.status === 'pending');
    }
    if (UnAuthorizedData || UnAuthorizedData.length > 0) {
      const unAuthorizedDataByEmail = UnAuthorizedData.filter(
        (x) => x.enteredBy.email === user.email,
      );
      rejectedData = unAuthorizedDataByEmail.filter(
        (x) => x.status === 'rejected',
      );
    }

    if (pendingApprovals || pendingApprovals.length > 0) {
      approvedData = AuthorizedData.filter(
        (x) => x.enteredBy.email === user.email,
      );
    }
    console.log(pendingApprovals, 'pendingApprovals');
    console.log(approvedData, 'approvedData');
    console.log(rejectedData, 'rejectedData');
    return res.json({
      success: true,
      data: {
        pending: pendingApprovals ? pendingApprovals.length : [],
        approved: approvedData ? approvedData.length : [],
        rejected: rejectedData ? rejectedData.length : [],
      },
    });
  } catch (e) {
    //Log in case of any abnormal crash
    logger('error', 'Error:', e.message);
    return res.json({
      success: false,
      error: {
        code: SERVER_ERROR,
        message: 'Internal Server Error',
      },
    });
  }
};
