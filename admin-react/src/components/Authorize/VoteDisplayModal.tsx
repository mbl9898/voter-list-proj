import { useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  approveVote,
  getUnAuthorizedList,
  handleClose,
  handleDelete,
  readOnly,
  rejectVote,
  voteRejectInitial,
} from '../../helpers/authorizeHelper';
import { useVoteReject } from '../../helpers/useVoteReject';
import UnAuthorizedModel from '../../services/UnAuthorizedModel';
import { setDataVoteReject } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StoreState } from '../../store/index';
interface Props {
  heading?: string;
  body?: string;
  index: number;
  setIndex?: Dispatch<SetStateAction<number>>;
  unauthorizedVote?: UnAuthorizedModel;
  unauthorizedVotesLength: number;
  showModalProp: null | number;
  setShowModalProp?: Dispatch<SetStateAction<null | number>>;
  onSubmit?: () => void;
}
const VoteDisplayModal = ({
  heading,
  body,
  index,
  setIndex,
  unauthorizedVote,
  unauthorizedVotesLength,
  showModalProp,
  setShowModalProp,
  onSubmit,
}: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const dataVoteReject = useAppSelector(
    (state: StoreState) => state.app.dataVoteReject,
  );
  const { onChangeVoteReject } = useVoteReject();

  useEffect(() => {
    setShowModalProp && setShowModalProp(showModalProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalProp, unauthorizedVotesLength]);
  return (
    <>
      {unauthorizedVote && (
        <Modal
          show={showModalProp === index}
          fullscreen={true}
          onHide={() => {
            handleClose(dispatch, history);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {heading
                ? heading
                : `${unauthorizedVote.name} - ${unauthorizedVote.enteredBy?.username}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {dataVoteReject && body ? (
              <p>{body}</p>
            ) : (
              <div className="row">
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['blockCode'] && 'bg-danger'
                  }`}
                  id="blockCode"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Block Code: ${unauthorizedVote.blockCode}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['constituencyName'] && 'bg-danger'
                  }`}
                  id="constituencyName"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Constituency Name: ${unauthorizedVote.constituencyName}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['moza'] && 'bg-danger'
                  }`}
                  id="moza"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Moza: ${unauthorizedVote.moza}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['dehya'] && 'bg-danger'
                  }`}
                  id="dehya"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Dehya: ${unauthorizedVote.dehya}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['city'] && 'bg-danger'
                  }`}
                  id="city"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`City: ${unauthorizedVote.city}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['patwarHalka'] && 'bg-danger'
                  }`}
                  id="patwarHalka"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Patwar Halka: ${unauthorizedVote.patwarHalka}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['tapaydar'] && 'bg-danger'
                  }`}
                  id="tapaydar"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Tapaydar: ${unauthorizedVote.tapaydar}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['tehseel'] && 'bg-danger'
                  }`}
                  id="tehseel"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Tehseel: ${unauthorizedVote.tehseel}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['talka'] && 'bg-danger'
                  }`}
                  id="talka"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Talka: ${unauthorizedVote.talka}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['district'] && 'bg-danger'
                  }`}
                  id="district"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`District: ${unauthorizedVote.district}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['unionCouncil'] && 'bg-danger'
                  }`}
                  id="unionCouncil"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Union Council: ${unauthorizedVote.unionCouncil}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['bookNo'] && 'bg-danger'
                  }`}
                  id="bookNo"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Book No: ${unauthorizedVote.bookNo}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['constituency'] && 'bg-danger'
                  }`}
                  id="constituency"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Constituency: ${unauthorizedVote.constituency}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['gender'] && 'bg-danger'
                  }`}
                  id="gender"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Gender: ${unauthorizedVote.gender}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['voteSNo'] && 'bg-danger'
                  }`}
                  id="voteSNo"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Vote S No: ${unauthorizedVote.voteSNo}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['familyNo'] && 'bg-danger'
                  }`}
                  id="familyNo"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Family No: ${unauthorizedVote.familyNo}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['name'] && 'bg-danger'
                  }`}
                  id="name"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Name: ${unauthorizedVote.name}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['maritalStatus'] && 'bg-danger'
                  }`}
                  id="maritalStatus"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Marital Status: ${unauthorizedVote.maritalStatus}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['fatherHusbandName'] && 'bg-danger'
                  }`}
                  id="fatherHusbandName"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Father|Husband Name: ${unauthorizedVote.fatherHusbandName}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['cnic'] && 'bg-danger'
                  }`}
                  id="cnic"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`CNIC: ${unauthorizedVote.cnic}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['age'] && 'bg-danger'
                  }`}
                  id="age"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Age: ${unauthorizedVote.age}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['houseNo'] && 'bg-danger'
                  }`}
                  id="houseNo"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`House No: ${unauthorizedVote.houseNo}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['street'] && 'bg-danger'
                  }`}
                  id="street"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Street: ${unauthorizedVote.street}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['phase'] && 'bg-danger'
                  }`}
                  id="phase"
                  style={{
                    ...readOnly,
                  }}
                  onClick={onChangeVoteReject}
                >
                  {`Phase|Town: ${unauthorizedVote.phase}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['sector'] && 'bg-danger'
                  }`}
                  id="sector"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Sector|Block: ${unauthorizedVote.sector}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['lane'] && 'bg-danger'
                  }`}
                  id="lane"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Lane: ${unauthorizedVote.lane}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['boulevardAvenue'] && 'bg-danger'
                  }`}
                  id="boulevardAvenue"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Boulevard|Avenue: ${unauthorizedVote.boulevardAvenue}`}
                </div>
                <div
                  className={`col col-xs-12 col-sm-4 p-2 ${
                    dataVoteReject['otherArea'] && 'bg-danger'
                  }`}
                  id="otherArea"
                  style={{ ...readOnly }}
                  onClick={onChangeVoteReject}
                >
                  {`Other Area: ${unauthorizedVote.otherArea}`}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {unauthorizedVotesLength !== undefined && (
              <span>{`${index + 1} of ${unauthorizedVotesLength + 1}`}</span>
            )}
            {setIndex && (
              <>
                <Button
                  variant="primary"
                  disabled={index === 0}
                  onClick={() => {
                    dispatch(setDataVoteReject(voteRejectInitial));
                    setIndex(index - 1);
                  }}
                >
                  {'< Prev'}
                </Button>
                <Button
                  variant="primary"
                  disabled={index === unauthorizedVotesLength}
                  onClick={() => {
                    dispatch(setDataVoteReject(voteRejectInitial));
                    setIndex(index + 1);
                  }}
                >
                  {'Next >'}
                </Button>{' '}
              </>
            )}
            {/* <Button variant="primary" onClick={handleClose}>
              {`< Prev`}
            </Button>
            <Button variant="primary" onClick={handleClose}>
              {`Next >`}
            </Button> */}
            <Button
              variant="primary"
              onClick={async () => {
                const success = await approveVote(unauthorizedVote);
                if (success) {
                  getUnAuthorizedList(dispatch);
                  if (setIndex) {
                    if (index === 0 && unauthorizedVotesLength > 0) {
                      setIndex(0);
                      return;
                    }

                    setIndex((prevValue) => {
                      return prevValue - 1;
                    });
                  }
                }
              }}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              disabled={unauthorizedVote.status === 'rejected'}
              onClick={async () => {
                const success =
                  unauthorizedVote._id &&
                  (await rejectVote(unauthorizedVote._id, dataVoteReject));
                if (success) {
                  getUnAuthorizedList(dispatch);
                }
                unauthorizedVotesLength === 0 && handleClose(dispatch, history);
              }}
            >
              {unauthorizedVote.status === 'rejected' ? 'Rejected' : 'Reject'}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                unauthorizedVote._id &&
                  handleDelete(unauthorizedVote._id, dispatch);
                unauthorizedVotesLength === 0 && handleClose(dispatch, history);
              }}
            >
              Delete
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleClose(dispatch, history);
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

export default VoteDisplayModal;
