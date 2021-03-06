import { logger } from '~/utils';
import { status } from '~/constants';

export const paginatedResults = (model) => {
  return async (req, res, next) => {
    const { BAD_REQUEST } = status;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalRecords = await model.countDocuments().exec();
    const totalPages = Math.ceil(totalRecords / limit);

    const results = {};

    if (endIndex < totalRecords) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.totalRecords = totalRecords;
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      results.totalPages = totalPages;
      res.paginatedResults = results;
      next();
    } catch (e) {
      //Log in case of any abnormal crash
      logger('error', 'Error:', e.message);
      return res.json({
        success: false,
        error: {
          code: BAD_REQUEST,
          message: 'Invalid Token',
        },
      });
    }
  };
};
