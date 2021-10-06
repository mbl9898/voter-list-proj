import { logger } from '~/utils';
import { status } from '~/constants';
import path from 'path';
import { PaymentSchema } from 'schemas/Payment';

export const createPayment = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const user = req.user;
    const file = req.files.file;
    const fileName = new Date().getTime() + '_' + file.name;
    const filePath = `../../uploads/payment/${fileName}`;

    if (
      file.mimetype !== 'application/pdf' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg'
    ) {
      const error = new Error('Invalid File Type');
      console.log(error);
      return res.json({ success: false, message: 'Invalid File Type' });
    }

    const checkName = await PaymentSchema.findOne({ fileName });
    if (checkName) {
      const error = new Error('Payment file with this name already exist');
      console.log(error);
      return res.json({
        success: false,
        message: 'Payment file with this name already exist',
      });
    }
    file.mv(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
          error: err,
          message: 'no such file or directory',
        });
      }
      const data = new PaymentSchema({
        email: req.body.email,
        title: req.body.title,
        amount: req.body.amount,
        description: req.body.description,
        fileName,
        filePath,
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
