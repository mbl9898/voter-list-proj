import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from 'schemas/authorized';

export const searchAuthorizedUniqueData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const {
      district,
      city,
      tehseel,
      constituency,
      unionCouncil,
      constituencyName,
      blockCode,
      phase,
      sector,
      street,
      gender,
      lane,
      boulevardAvenue,
    } = req.query;
    const reqData = req.query;
    const findData = {};
    const createFindData = () => {
      for (const key in reqData) {
        if (Object.hasOwnProperty.call(reqData, key)) {
          const element = reqData[key];
          if (element.trim()) {
            findData[key] = element.trim();
          }
        }
      }
    };
    createFindData();
    console.log(findData);

    // console.log(reqData);
    if (!reqData.district.trim()) {
      await AuthorizedSchema.find().distinct(
        'district',
        (error, distinctData) => {
          return res.json({
            status: OK,
            success: true,
            district: distinctData,
          });
        },
      );
    }
    if (reqData.district.trim()) {
      const authorizedData = await AuthorizedSchema.find(findData);
      return res.json({
        status: OK,
        success: true,
        data: authorizedData,
      });
    }
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
