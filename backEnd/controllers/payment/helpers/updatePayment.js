import { logger } from '~/utils';
import { status } from '~/constants';
import fs from 'fs';
import { PaymentSchema } from 'schemas/Payment';

export const updatePayment = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const { id } = req.params;
    const { email, title, amount, description } = req.body;
    const file = req.files && req.files.file;
    const filePath = file && `../../uploads/payment/${file.name}`;
    const fileName = file && file.name;

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

    const paymentToUpdate = await PaymentSchema.findById({
      _id: req.params.id,
    });
    if (fileName) {
      if (paymentToUpdate.fileName !== fileName) {
        const checkName = await PaymentSchema.findOne({ fileName });
        if (checkName) {
          const error = new Error('Payment file with this name already exist');
          console.log(error);
          return res.json({
            success: false,
            message: 'Payment file with this name already exist',
          });
        }
      }
      fs.unlinkSync(paymentToUpdate.filePath);
      file.mv(filePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });
    }
    console.log(req.body);
    if (email) {
      paymentToUpdate.email = email;
    }
    if (title) {
      paymentToUpdate.title = title;
    }
    if (title) {
      paymentToUpdate.amount = amount;
    }
    if (description) {
      paymentToUpdate.description = description;
    }
    if (fileName) {
      paymentToUpdate.fileName = fileName;
    }
    if (filePath) {
      paymentToUpdate.filePath = filePath;
    }

    const data = await PaymentSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...paymentToUpdate,
      },
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
