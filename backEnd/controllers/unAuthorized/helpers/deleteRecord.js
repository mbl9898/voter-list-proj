import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const deleteRecord = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  const { id } = req.params;
  try {
    const data = await UnAuthorizedSchema.findById(id);
    if (!data) {
      return res.json({
        success: false,
        message: 'Invalid Id',
      });
    }
    const deleteRecord = await data.delete();
    if (!deleteRecord) {
      const error = new Error('Unexpected Error');
      return res.json({
        success: false,
        message: 'Unexpected Error',
      });
    }
    return res.json({
      success: true,
      message: 'This record has been deleted successfully',
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
