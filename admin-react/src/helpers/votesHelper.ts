import { Dispatch, SetStateAction } from 'react';
import { VotesTableVoteRes } from '../components/Votes/VotesTable';
import { VotesModel } from '../interfaces/VotesModel';
import AuthorizedService from '../services/AuthorizedService';
import { setMessage, setMessageVariant } from '../store';

export const voteResInitial = {
  next: { page: 0, limit: 0 },
  prev: { page: 0, limit: 0 },
  totalPages: 0,
  totalRecords: 0,
};
let headings = [
  'blockCode',
  'voteSNo',
  'familyNo',
  'gender',
  'name',
  'fatherHusbandName',
  'maritalStatus',
  'cnic',
  'age',
  'houseNo',
  'street',
  'phase',
  'sector',
  'lane',
  'boulevardAvenue',
  'otherArea',
  'constituencyName',
  'moza',
  'dehya',
  'city',
  'patwarHalka',
  'tapaydar',
  'tehseel',
  'talka',
  'district',
  'unionCouncil',
  'bookNo',
  'constituency',
];

const createFilteredVotesHeadings = async (
  setFilteredVotesHeadings: Dispatch<SetStateAction<string[] | null>>,
  setSearchOptions: Dispatch<SetStateAction<string[] | null>>,
) => {
  // let resHeadings = votesData[0] && Object.keys(votesData[0]);
  let sentenceCaseHeadings: string[] = [];
  if (headings) {
    headings.unshift('Sr');
    headings = headings.filter(
      (heading: string) =>
        heading !== 'filePath' &&
        heading !== '_id' &&
        heading !== 'enteredBy' &&
        heading !== 'createdAt' &&
        heading !== 'verifiedBy' &&
        heading !== '__v',
    );
    headings.forEach((heading: string) => {
      const result = heading.replace(/([A-Z])/g, ' $1');
      sentenceCaseHeadings.push(
        result.charAt(0).toUpperCase() + result.slice(1),
      );
    });
    setFilteredVotesHeadings(sentenceCaseHeadings);
    headings = headings.filter((heading: string) => heading !== 'Sr');
    setSearchOptions(headings);
  }
};

export const getAuthorizedVotesPage = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<null | VotesModel[]>>,
  setVoteRes: Dispatch<SetStateAction<any>>,
  pageNo: number,
  limit: number,
  setLoading?: Dispatch<SetStateAction<boolean>>,
  setFilteredVotesHeadings?: Dispatch<SetStateAction<string[] | null>>,
  setSearchOptions?: Dispatch<SetStateAction<string[] | null>>,
  source?: any,
) => {
  const res = await AuthorizedService.getAuthorizedPage(pageNo, limit, {
    cancelToken: source?.token,
  });
  console.log(res);

  if (res && !res.success) {
    dispatch(setMessageVariant('danger'));
    dispatch(setMessage(res.message));
    setVotesData(null);
    return;
  }

  if (res?.results.results[0]) {
    setFilteredVotesHeadings &&
      setSearchOptions &&
      createFilteredVotesHeadings(setFilteredVotesHeadings, setSearchOptions);
    setVotesData(res.results.results);
    setVoteRes({
      next: res.results.next,
      prev: res.results.previous,
      totalPages: res.results.totalPages,
      totalRecords: res.results.totalRecords,
    });
    setLoading && setLoading(false);
  }
};

export const getSearchedAuthorizedVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<VotesModel[] | null>>,
  setVoteRes: Dispatch<SetStateAction<VotesTableVoteRes>>,
  searchField: string,
  searchTerm: string | number,
  pageNo: number,
  limit: number,
  setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  const res = await AuthorizedService.getAuthorizedSearch(
    searchField,
    searchTerm,
    pageNo,
    limit,
  );
  console.log(res);

  if (res && !res.success) {
    dispatch(setMessageVariant('danger'));
    dispatch(setMessage(res.message));
    setLoading && setLoading(false);
    // setVotesData(null);
    return;
  }

  if (res.results.results) {
    setVotesData(res.results.results);
    setVoteRes({
      next: res.results.next,
      prev: res.results.previous,
      totalPages: res.results.totalPages,
      totalRecords: res.results.totalRecords,
    });
    setLoading && setLoading(false);
  }
};

export const onVotesSearch = (
  event: any,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<VotesModel[] | null>>,
  setVoteRes: Dispatch<SetStateAction<VotesTableVoteRes>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  searchField: string,
  searchTerm: string | number,
  votesLimit: number,
  setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    if (!searchField) {
      dispatch(setMessageVariant('danger'));
      dispatch(setMessage('Search Field not Selected'));
      return;
    }
    console.log(searchField);
    setLoading && setLoading(true);
    getSearchedAuthorizedVotes(
      dispatch,
      setVotesData,
      setVoteRes,
      searchField,
      searchTerm,
      1,
      votesLimit,
      setLoading,
    );
    setCurrentPage(1);
  }
};
