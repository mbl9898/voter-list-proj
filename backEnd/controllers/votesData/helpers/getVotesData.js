import { VoteSchema } from '../../../schemas/Vote';

export const getVotesData = async (req, res) => {
  console.log('get data initialized');
  const votesData = await VoteSchema.find();
  if (votesData) {
    return res.json({
      success: true,
      votesData: votesData,
    });
  }
};
