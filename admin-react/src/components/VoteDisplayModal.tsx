import { useEffect, Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { VotesModel } from "../interfaces/VotesModel";
interface Props {
  voteIndex: number;
  unauthorizedVote: VotesModel;
  showModalProp: null | number;
  setShowModalProp: Dispatch<SetStateAction<null | number>>;
}
const VoteDisplayModal = ({
  voteIndex,
  unauthorizedVote,
  showModalProp,
  setShowModalProp,
}: Props) => {
  const handleClose = () => setShowModalProp(null);
  useEffect(() => {
    setShowModalProp(showModalProp);
  }, [setShowModalProp, showModalProp]);
  return (
    <>
      {unauthorizedVote && (
        <Modal
          show={showModalProp === voteIndex}
          fullscreen={true}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{unauthorizedVote.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Block Code: ${unauthorizedVote.blockCode}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Constituency Name: ${unauthorizedVote.constituencyName}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Moza: ${unauthorizedVote.moza}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Dehya: ${unauthorizedVote.dehya}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`City: ${unauthorizedVote.city}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Patwar Halka: ${unauthorizedVote.patwarHalka}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Tapaydar: ${unauthorizedVote.tapaydar}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Tehseel: ${unauthorizedVote.tehseel}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Talka: ${unauthorizedVote.talka}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`District: ${unauthorizedVote.district}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Union Council: ${unauthorizedVote.unionCouncil}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Book No: ${unauthorizedVote.bookNo}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Constituency: ${unauthorizedVote.constituency}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Gender: ${unauthorizedVote.gender}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Vote S No: ${unauthorizedVote.voteSNo}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Family No: ${unauthorizedVote.familyNo}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Name: ${unauthorizedVote.name}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Marital Status: ${unauthorizedVote.maritalStatus}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Father|Husband Name: ${unauthorizedVote.fatherHusbandName}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`CNIC: ${unauthorizedVote.cnic}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Age: ${unauthorizedVote.age}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`House No: ${unauthorizedVote.houseNo}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Street: ${unauthorizedVote.street}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Phase: ${unauthorizedVote.phase}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Sector: ${unauthorizedVote.sector}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Lane: ${unauthorizedVote.lane}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Boulevard|Avenue: ${unauthorizedVote.boulevardAvenue}`}
              </div>
              <div
                className="col col-xs-12 col-sm-4 p-2"
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
              >
                {`Other Area: ${unauthorizedVote.otherArea}`}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default VoteDisplayModal;
