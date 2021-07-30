import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useForm } from "../helpers/hooks";

const DataEntryForm = () => {
  const [isReading, setIsReading] = useState(false);
  const submitForm = () => {

  };
  const { onChange, onSubmit, vote } = useForm(loginUserCallback, {
  Address: ""
  Age: ""
  "Block Code":""
  "Book No": ""
  "Boulevard|Avenue": ""
  City: ""
  Constituency: ""
  "Constituency Name": ""
  Count: ""
  Dehya: ""
  District: ""
  "Family No": ""
  "Father|Husband Name": ""
  Gender: ""
  "House No": ""
  Lane: ""
  "Marital Status": ""
  Moza: ""
  NIC: ""
  Name: ""
  "Other Area": ""
  "Patwar Halka": ""
  Phase: ""
  "S No": ""
  Sector: ""
  Street: ""
  Talka: ""
  Tapaydar: "",
  Tehseel: "",
  "Union Council": "",
  "Vote S No": ""
}

  });
  function loginUserCallback() {
    submitForm();
  }

  return (
    <>
      <Form onSubmit={}>
        <div className="row">
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="blockCode">
              <Form.Label>Block Code</Form.Label>
              <Form.Control
                type="number"
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="constituencyName">
              <Form.Label>Constituency Name</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Constituency Name"
            v-model="data.constituencyName"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="moza">
              <Form.Label>Moza</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Moza" v-model="data.moza" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="dehya">
              <Form.Label>Dehya</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Dehya" v-model="data.dehya" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="City" v-model="data.city" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="patwarHalka">
              <Form.Label>Patwar Halka</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Patwar Halka"
            v-model="data.patwarHalka"
        /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="tapaydar">
              <Form.Label>Tapaydar</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Tapaydar"
            v-model="data.tapaydar"
        /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="tehseel">
              <Form.Label>Tehseel</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Tehseel"
            v-model="data.tehseel"
        /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="talka">
              <Form.Label>Talka</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Talka" v-model="data.talka" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="District"
            v-model="data.district"
        /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>UnionCouncil</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="UnionCouncil"
            v-model="data.unionCouncil"
        /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="bookNo">
              <Form.Label>Book No</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="BookNo" v-model="data.bookNo" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="constituency">
              <Form.Label>Constituency</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Constituency"
            v-model="data.constituency"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Gender" v-model="data.gender" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="voteSNo">
              <Form.Label>Vote S No</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            type="number"
            placeholder="Vote S No"
            :disable="isReading"
            v-model.number="data.voteSNo"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="familyNo">
              <Form.Label>Family No</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            type="number"
            placeholder="Family No"
            :disable="isReading"
            v-model.number="data.familyNo"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Name" v-model="data.name" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="mMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Marital Status"
            v-model="data.maritalStatus"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="fatherHusbandName">
              <Form.Label>Father | Husband Name</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            placeholder="Father | Husband Name"
            :disable="isReading"
            v-model="data.fatherHusbandName"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="cnic">
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            type="number"
            placeholder="Nic"
            v-model.number="data.nic"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="Age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            type="number"
            placeholder="Age"
            v-model.number="data.age"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="houseNo">
              <Form.Label>House No</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="House No"
            v-model="data.houseNo"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Street" v-model="data.street" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="phase">
              <Form.Label>Phase</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Phase" v-model="data.phase" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="sector">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Sector" v-model="data.sector" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="unionCouncil">
              <Form.Label>Lane</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input :disable="isReading" placeholder="Lane" v-model="data.lane" /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="boulevardAvenue">
              <Form.Label>Boulevard Avenue</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Boulevard Avenue"
            v-model="data.boulevardAvenue"
          /> */}
          </div>
          <div className="col col-xs-12 col-sm-4 q-pa-sm">
            <Form.Group id="otherArea">
              <Form.Label>Other Area</Form.Label>
              <Form.Control
                name="username"
                value={vote.username}
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* <input
            :disable="isReading"
            placeholder="Other Area"
            v-model="data.otherArea"
          /> */}
          </div>
        </div>
      </Form>
    </>
  );
};

export default DataEntryForm;
