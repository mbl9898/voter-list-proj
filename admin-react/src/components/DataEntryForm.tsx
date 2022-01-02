import { Dispatch, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {
  getUnAuthorizedList,
  voteRejectInitial,
} from '../helpers/authorizeHelper';
import { getUserProgressData } from '../helpers/dashboardHelper';
import InputMask from 'react-input-mask';
import { useForm } from '../helpers/useForm';
import { User } from '../interfaces/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import CModal from './CModal';
import {
  setCurrentRejectedVote,
  setDashboardData,
  setDataVoteReject,
  setMessage,
  setMessageVariant,
} from '../store';
import {
  dataEntryFormInitial,
  getDefaultBlockCodeData,
  getRejectedVotes,
  onBlockCodeSelect,
  submitNewVote,
  updateRejectedVote,
} from '../helpers/dataEntryHelper';
import Loading from './Loading';
import { StoreState } from './../store/index';
import axios from 'axios';

interface Props {
  forRejectedVotes?: boolean;
  setRejectedVoteIndex?: Dispatch<SetStateAction<number>>;
  setRejectedVoteModal?: Dispatch<SetStateAction<boolean>>;
}

const DataEntryForm = ({
  forRejectedVotes,
  setRejectedVoteIndex,
  setRejectedVoteModal,
}: Props) => {
  const dispatch = useAppDispatch();
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(true);
  const currentRejectedVote = useAppSelector(
    (state: StoreState) => state.app.currentRejectedVote,
  );
  const currentUser: User | null = useAppSelector(
    (state: StoreState) => state.app.currentUser,
  );
  const rejectedVotes = useAppSelector(
    (state: StoreState) => state.app.rejectedVotes,
  );
  const dataVoteReject = useAppSelector(
    (state: StoreState) => state.app.dataVoteReject,
  );
  const { onChange, onSubmit, data, setData } = useForm(
    submitVoteCallback,
    dataEntryFormInitial,
  );

  async function submitVoteCallback(data: any) {
    !forRejectedVotes &&
      (await submitNewVote(data, currentUser, dispatch, setData, setLoading));

    const res = currentRejectedVote && (await updateRejectedVote(data));
    if (res && res.success) {
      setData(dataEntryFormInitial);
      dispatch(setCurrentRejectedVote(null));
      getRejectedVotes(dispatch);
      dispatch(setDataVoteReject(voteRejectInitial));
      dispatch(setMessageVariant('info'));
      dispatch(setMessage('Vote Updated SuccessFully'));
      setRejectedVoteIndex && setRejectedVoteIndex(0);
      rejectedVotes.length === 0 &&
        setRejectedVoteModal &&
        setRejectedVoteModal(false);
      getUserProgressData(dispatch, setDashboardData);
      currentUser &&
        currentUser.role === 'admin' &&
        getUnAuthorizedList(dispatch);
    }
  }

  useEffect(() => {
    if (!forRejectedVotes) {
      dispatch(setDataVoteReject(voteRejectInitial));
      setData(dataEntryFormInitial);
      currentUser &&
        getDefaultBlockCodeData(
          currentUser.defaultBlockCode,
          dispatch,
          setData,
          setLoading,
          source,
        );
    }
    if (forRejectedVotes && currentRejectedVote) {
      setData({ ...currentRejectedVote });
      dispatch(setDataVoteReject({ ...currentRejectedVote.rejections }));
    }
    forRejectedVotes && setLoading(false);
    return () => {
      source.cancel('axios request cancelled');
    };
  }, [currentRejectedVote]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Form className="pb-5">
          <div className="row">
            {!forRejectedVotes && <h3 className="text-center p-5">Add Vote</h3>}
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.blockCode && 'bg-danger'
              }`}
            >
              <Form.Group id="blockCode">
                <Form.Label>Block Code</Form.Label>
                <Form.Select
                  name="blockCode"
                  value={data.blockCode ? data.blockCode : ''}
                  onChange={(e: any) => {
                    currentUser &&
                      onBlockCodeSelect(
                        currentUser._id,
                        e.target.value,
                        dispatch,
                        setData,
                        setLoading,
                      );
                  }}
                  required
                >
                  {' '}
                  <option value="" disabled selected hidden>
                    Select BlockCode
                  </option>
                  {currentUser?.assignedBlockCodes.map((blockCode) => (
                    <option key={blockCode} value={blockCode}>
                      {blockCode}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.constituencyName && 'bg-danger'
              }`}
            >
              <Form.Group id="constituencyName">
                <Form.Label>Constituency Name</Form.Label>
                <Form.Control
                  name="constituencyName"
                  value={data.constituencyName}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.moza && 'bg-danger'
              }`}
            >
              <Form.Group id="moza">
                <Form.Label>Moza</Form.Label>
                <Form.Control
                  name="moza"
                  value={data.moza}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.dehya && 'bg-danger'
              }`}
            >
              <Form.Group id="dehya">
                <Form.Label>Dehya</Form.Label>
                <Form.Control
                  name="dehya"
                  value={data.dehya}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.city && 'bg-danger'
              }`}
            >
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  value={data.city}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.patwarHalka && 'bg-danger'
              }`}
            >
              <Form.Group id="patwarHalka">
                <Form.Label>Patwar Halka</Form.Label>
                <Form.Control
                  name="patwarHalka"
                  value={data.patwarHalka}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.tapaydar && 'bg-danger'
              }`}
            >
              <Form.Group id="tapaydar">
                <Form.Label>Tapaydar</Form.Label>
                <Form.Control
                  name="tapaydar"
                  value={data.tapaydar}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.tehseel && 'bg-danger'
              }`}
            >
              <Form.Group id="tehseel">
                <Form.Label>Tehseel</Form.Label>
                <Form.Control
                  name="tehseel"
                  value={data.tehseel}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.talka && 'bg-danger'
              }`}
            >
              <Form.Group id="talka">
                <Form.Label>Talka</Form.Label>
                <Form.Control
                  name="talka"
                  value={data.talka}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.district && 'bg-danger'
              }`}
            >
              <Form.Group id="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  name="district"
                  value={data.district}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.unionCouncil && 'bg-danger'
              }`}
            >
              <Form.Group id="unionCouncil">
                <Form.Label>Union Council</Form.Label>
                <Form.Control
                  name="unionCouncil"
                  value={data.unionCouncil}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.bookNo && 'bg-danger'
              }`}
            >
              <Form.Group id="bookNo">
                <Form.Label>Book No</Form.Label>
                <Form.Control
                  name="bookNo"
                  value={data.bookNo}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.constituency && 'bg-danger'
              }`}
            >
              <Form.Group id="constituency">
                <Form.Label>Constituency</Form.Label>
                <Form.Control
                  name="constituency"
                  value={data.constituency}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.gender && 'bg-danger'
              }`}
            >
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={data.gender ? data.gender : ''}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.voteSNo && 'bg-danger'
              }`}
            >
              <Form.Group id="voteSNo">
                <Form.Label>Vote S No</Form.Label>
                <Form.Control
                  name="voteSNo"
                  value={data.voteSNo ? data.voteSNo : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.familyNo && 'bg-danger'
              }`}
            >
              <Form.Group id="familyNo">
                <Form.Label>Family No</Form.Label>
                <Form.Control
                  name="familyNo"
                  value={data.familyNo ? data.familyNo : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.name && 'bg-danger'
              }`}
            >
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={data.name ? data.name : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.maritalStatus && 'bg-danger'
              }`}
            >
              <Form.Group id="maritalStatus">
                <Form.Label>Marital Status</Form.Label>
                <Form.Select
                  name="maritalStatus"
                  value={data.maritalStatus ? data.maritalStatus : ''}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Marital Status
                  </option>
                  <option value="MARRIED">Married</option>
                  <option value="UNMARRIED">Unmarried</option>
                  <option value="-">-</option>
                </Form.Select>
                {/* <Form.Control
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={onChange}
              /> */}
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.fatherHusbandName && 'bg-danger'
              }`}
            >
              <Form.Group id="fatherHusbandName">
                <Form.Label>Father|Husband Name</Form.Label>
                <Form.Control
                  name="fatherHusbandName"
                  value={data.fatherHusbandName ? data.fatherHusbandName : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.cnic && 'bg-danger'
              }`}
            >
              <Form.Group id="cnic">
                <Form.Label>CNIC</Form.Label>
                <InputMask
                  className="form-control"
                  mask="99999-9999999-9"
                  name="cnic"
                  value={data.cnic ? data.cnic : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.age && 'bg-danger'
              }`}
            >
              <Form.Group id="Age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name="age"
                  value={data.age ? data.age : ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.houseNo && 'bg-danger'
              }`}
            >
              <Form.Group id="houseNo">
                <Form.Label>House No</Form.Label>
                <Form.Control
                  name="houseNo"
                  value={data.houseNo ? data.houseNo : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.street && 'bg-danger'
              }`}
            >
              <Form.Group id="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  name="street"
                  value={data.street ? data.street : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.phase && 'bg-danger'
              }`}
            >
              <Form.Group id="phase">
                <Form.Label>Phase</Form.Label>
                <Form.Control
                  name="phase"
                  value={data.phase ? data.phase : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.sector && 'bg-danger'
              }`}
            >
              <Form.Group id="sector">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  name="sector"
                  value={data.sector ? data.sector : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.lane && 'bg-danger'
              }`}
            >
              <Form.Group id="lane">
                <Form.Label>Lane</Form.Label>
                <Form.Control
                  name="lane"
                  value={data.lane ? data.lane : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.boulevardAvenue && 'bg-danger'
              }`}
            >
              <Form.Group id="boulevardAvenue">
                <Form.Label>Boulevard|Avenue</Form.Label>
                <Form.Control
                  name="boulevardAvenue"
                  value={data.boulevardAvenue ? data.boulevardAvenue : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div
              className={`col col-xs-12 col-sm-4 p-1 br-5 ${
                dataVoteReject.otherArea && 'bg-danger'
              }`}
            >
              <Form.Group id="otherArea">
                <Form.Label>Other Area</Form.Label>
                <Form.Control
                  name="otherArea"
                  value={data.otherArea ? data.otherArea : ''}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <CModal
              heading={'I Have Reviewed All Enteries'}
              onSubmit={onSubmit}
            />
          </div>
        </Form>
      )}
    </>
  );
};

export default DataEntryForm;
