import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema, UnAuthorizedSchema } from '~/schemas';
import { UserSchema } from './../../../schemas/User/index';
import { PaymentSchema } from './../../../schemas/Payment/index';

export const userData = async (req, res) => {
  //Codes that we might return coming from status
  const { SERVER_ERROR } = status;

  //Destructuring user from the req that we added in auth middleware
  const user = req.user;

  try {
    const PaymentData = await PaymentSchema.find();
    const UnAuthorizedData = await UnAuthorizedSchema.find();
    const AuthorizedData = await AuthorizedSchema.find();

    let totalAmountPaid = 0;
    let totalPayments = [];
    let pendingApprovals = [];
    let approvedData = [];
    let rejectedData = [];

    if (PaymentData || PaymentData.length > 0) {
      const paymentDataByEmail = PaymentData.filter(
        (x) => x.email === user.email,
      );
      paymentDataByEmail.forEach((payment) => {
        totalPayments.push(payment.amount);
      });
    }

    if (UnAuthorizedData || UnAuthorizedData.length > 0) {
      const unAuthorizedDataByEmail = UnAuthorizedData.filter(
        (x) => x.enteredBy.email === user.email,
      );
      pendingApprovals = unAuthorizedDataByEmail.filter(
        (x) => x.status === 'pending',
      );
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
    totalAmountPaid = totalPayments.reduce((totalAmount, currentAmount) => {
      return totalAmount + currentAmount;
    }, 0);

    const withdrawalAmount =
      (approvedData ? approvedData.length : 0) * user.rate - totalAmountPaid;

    return res.json({
      success: true,
      data: {
        withdrawalAmount,
        pending: pendingApprovals ? pendingApprovals.length : 0,
        approved: approvedData ? approvedData.length : 0,
        rejected: rejectedData ? rejectedData.length : 0,
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
