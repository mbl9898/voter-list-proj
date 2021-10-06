import { unlink } from 'fs';
import { logger } from '~/utils';
import { status } from '~/constants';
import { TaskSchema } from '~/schemas';

export const deleteRecord = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  const { id } = req.params;
  try {
    const data = await TaskSchema.findById(id);
    if (!data) {
      const error = new Error('Invalid Id');
      console.log(error);
      return res.json({ success: false, message: 'Invalid Id' });
    }
    unlink(data.filePath, async (err) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Unexpected file delete Error',
          error: err,
        });
      }
      const deleteRecord = await data.delete();

      if (!deleteRecord) {
        throw new Error('Unexpected Error');
      }
      console.log(`${data.filePath} was deleted`);
      return res.json({
        success: true,
        message: 'This task record has been deleted successfully',
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
