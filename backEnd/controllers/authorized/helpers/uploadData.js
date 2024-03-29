import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from '~/schemas';

export const uploadData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    if (!req.body.cnic) {
      throw new Error('Invalid CNIC Number');
    }
    const {
      blockCode,
      voteSNo,
      familyNo,
      gender,
      name,
      fatherHusbandName,
      maritalStatus,
      cnic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      constituencyName,
      moza,
      dehya,
      city,
      patwarHalka,
      tapaydar,
      tehseel,
      talka,
      district,
      unionCouncil,
      bookNo,
      constituency,
      address,
      updateNo,
      enteredBy,
    } = req.body;

    const verifiedBy = req.user;

    const data = new AuthorizedSchema({
      blockCode: +blockCode,
      voteSNo,
      familyNo,
      gender,
      name,
      fatherHusbandName,
      maritalStatus,
      cnic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      constituencyName,
      moza,
      dehya,
      city,
      patwarHalka,
      tapaydar,
      tehseel,
      talka,
      district,
      unionCouncil,
      bookNo,
      constituency,
      address,
      updateNo,
      enteredBy: enteredBy,
      verifiedBy: {
        username: verifiedBy.username,
        email: verifiedBy.email,
        role: verifiedBy.role,
      },
      createdAt: new Date().toISOString(),
    });

    await data.save();

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
