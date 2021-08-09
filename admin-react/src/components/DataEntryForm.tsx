import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserProgressData } from "../helpers/dashboardHelper";
import { dataEntryFormInitial } from "../helpers/dataEntryHelper";
import { useForm } from "../helpers/hooks";
import UnAuthorizedService from "../services/unAuthorizedService";
import { setDashboardData } from "../store";
import CModal from "./CModal";

const DataEntryForm = () => {
  const dispatch = useDispatch();
  const { onChange, onSubmit, data, setData } = useForm(
    submitVoteCallback,
    dataEntryFormInitial
  );
  const submitVote = async (data: any) => {
    try {
      const res = await UnAuthorizedService.addNewUnauthorizedData(data);
      console.log(res);
      if (res.success) {
        setData(dataEntryFormInitial);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  function submitVoteCallback(data: any) {
    submitVote(data);
    getUserProgressData(dispatch, setDashboardData);
  }

  return (
    <>
      <Form>
        <div className="row">
          <h3 className="text-center p-5">Add Vote</h3>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="blockCode">
              <Form.Label>Block Code</Form.Label>
              <Form.Control
                type="number"
                name="blockCode"
                value={data.blockCode ? data.blockCode : ""}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>Union Council</Form.Label>
              <Form.Control
                name="unionCouncil"
                value={data.unionCouncil}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={data.gender}
                onChange={onChange}
                required
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
              {/* <Form.Control
                name="gender"
                value={data.gender}
                onChange={onChange}
                required
              /> */}
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={data.name}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="mMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={onChange}
                required
              >
                <option>Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="-">-</option>
              </Form.Select>
              {/* <Form.Control
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={onChange}
              /> */}
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="fatherHusbandName">
              <Form.Label>Father|Husband Name</Form.Label>
              <Form.Control
                name="fatherHusbandName"
                value={data.fatherHusbandName}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="cnic">
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                name="cnic"
                value={data.cnic}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
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
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="houseNo">
              <Form.Label>House No</Form.Label>
              <Form.Control
                name="houseNo"
                value={data.houseNo}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="street"
                value={data.street}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="phase">
              <Form.Label>Phase</Form.Label>
              <Form.Control
                name="phase"
                value={data.phase}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="sector">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                name="sector"
                value={data.sector}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>Lane</Form.Label>
              <Form.Control name="lane" value={data.lane} onChange={onChange} />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="boulevardAvenue">
              <Form.Label>Boulevard|Avenue</Form.Label>
              <Form.Control
                name="boulevardAvenue"
                value={data.boulevardAvenue}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="otherArea">
              <Form.Label>Other Area</Form.Label>
              <Form.Control
                name="otherArea"
                value={data.otherArea}
                onChange={onChange}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <CModal
            heading={"I Have Reviewed All Enteries"}
            onSubmit={onSubmit}
          />
        </div>
      </Form>
    </>
  );
};

export default DataEntryForm;
