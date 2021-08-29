import { unlink } from 'fs';
import { logger } from '~/utils';
import { status } from '~/constants';
import { PaymentSchema } from 'schemas/Payment';

export const deleteRecord = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  const { id } = req.params;
  try {
    const data = await PaymentSchema.findById(id);
    if (!data) {
      const error = new Error('Invalid Id');
      console.log(error);
      return res.json({ success: false, message: 'Invalid Id' });
    }
    unlink(data.filePath, (err) => {
      if (err) throw new Error('Unxpected file delete Error');
      console.log(`${data.filePath} was deleted`);
    });
    const deleteRecord = await data.delete();

    if (!deleteRecord) {
      throw new Error('Unxpected Error');
    }
    return res.json({
      success: true,
      data: 'This payment record has been deleted successfully',
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
