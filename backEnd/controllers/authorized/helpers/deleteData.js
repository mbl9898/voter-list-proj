import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from '~/schemas';

export const deleteData = async (req, res) => {
  const { SERVER_ERROR } = status;
  const { id } = req.params;
  try {
    const data = await AuthorizedSchema.findById(id);
    if (!data) {
      console.log(new Error('Invalid Request'));
      return res.json({
        success: false,
        message: 'Invalid Request',
      });
    }

    const deletedData = await data.delete();

    if (!deletedData) {
      console.log(new Error('Invalid data'));
      return res.json({
        success: false,
        message: 'Invalid data',
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
