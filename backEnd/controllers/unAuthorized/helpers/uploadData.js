import { logger } from '~/utils';
import { status } from '~/constants';
import { UnAuthorizedSchema } from '~/schemas';

export const uploadData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const checkCNIC = req.body.cnic;
    if (!checkCNIC) {
      throw new Error('Invalid CNIC Number');
    }

    const checkData = await UnAuthorizedSchema.findOne({ cnic: checkCNIC });
    if (checkData) {
      console.log(new Error('CNIC already exist'));
      return res.json({
        success: false,
        message: 'CNIC already exist',
      });
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
      cnic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
    } = req.body;

    const user = req.user;

    const data = new UnAuthorizedSchema({
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
      cnic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      enteredBy: {
        username: user.username,
        email: user.email,
        role: user.role,
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
