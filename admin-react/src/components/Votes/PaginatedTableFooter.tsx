import React, { Dispatch, SetStateAction } from 'react';
import {
  getAuthorizedVotesPage,
  getSearchedAuthorizedVotes,
} from '../../helpers/votesHelper';
import { VotesModel } from '../../interfaces/VotesModel';
import { useAppDispatch } from '../../store/hooks';
import { VotesTableVoteRes } from './VotesTable';

interface Props {
  currentPageTemp: number;
  setCurrentPageTemp: Dispatch<SetStateAction<number>>;
  voteRes: VotesTableVoteRes;
  setVoteRes: Dispatch<SetStateAction<VotesTableVoteRes>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  votesLimit: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  setVotesData: Dispatch<SetStateAction<VotesModel[] | null>>;
  currentSearchField: string;
}

const PaginatedTableFooter = ({
  currentPageTemp,
  setCurrentPageTemp,
  voteRes,
  setVoteRes,
  currentPage,
  setCurrentPage,
  votesLimit,
  setLoading,
  searchTerm,
  setVotesData,
  currentSearchField,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          {currentPage > 2 && (
            <button
              className="btn btn-primary mx-2 my-3"
              onClick={() => {
                setLoading(true);
                searchTerm &&
                  getSearchedAuthorizedVotes(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentSearchField,
                    searchTerm,
                    1,
                    votesLimit,
                    setLoading,
                  );
                !searchTerm &&
                  getAuthorizedVotesPage(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    1,
                    votesLimit,
                    setLoading,
                  );
                setCurrentPage(1);
                setCurrentPageTemp(1);
              }}
            >
              {`|<`}
            </button>
          )}
          {currentPage > 1 && (
            <button
              className="btn btn-primary mx-2 my-3"
              onClick={() => {
                setLoading(true);
                searchTerm &&
                  getSearchedAuthorizedVotes(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentSearchField,
                    searchTerm,
                    currentPage - 1,
                    votesLimit,
                    setLoading,
                  );
                !searchTerm &&
                  getAuthorizedVotesPage(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentPage - 1,
                    votesLimit,
                    setLoading,
                  );
                setCurrentPage((prevValue) => {
                  setCurrentPageTemp(prevValue - 1);
                  return prevValue - 1;
                });
              }}
            >
              {`<Prev`}
            </button>
          )}
          <input
            className="form-control mx-2 my-3"
            style={{ width: 4 + 'rem' }}
            type="number"
            value={currentPageTemp}
            onChange={(e: any) => setCurrentPageTemp(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                setLoading(true);
                searchTerm &&
                  getSearchedAuthorizedVotes(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentSearchField,
                    searchTerm,
                    currentPageTemp,
                    votesLimit,
                    setLoading,
                  );
                !searchTerm &&
                  getAuthorizedVotesPage(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentPageTemp,
                    votesLimit,
                    setLoading,
                  );
                setCurrentPage(currentPageTemp);
              }
            }}
          />
          {currentPage < voteRes.totalPages && (
            <button
              className="btn btn-primary mx-2 my-3"
              onClick={() => {
                setLoading(true);
                searchTerm &&
                  getSearchedAuthorizedVotes(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentSearchField,
                    searchTerm,
                    currentPage + 1,
                    votesLimit,
                    setLoading,
                  );
                !searchTerm &&
                  getAuthorizedVotesPage(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentPage + 1,
                    votesLimit,
                    setLoading,
                  );
                setCurrentPage((prevValue) => {
                  setCurrentPageTemp(prevValue + 1);
                  return prevValue + 1;
                });
              }}
            >
              {`Next>`}
            </button>
          )}
          {currentPage < voteRes.totalPages - 1 && (
            <button
              className="btn btn-primary mx-2 my-3"
              onClick={() => {
                setLoading(true);
                searchTerm &&
                  getSearchedAuthorizedVotes(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    currentSearchField,
                    searchTerm,
                    voteRes.totalPages,
                    votesLimit,
                    setLoading,
                  );
                !searchTerm &&
                  getAuthorizedVotesPage(
                    dispatch,
                    setVotesData,
                    setVoteRes,
                    voteRes.totalPages,
                    votesLimit,
                    setLoading,
                  );
                setCurrentPage(voteRes.totalPages);
                setCurrentPageTemp(voteRes.totalPages);
              }}
            >
              {`>|`}
            </button>
          )}
        </div>
        {voteRes && (
          <div>
            <span className="me-3 p-1">
              (Records:{' '}
              {(currentPageTemp < voteRes.totalPages
                ? currentPageTemp * 50
                : voteRes.totalRecords) +
                ' of ' +
                voteRes.totalRecords}
              )
            </span>
            <span className="me-3 p-1">
              (Page: {currentPageTemp + ' of ' + voteRes.totalPages})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginatedTableFooter;
