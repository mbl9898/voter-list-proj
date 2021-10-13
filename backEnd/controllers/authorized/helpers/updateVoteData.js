import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from '~/schemas';

export const updateVoteData = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  console.log(true);
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
      enteredBy,
    } = req.body;

    const verifiedBy = req.user;

    const data = await AuthorizedSchema.findByIdAndUpdate(
      { _id: req.body._id },
      {
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
        enteredBy,
        verifiedBy: {
          username: verifiedBy.username,
          email: verifiedBy.email,
          role: verifiedBy.role,
        },
        LastUpdatedAt: new Date().toISOString(),
      },
      { new: true },
    );

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
