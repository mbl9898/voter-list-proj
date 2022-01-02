import { logger } from '~/utils';
import { status } from '~/constants';
import { AuthorizedSchema } from 'schemas/authorized';

export const searchAuthorizedVotes = async (req, res) => {
  const { SERVER_ERROR } = status;
  try {
    const filteredData = [];
    const searchField = req.query.searchField;
    const searchTerm = req.query.search.toString().toLowerCase().trim();
    const data = await AuthorizedSchema.find();
    if (!data[0]) {
      console.log('No data found');
      return res.json({
        success: false,
        message: 'No data found',
      });
    }
    console.log(searchTerm);
    // let voteKeys = [];
    // Object.entries(data[0]._doc).forEach(([key, value]) => {
    //   voteKeys.push(key);
    // }),
    //   (voteKeys = voteKeys.filter(
    //     (key) =>
    //       key !== '_id' &&
    //       key !== 'enteredBy' &&
    //       key !== 'createdAt' &&
    //       key !== 'verifiedBy' &&
    //       key !== '__v',
    //   ));

    if (searchTerm) {
      if (
        searchField === 'blockCode' ||
        searchField === 'voteSNo' ||
        searchField === 'familyNo' ||
        searchField === 'age'
      ) {
        filteredData.push(
          ...data.filter((x) => {
            return x[searchField]?.toString().toLowerCase() === searchTerm;
          }),
        );
      } else {
        filteredData.push(
          ...data.filter((x) => {
            return x[searchField]
              ?.toString()
              .toLowerCase()
              .includes(searchTerm);
            // ||
            // x[voteKeys[1]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[2]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[3]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[4]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[5]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[6]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[7]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[8]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[9]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[10]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[11]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[12]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[13]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[14]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[15]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[16]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[17]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[18]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[19]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[20]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[21]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[22]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[23]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[24]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[25]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[26]]?.toString().toLowerCase().includes(searchTerm) ||
            // x[voteKeys[27]]?.toString().toLowerCase().includes(searchTerm)
          }),
        );
      }
    } else {
      filteredData.push(...data);
    }
    if (!filteredData.length) {
      console.log('No search results found | Invalid Search');
      return res.json({
        success: false,
        message: 'No search results found | Invalid Search',
      });
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const filteredVotesCount = filteredData.length;
    const totalPages = Math.ceil(filteredVotesCount / limit);
    const results = {};

    if (endIndex < filteredVotesCount) {
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
    results.totalRecords = filteredVotesCount;
    results.results = filteredData.slice(startIndex, limit + startIndex);
    results.totalPages = totalPages;

    return res.json({
      success: true,
      results,
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
