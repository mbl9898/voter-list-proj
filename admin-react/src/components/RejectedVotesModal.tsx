import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { voteRejectInitial } from "../helpers/authorizeHelper";
import { getRejectedVotes } from "../helpers/dataEntryHelper";
import UnAuthorizedModel from "../services/UnAuthorizedModel";
import { setCurrentRejectedVote } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DataEntryForm from "./DataEntryForm";
import Loading from "./Loading";

interface Props {
  rejectedVoteModal: boolean;
  setRejectedVoteModal: Dispatch<SetStateAction<boolean>>;
}

const RejectedVotesModal = ({
  rejectedVoteModal,
  setRejectedVoteModal,
}: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [rejectedVoteIndex, setRejectedVoteIndex] = useState(0);
  const rejectedVotes: UnAuthorizedModel[] | [] = useAppSelector(
    (state) => state.app.rejectedVotes
  );

  useEffect(() => {
    setLoading(true);
    getRejectedVotes(dispatch);
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Modal
          show={rejectedVoteModal}
          fullscreen={true}
          onHide={() => {
            setRejectedVoteModal(false);
            dispatch(setCurrentRejectedVote(rejectedVotes[0]));
            setRejectedVoteIndex(0);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rejected Votes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataEntryForm
              forRejectedVotes={true}
              setRejectedVoteIndex={setRejectedVoteIndex}
              setRejectedVoteModal={setRejectedVoteModal}
            />
          </Modal.Body>
          <Modal.Footer>
            {rejectedVotes && (
              <span>{`${
                rejectedVotes.length !== 0
                  ? rejectedVoteIndex + 1
                  : rejectedVoteIndex
              } of ${rejectedVotes.length}`}</span>
            )}
            <Button
              variant="primary"
              disabled={rejectedVoteIndex === 0}
              onClick={() => {
                dispatch(
                  setCurrentRejectedVote(rejectedVotes[rejectedVoteIndex - 1])
                );
                setRejectedVoteIndex(rejectedVoteIndex - 1);
              }}
            >
              {"< Prev"}
            </Button>
            <Button
              variant="primary"
              disabled={
                rejectedVotes && rejectedVoteIndex === rejectedVotes.length - 1
              }
              onClick={() => {
                dispatch(
                  setCurrentRejectedVote(rejectedVotes[rejectedVoteIndex + 1])
                );
                setRejectedVoteIndex(rejectedVoteIndex + 1);
              }}
            >
              {"Next >"}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setRejectedVoteModal(false);
                dispatch(setCurrentRejectedVote(rejectedVotes[0]));
                setRejectedVoteIndex(0);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default RejectedVotesModal;
