import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema, UnAuthorizedSchema, UserSchema } from '~/schemas';

export const getUserDataByEmail = async (req, res) => {
  //Codes that we might return coming from status
  const { SERVER_ERROR } = status;

  //Destructuring user from the req that we added in auth middleware
  const email = req.params.email;
  const currentUser = req.user;
  console.log(currentUser);

  try {
    const users = await UserSchema.find();
    const requiredUser = users.filter((x) => x.email === email);

    const UnAuthorizedData = await UnAuthorizedSchema.find();
    const AuthorizedData = await AuthorizedSchema.find();

    let pendingApprovals = [];
    let approvedData = [];
    let rejectedData = [];

    if (UnAuthorizedData || UnAuthorizedData.length > 0) {
      const unAuthorizedDataByEmail = UnAuthorizedData.filter(
        (x) => x.enteredBy.email === email,
      );
      pendingApprovals = unAuthorizedDataByEmail.filter(
        (x) => x.status === 'pending',
      );
    }
    if (UnAuthorizedData || UnAuthorizedData.length > 0) {
      const unAuthorizedDataByEmail = UnAuthorizedData.filter(
        (x) => x.enteredBy.email === email,
      );
      rejectedData = unAuthorizedDataByEmail.filter(
        (x) => x.status === 'rejected',
      );
    }

    if (pendingApprovals || pendingApprovals.length > 0) {
      approvedData = AuthorizedData.filter((x) => x.enteredBy.email === email);
    }

    return res.json({
      success: true,
      data: {
        user: requiredUser,
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
