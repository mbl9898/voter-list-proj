import { Fragment, SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { useEffect } from "react";
import {
  getAuthorizedVotesPage,
  getSearchedAuthorizedVotes,
  onVotesSearch,
} from "../../helpers/votesHelper";
import { VotesModel } from "../../interfaces/VotesModel";
import AuthorizedService from "../../services/AuthorizedService";
import { setMessage, setMessageVariant } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import CModal from "../CModal";
import Loading from "../Loading";

interface Props {
  setVoteUpdateData: Dispatch<SetStateAction<VotesModel | null>>;
  setVoteUpdateForm: Dispatch<SetStateAction<boolean>>;
  voteUpdateForm: boolean;
}

const VotesTable = ({
  setVoteUpdateData,
  setVoteUpdateForm,
  voteUpdateForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const votesLimit = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTemp, setCurrentPageTemp] = useState(1);
  const [searchOptions, setSearchOptions] = useState<string[] | null>(null);
  const [currentSearchField, setCurrentSearchField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [votesData, setVotesData] = useState<null | VotesModel[]>(null);
  const [voteRes, setVoteRes] = useState<any>({});
  const [filteredVotesHeadings, setFilteredVotesHeadings] = useState<
    null | string[]
  >(null);
  const deleteAuthorizedVote = async (id: string) => {
    const res = await AuthorizedService.deleteAuthorizedRecord(id);

    if (res && !res.success) {
      dispatch(setMessageVariant("danger"));
      dispatch(setMessage(res.message));
      return;
    }

    dispatch(setMessageVariant("success"));
    dispatch(setMessage(res.message));

    getAuthorizedVotesPage(
      dispatch,
      setVotesData,
      setVoteRes,
      currentPage,
      votesLimit,
      setLoading
    );
  };
  const onSubmit = (vote: VotesModel) => {
    vote._id && deleteAuthorizedVote(vote._id);
  };

  useEffect(() => {
    !searchTerm &&
      getAuthorizedVotesPage(
        dispatch,
        setVotesData,
        setVoteRes,
        currentPage,
        votesLimit,
        setLoading,
        setFilteredVotesHeadings,
        setSearchOptions
      );
  }, [voteUpdateForm, currentPage]);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {(!votesData || (votesData && !votesData[0])) && (
            <h5 className="text-center my-3">No Authorized Votes Data</h5>
          )}
          {votesData![0] && (
            <div className="pb-5">
              <h5 className="text-center my-3">Authorized Votes</h5>
              <div className="input-group mb-3">
                <select
                  className="form-select"
                  style={{ maxWidth: 10 + "rem" }}
                  value={currentSearchField}
                  onChange={(e: any) => {
                    setCurrentSearchField(e.target.value);
                  }}
                  required
                >
                  <option>Select Field</option>
                  {searchOptions?.map((heading, index) => {
                    return <option key={index}>{heading}</option>;
                  })}
                </select>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    onVotesSearch(
                      e,
                      dispatch,
                      setVotesData,
                      setVoteRes,
                      setCurrentPage,
                      currentSearchField,
                      searchTerm,
                      votesLimit,
                      setLoading
                    );
                  }}
                />
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {filteredVotesHeadings?.map(
                        (heading: string, index: number) => (
                          <th className="text-center" key={index} scope="col">
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {votesData?.map((vote: VotesModel, index: number) => {
                      return (
                        <Fragment key={index}>
                          <tr
                            // className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <th scope="row">
                              {currentPage === 1
                                ? index + 1
                                : (currentPage - 1) * votesLimit + index + 1}
                            </th>
                            <td className="text-center">{vote.blockCode}</td>
                            <td className="text-center">{vote.voteSNo}</td>
                            <td className="text-center">{vote.familyNo}</td>
                            <td className="text-center">{vote.gender}</td>
                            <td className="text-center">{vote.name}</td>
                            <td className="text-center">
                              {vote.fatherHusbandName}
                            </td>
                            <td className="text-center">
                              {vote.maritalStatus}
                            </td>
                            <td className="text-center">{vote.cnic}</td>
                            <td className="text-center">{vote.age}</td>
                            <td className="text-center">{vote.houseNo}</td>
                            <td className="text-center">{vote.street}</td>
                            <td className="text-center">{vote.phase}</td>
                            <td className="text-center">{vote.sector}</td>
                            <td className="text-center">{vote.lane}</td>
                            <td className="text-center">
                              {vote.boulevardAvenue}
                            </td>
                            <td className="text-center">{vote.otherArea}</td>
                            <td className="text-center">
                              {vote.constituencyName}
                            </td>
                            <td className="text-center">{vote.moza}</td>
                            <td className="text-center">{vote.dehya}</td>
                            <td className="text-center">{vote.city}</td>
                            <td className="text-center">{vote.patwarHalka}</td>
                            <td className="text-center">{vote.tapaydar}</td>
                            <td className="text-center">{vote.tehseel}</td>
                            <td className="text-center">{vote.talka}</td>
                            <td className="text-center">{vote.district}</td>
                            <td className="text-center">{vote.unionCouncil}</td>
                            <td className="text-center">{vote.bookNo}</td>
                            <td className="text-center">{vote.constituency}</td>
                          </tr>
                          <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                              <button
                                className="dropdown-item btn text-primary"
                                onClick={() => {
                                  setVoteUpdateData(
                                    !voteUpdateForm ? vote : null
                                  );
                                  setVoteUpdateForm((prevV) => !prevV);
                                }}
                              >
                                Update
                              </button>
                            </li>
                            <li>
                              <CModal
                                heading={
                                  "Are you sure you want to delete this Vote?"
                                }
                                triggerButtonContent="delete"
                                triggerButtonVariant="danger"
                                onSubmit={() => {
                                  onSubmit(vote);
                                }}
                                btnClasses="dropdown-item text-primary"
                              />
                            </li>
                          </ul>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center">
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
                            setLoading
                          );
                        !searchTerm &&
                          getAuthorizedVotesPage(
                            dispatch,
                            setVotesData,
                            setVoteRes,
                            1,
                            votesLimit,
                            setLoading
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
                            setLoading
                          );
                        !searchTerm &&
                          getAuthorizedVotesPage(
                            dispatch,
                            setVotesData,
                            setVoteRes,
                            currentPage - 1,
                            votesLimit,
                            setLoading
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
                    style={{ width: 4 + "rem" }}
                    type="number"
                    value={currentPageTemp}
                    onChange={(e: any) => setCurrentPageTemp(e.target.value)}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
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
                            setLoading
                          );
                        !searchTerm &&
                          getAuthorizedVotesPage(
                            dispatch,
                            setVotesData,
                            setVoteRes,
                            currentPageTemp,
                            votesLimit,
                            setLoading
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
                            setLoading
                          );
                        !searchTerm &&
                          getAuthorizedVotesPage(
                            dispatch,
                            setVotesData,
                            setVoteRes,
                            currentPage + 1,
                            votesLimit,
                            setLoading
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
                            setLoading
                          );
                        !searchTerm &&
                          getAuthorizedVotesPage(
                            dispatch,
                            setVotesData,
                            setVoteRes,
                            voteRes.totalPages,
                            votesLimit,
                            setLoading
                          );
                        setCurrentPage(voteRes.totalPages);
                        setCurrentPageTemp(voteRes.totalPages);
                      }}
                    >
                      {`>|`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VotesTable;
