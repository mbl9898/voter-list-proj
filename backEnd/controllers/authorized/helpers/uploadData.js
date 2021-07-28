import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from '~/schemas';

export const uploadData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    if (!req.body.nic) {
      throw new Error('Invalid CNIC Number');
    }
    const {
      blockCode,
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
      gender,
      voteSNo,
      familyNo,
      name,
      maritalStatus,
      fatherHusbandName,
      nic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      address,
      user,
    } = req.body;

    const verifiedBy = req.user;

    const data = new AuthorizedSchema({
      blockCode,
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
      gender,
      voteSNo,
      familyNo,
      name,
      maritalStatus,
      fatherHusbandName,
      nic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      address,
      user,
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
