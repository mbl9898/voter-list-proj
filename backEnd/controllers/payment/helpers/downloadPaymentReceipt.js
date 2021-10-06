import path from 'path';
import { logger } from '~/utils';
import { status } from '~/constants';

export const downloadPaymentReceipt = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const fileName = req.params.filename;
    const newFilePath = `../../uploads/payment/${fileName}`;
    return res.json({ success: true, path: newFilePath });
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
