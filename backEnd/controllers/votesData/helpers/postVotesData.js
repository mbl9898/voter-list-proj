import { logger } from '~/utils';
import { status } from '~/constants';
import { VoteSchema } from '../../../schemas/Vote';

export const postVotesData = async (req, res) => {
  const vote = req.body;

  const newVote = new VoteSchema({
    Address: vote.Address,
    Age: vote.Age,
    'Block Code': vote['Block Code'],
    'Book No': vote['Book No'],
    'Boulevard|Avenue': vote['Boulevard|Avenue'],
    City: vote.City,
    Constituency: vote.Constituency,
    'Constituency Name': vote['Constituency Name'],
    Count: vote.Count,
    Dehya: vote.Dehya,
    District: vote.District,
    'Family No': vote['Family No'],
    'Father|Husband Name': vote['Father|Husband Name'],
    Gender: vote.Gender,
    'House No': vote['House No'],
    Lane: vote.Lane,
    'Marital Status': vote['Marital Status'],
    Moza: vote.Moza,
    NIC: vote.NIC,
    Name: vote.Name,
    'Other Area': vote['Other Area'],
    'Patwar Halka': vote['Patwar Halka'],
    Phase: vote.Phase,
    'S No': vote['S No'],
    Sector: vote.Sector,
    Street: vote.Street,
    Talka: vote.Talka,
    Tapaydar: vote.Tapaydar,
    Tehseel: vote.Tehseel,
    'Union Council': vote['Union Council'],
    'Vote S No': vote['Vote S No'],
  });
  await newVote.save();

  // const votes = req.body;
  // votes.forEach(async (vote) => {
  //   const newVote = new VoteSchema({
  //     Address: vote.Address,
  //     Age: vote.Age,
  //     'Block Code': vote['Block Code'],
  //     'Book No': vote['Book No'],
  //     'Boulevard|Avenue': vote['Boulevard|Avenue'],
  //     City: vote.City,
  //     Constituency: vote.Constituency,
  //     'Constituency Name': vote['Constituency Name'],
  //     Count: vote.Count,
  //     Dehya: vote.Dehya,
  //     District: vote.District,
  //     'Family No': vote['Family No'],
  //     'Father|Husband Name': vote['Father|Husband Name'],
  //     Gender: vote.Gender,
  //     'House No': vote['House No'],
  //     Lane: vote.Lane,
  //     'Marital Status': vote['Marital Status'],
  //     Moza: vote.Moza,
  //     NIC: vote.NIC,
  //     Name: vote.Name,
  //     'Other Area': vote['Other Area'],
  //     'Patwar Halka': vote['Patwar Halka'],
  //     Phase: vote.Phase,
  //     'S No': vote['S No'],
  //     Sector: vote.Sector,
  //     Street: vote.Street,
  //     Talka: vote.Talka,
  //     Tapaydar: vote.Tapaydar,
  //     Tehseel: vote.Tehseel,
  //     'Union Council': vote['Union Council'],
  //     'Vote S No': vote['Vote S No'],
  //   });
  //   await newVote.save();
  // });
  // const { OK, SERVER_ERROR } = status;
  // try {
  //   return res.json({
  //     success: true,
  //     data: {
  //       code: OK,
  //       message: 'Working',
  //     },
  //   });
  // } catch (e) {
  //   logger('error', 'Error:', e.message);
  //   return res.json({
  //     status: SERVER_ERROR,
  //     success: false,
  //     message: 'Internal Server Error',
  //   });
  // }
};
