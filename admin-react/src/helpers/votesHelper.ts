import { Dispatch, SetStateAction } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import AuthorizedService from "../services/AuthorizedService";
import { setMessage, setMessageVariant } from "../store";

export const getAllAuthorizedVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  setVotesData: Dispatch<SetStateAction<null | VotesModel[]>>,
  setFilteredVotesHeadings: Dispatch<SetStateAction<string[] | null>>,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  const res = await AuthorizedService.getAuthorized();
  console.log(res);

  if (res && !res.success) {
    dispatch(setMessageVariant("danger"));
    dispatch(setMessage(res.message));
    setVotesData(null);
    return;
  }
  if (res.votesData[0]) {
    let resHeadings = res.votesData[0] && Object.keys(res.votesData[0]);
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
      // resHeadings.push("Update");
      // resHeadings.push("Delete");
      resHeadings.forEach((heading: string) => {
        const result = heading.replace(/([A-Z])/g, " $1");
        sentenceCaseHeadings.push(
          result.charAt(0).toUpperCase() + result.slice(1)
        );
      });
      setFilteredVotesHeadings(sentenceCaseHeadings);
      setVotesData(res.votesData);
      setLoading && setLoading(false);
    }
  }
};
