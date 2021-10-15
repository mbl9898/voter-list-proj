import { Dispatch, SetStateAction } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import AuthorizedService from "../services/AuthorizedService";
import { setMessage, setMessageVariant } from "../store";

const createFilteredVotesHeadings = async (
  votesData: VotesModel[],
  setFilteredVotesHeadings: Dispatch<SetStateAction<string[] | null>>
  // setSearchOptions: Dispatch<SetStateAction<string[] | null>>
) => {
  let resHeadings = votesData[0] && Object.keys(votesData[0]);
  let sentenceCaseHeadings: string[] = [];
  if (resHeadings) {
    resHeadings.unshift("Sr");
    resHeadings = resHeadings.filter(
      (heading: string) =>
        heading !== "filePath" &&
        heading !== "_id" &&
        heading !== "enteredBy" &&
        heading !== "createdAt" &&
        heading !== "verifiedBy" &&
        heading !== "__v"
    );
    resHeadings.forEach((heading: string) => {
      const result = heading.replace(/([A-Z])/g, " $1");
      sentenceCaseHeadings.push(
        result.charAt(0).toUpperCase() + result.slice(1)
      );
    });
    setFilteredVotesHeadings(sentenceCaseHeadings);
    // resHeadings = resHeadings.filter((heading: string) => heading !== "Sr");
    // setSearchOptions(resHeadings);
  }
};

export const getAuthorizedVotesPage = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<null | VotesModel[]>>,
  setVoteRes: Dispatch<SetStateAction<any>>,
  pageNo: number,
  limit: number,
  setLoading?: Dispatch<SetStateAction<boolean>>,
  setFilteredVotesHeadings?: Dispatch<SetStateAction<string[] | null>>
  // setSearchOptions?: Dispatch<SetStateAction<string[] | null>>
) => {
  const res = await AuthorizedService.getAuthorizedPage(pageNo, limit);
  console.log(res);

  if (res && !res.success) {
    dispatch(setMessageVariant("danger"));
    dispatch(setMessage(res.message));
    setVotesData(null);
    return;
  }

  if (res.results.results[0]) {
    setFilteredVotesHeadings &&
      // setSearchOptions &&
      createFilteredVotesHeadings(
        res.results.results,
        setFilteredVotesHeadings
        // setSearchOptions
      );
    setVotesData(res.results.results);
    setVoteRes({
      next: res.results.next,
      prev: res.results.previous,
      totalPages: res.results.totalPages,
    });
    setLoading && setLoading(false);
  }
};

export const getSearchedAuthorizedVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<VotesModel[] | null>>,
  setVoteRes: Dispatch<SetStateAction<any>>,
  searchTerm: string | number,
  pageNo: number,
  limit: number,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  const res = await AuthorizedService.getAuthorizedSearch(
    searchTerm,
    pageNo,
    limit
  );
  console.log(res);

  if (res && !res.success) {
    dispatch(setMessageVariant("danger"));
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
    });
    setLoading && setLoading(false);
  }
};
