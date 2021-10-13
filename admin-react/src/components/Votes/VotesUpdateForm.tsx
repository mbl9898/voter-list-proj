import { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useForm } from "../../helpers/useForm";
import { User } from "../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CModal from "../CModal";
import { setMessage, setMessageVariant } from "../../store";
import { dataEntryFormInitial } from "../../helpers/dataEntryHelper";
import Loading from "../Loading";
import { StoreState } from "../../store/index";
import { VotesModel } from "../../interfaces/VotesModel";
import AuthorizedService from "../../services/AuthorizedService";

interface Props {
  voteUpdateData: VotesModel | null;
  setVoteUpdateForm: Dispatch<SetStateAction<boolean>>;
}

const VotesUpdateForm = ({ voteUpdateData, setVoteUpdateForm }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser: User | null = useAppSelector(
    (state: StoreState) => state.app.currentUser
  );
  const { onChange, onSubmit, data, setData } = useForm(
    submitVoteCallback,
    voteUpdateData
  );

  async function submitVoteCallback(data: any) {
    const res = await AuthorizedService.updateAuthorizedVote(data);
    console.log(res);

    if (res && res.success) {
      setData(dataEntryFormInitial);
      dispatch(setMessageVariant("info"));
      dispatch(setMessage("Vote Updated SuccessFully"));
      setVoteUpdateForm(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Form className="pb-5">
          <div className="row">
            <h3 className="text-center p-5">Update Authorized Vote</h3>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="blockCode">
                <Form.Label>Block Code</Form.Label>
                <Form.Select
                  name="blockCode"
                  value={data.blockCode ? data.blockCode : ""}
                  onChange={onChange}
                  required
                >
                  <option>
                    {data.blockCode
                      ? `Current: ${data.blockCode}`
                      : "Select Block Code"}
                  </option>
                  {currentUser &&
                    currentUser.assignedBlockCodes.map((blockCode) => (
                      <option key={blockCode} value={blockCode}>
                        {blockCode}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="unionCouncil">
                <Form.Label>Union Council</Form.Label>
                <Form.Control
                  name="unionCouncil"
                  value={data.unionCouncil}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={data.gender ? data.gender : ""}
                  onChange={onChange}
                  required
                >
                  <option>
                    {data.gender
                      ? `Current: ${data.gender} select the correct`
                      : `Select Gender`}
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="voteSNo">
                <Form.Label>Vote S No</Form.Label>
                <Form.Control
                  name="voteSNo"
                  value={data.voteSNo ? data.voteSNo : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="familyNo">
                <Form.Label>Family No</Form.Label>
                <Form.Control
                  name="familyNo"
                  value={data.familyNo ? data.familyNo : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={data.name ? data.name : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="maritalStatus">
                <Form.Label>Marital Status</Form.Label>
                <Form.Select
                  name="maritalStatus"
                  value={data.maritalStatus ? data.maritalStatus : ""}
                  onChange={onChange}
                  required
                >
                  <option>
                    {data.maritalStatus
                      ? `Current: ${data.maritalStatus} select the correct`
                      : `Select Marital Status`}
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
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="fatherHusbandName">
                <Form.Label>Father|Husband Name</Form.Label>
                <Form.Control
                  name="fatherHusbandName"
                  value={data.fatherHusbandName ? data.fatherHusbandName : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="cnic">
                <Form.Label>CNIC</Form.Label>
                <InputMask
                  className="form-control"
                  mask="99999-9999999-9"
                  name="cnic"
                  value={data.cnic ? data.cnic : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="Age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name="age"
                  value={data.age ? data.age : ""}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="houseNo">
                <Form.Label>House No</Form.Label>
                <Form.Control
                  name="houseNo"
                  value={data.houseNo ? data.houseNo : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  name="street"
                  value={data.street ? data.street : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="phase">
                <Form.Label>Phase</Form.Label>
                <Form.Control
                  name="phase"
                  value={data.phase ? data.phase : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="sector">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  name="sector"
                  value={data.sector ? data.sector : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="lane">
                <Form.Label>Lane</Form.Label>
                <Form.Control
                  name="lane"
                  value={data.lane ? data.lane : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="boulevardAvenue">
                <Form.Label>Boulevard|Avenue</Form.Label>
                <Form.Control
                  name="boulevardAvenue"
                  value={data.boulevardAvenue ? data.boulevardAvenue : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="otherArea">
                <Form.Label>Other Area</Form.Label>
                <Form.Control
                  name="otherArea"
                  value={data.otherArea ? data.otherArea : ""}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <CModal
              heading={"I Have Reviewed All Entries"}
              triggerButtonContent="Update"
              onSubmit={onSubmit}
            />
            <button
              className="btn btn-danger mx-3 mt-5 w-25"
              onClick={() => {
                setVoteUpdateForm(false);
              }}
            >
              Close
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default VotesUpdateForm;
