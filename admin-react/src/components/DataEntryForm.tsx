import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useForm } from "../helpers/hooks";
import { ApiService } from "../services/ApiServices";
import UnAuthorizedService from "../services/unAuthorizedService";

const DataEntryForm = () => {
  const [isReading, setIsReading] = useState(false);
  const submitVote = async () => {
    try {
      const req = await UnAuthorizedService.addNewUnauthorizedData(data.value);
      // confirmation.value = false;
      return req.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { onChange, onSubmit, data } = useForm(loginUserCallback, {
    Address: "",
    Age: "",
    "Block Code": "",
    "Book No": "",
    "Boulevard|Avenue": "",
    City: "",
    Constituency: "",
    "Constituency Name": "",
    Count: "",
    Dehya: "",
    District: "",
    "Family No": "",
    "Father|Husband Name": "",
    Gender: "",
    "House No": "",
    Lane: "",
    "Marital Status": "",
    Moza: "",
    NIC: "",
    Name: "",
    "Other Area": "",
    "Patwar Halka": "",
    Phase: "",
    "S No": "",
    Sector: "",
    Street: "",
    Talka: "",
    Tapaydar: "",
    Tehseel: "",
    "Union Council": "",
    "Vote S No": "",
  });
  function loginUserCallback() {
    submitVote();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="row">
          <h3 className="text-center p-5">Add Vote</h3>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="blockCode">
              <Form.Label>Block Code</Form.Label>
              <Form.Control
                type="number"
                name="Block Code"
                value={data["Block Code"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="constituencyName">
              <Form.Label>Constituency Name</Form.Label>
              <Form.Control
                name="Constituency Name"
                value={data["Constituency Name"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="moza">
              <Form.Label>Moza</Form.Label>
              <Form.Control
                name="Moza"
                value={data.Moza}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="dehya">
              <Form.Label>Dehya</Form.Label>
              <Form.Control
                name="Dehya"
                value={data.Dehya}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="City"
                value={data.City}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="patwarHalka">
              <Form.Label>Patwar Halka</Form.Label>
              <Form.Control
                name="Patwar Halka"
                value={data["Patwar Halka"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="tapaydar">
              <Form.Label>Tapaydar</Form.Label>
              <Form.Control
                name="Tapaydar"
                value={data.Tapaydar}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="tehseel">
              <Form.Label>Tehseel</Form.Label>
              <Form.Control
                name="Tehseel"
                value={data.Tehseel}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="talka">
              <Form.Label>Talka</Form.Label>
              <Form.Control
                name="Talka"
                value={data.Talka}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                name="District"
                value={data.District}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>Union Council</Form.Label>
              <Form.Control
                name="Union Council"
                value={data["Union Council"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="bookNo">
              <Form.Label>Book No</Form.Label>
              <Form.Control
                name="Book No"
                value={data["Book No"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="constituency">
              <Form.Label>Constituency</Form.Label>
              <Form.Control
                name="Constituency"
                value={data.Constituency}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="Gender"
                value={data.Gender}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="voteSNo">
              <Form.Label>Vote S No</Form.Label>
              <Form.Control
                name="Vote S No"
                value={data["Vote S No"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="familyNo">
              <Form.Label>Family No</Form.Label>
              <Form.Control
                name="Family No"
                value={data["Family No"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                value={data.Name}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="mMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                name="Marital Status"
                value={data["Marital Status"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="fatherHusbandName">
              <Form.Label>Father | Husband Name</Form.Label>
              <Form.Control
                name="Father | Husband Name"
                value={data["Father | Husband Name"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="cnic">
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                name="CNIC"
                value={data.CNIC}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="Age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                name="Age"
                value={data.Age}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="houseNo">
              <Form.Label>House No</Form.Label>
              <Form.Control
                name="House No"
                value={data["House No"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="Street"
                value={data.Street}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="phase">
              <Form.Label>Phase</Form.Label>
              <Form.Control
                name="Phase"
                value={data.Phase}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="sector">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                name="Sector"
                value={data.Sector}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>Lane</Form.Label>
              <Form.Control
                name="Lane"
                value={data.Lane}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="boulevardAvenue">
              <Form.Label>Boulevard Avenue</Form.Label>
              <Form.Control
                name="Boulevard Avenue"
                value={data["Boulevard Avenue"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="otherArea">
              <Form.Label>Other Area</Form.Label>
              <Form.Control
                name="Other Area"
                value={data["Other Area"]}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary mt-5 text-center"
            style={{ width: 50 + "%" }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default DataEntryForm;
