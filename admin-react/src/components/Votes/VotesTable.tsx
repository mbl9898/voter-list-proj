import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { useEffect } from "react";
import { getAllAuthorizedVotes } from "../../helpers/votesHelper";
import { VotesModel } from "../../interfaces/VotesModel";
import AuthorizedService from "../../services/AuthorizedService";
import { TaskService } from "../../services/TaskService";
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
  const [loading, setLoading] = useState(false);
  const [votesData, setVotesData] = useState<null | VotesModel[]>(null);
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

    getAllAuthorizedVotes(
      dispatch,
      setVotesData,
      setFilteredVotesHeadings,
      setLoading
    );
  };
  const onSubmit = (vote: VotesModel) => {
    vote._id && deleteAuthorizedVote(vote._id);
  };
  useEffect(() => {
    getAllAuthorizedVotes(
      dispatch,
      setVotesData,
      setFilteredVotesHeadings,
      setLoading
    );
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {(!votesData || (votesData && !votesData[0])) && (
            <h5 className="text-center my-3">No Authorized Votes Data</h5>
          )}
          {votesData && votesData[0] && (
            <div>
              <h5 className="text-center my-3">Authorized Votes</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {filteredVotesHeadings &&
                        filteredVotesHeadings.map(
                          (heading: string, index: number) => (
                            <th className="text-center" key={index} scope="col">
                              {heading}
                            </th>
                          )
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {votesData.map((vote: VotesModel, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="text-center">{vote.blockCode}</td>
                          <td className="text-center">{vote.voteSNo}</td>
                          <td className="text-center">{vote.familyNo}</td>
                          <td className="text-center">{vote.gender}</td>
                          <td className="text-center">{vote.name}</td>
                          <td className="text-center">
                            {vote.fatherHusbandName}
                          </td>
                          <td className="text-center">{vote.maritalStatus}</td>
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
                          <td className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setVoteUpdateData(
                                  !voteUpdateForm ? vote : null
                                );
                                setVoteUpdateForm(!voteUpdateForm);
                              }}
                            >
                              update
                            </button>
                          </td>
                          <td>
                            <CModal
                              heading={
                                "Are you sure you want to delete this Vote?"
                              }
                              triggerButtonContent="delete"
                              triggerButtonVarient="danger"
                              onSubmit={() => {
                                onSubmit(vote);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VotesTable;
