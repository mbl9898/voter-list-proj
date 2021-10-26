import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "../../helpers/useForm";
import AuthorizedService from "../../services/AuthorizedService";

export interface DataAccessParamsModel {
  district: string;
  city: string;
  tehseel: string;
  constituency: string;
  unionCouncil: string;
  constituencyName: string;
  blockCode: number | null;
  phase: string;
  sector: string;
  street: string;
  gender: string;
  lane: string;
  boulevardAvenue: string;
}
const DataAccess = () => {
  type SetAccessParametersData =
    | Dispatch<SetStateAction<number[]>>
    | Dispatch<SetStateAction<string[]>>;
  type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
  const formOptionsMock = [
    501021717, 501021718, 501021719, 501021720, 501021721, 501021722, 501021723,
  ];
  const [lastAccessParameter, setLastAccessParameter] = useState("");
  const [districtData, setDistrictData] = useState<string[]>([]);
  const [cityData, setCityData] = useState<string[]>([]);
  const [tehseelData, setTehseelData] = useState<string[]>([]);
  const [constituencyData, setConstituencyData] = useState<string[]>([]);
  const [unionCouncilData, setUnionCouncilData] = useState<string[]>([]);
  const [constituencyNameData, setConstituencyNameData] = useState<string[]>(
    []
  );
  const [blockCodeData, setBlockCodeData] = useState<number[]>([]);
  const [phaseData, setPhaseData] = useState<string[]>([]);
  const [sectorData, setSectorData] = useState<string[]>([]);
  const [streetData, setStreetData] = useState<string[]>([]);
  const [genderData, setGenderData] = useState<string[]>([]);
  const [laneData, setLaneData] = useState<string[]>([]);
  const [boulevardAvenueData, setBoulevardAvenueData] = useState<string[]>([]);
  const [lastAccessParameterIndex, setLastAccessParameterIndex] = useState<
    number | undefined
  >(undefined);
  const setAccessParametersDataArr = [
    setDistrictData,
    setCityData,
    setTehseelData,
    setConstituencyData,
    setUnionCouncilData,
    setConstituencyNameData,
    setBlockCodeData,
    setPhaseData,
    setSectorData,
    setStreetData,
    setGenderData,
    setLaneData,
    setBoulevardAvenueData,
  ];
  const dataAccessFormInitial: DataAccessParamsModel = {
    district: "",
    city: "",
    tehseel: "",
    constituency: "",
    unionCouncil: "",
    constituencyName: "",
    blockCode: null,
    phase: "",
    sector: "",
    street: "",
    gender: "",
    lane: "",
    boulevardAvenue: "",
  };
  const accessParametersArr = [
    "district",
    "city",
    "tehseel",
    "constituency",
    "unionCouncil",
    "constituencyName",
    "blockCode",
    "phase",
    "sector",
    "street",
    "gender",
    "lane",
    "boulevardAvenue",
  ];
  // const accessParametersNameArr = [
  //   "District",
  //   "City",
  //   "Tehseel",
  //   "Constituency",
  //   "Union Council",
  //   "Constituency Name",
  //   "BlockCode",
  //   "Phase",
  //   "Sector",
  //   "Street",
  //   "Gender",
  //   "Lane",
  //   "Boulevard | Avenue",
  // ];
  const { onSubmit, data, setData } = useForm(
    submitDataAccessCallback,
    dataAccessFormInitial
  );

  const getUniqueData = async (
    // lastSearchField: string,
    // lastSelectedValue: string | number,
    field: string[]
    // setAccessParametersData: SetAccessParametersData
  ) => {
    console.log(field);
    const res = await AuthorizedService.getUniqueAuthorizedDataSearch(
      // lastSearchField,
      // lastSelectedValue,
      field
    );
    console.log(res);
    // if (res.success) {
    //   setAccessParametersData(res.data);
    // }
  };
  const onAccessParameterChange = (event: SelectEvent) => {
    const eName = event.target.name;
    const eValue = event.target.value;
    const nextFieldNameIndex = accessParametersArr.indexOf(eName) + 1;
    const fieldName = accessParametersArr[nextFieldNameIndex];
    setData({
      ...data,
      [eName]: eValue,
    });
    console.log({
      ...data,
      [eName]: eValue,
    });
    // getUniqueData(
    //   eName,
    //   eValue,
    //   fieldName,
    //   setAccessParametersDataArr[nextFieldNameIndex]
    // );
  };
  async function submitDataAccessCallback() {}
  useEffect(() => {
    // getUniqueData("", "", "district", setDistrictData);
    getUniqueData(accessParametersArr);
  }, []);
  return (
    <div>
      <Form>
        <div className="row">
          <h4 className="text-center p-3">Data Access</h4>
          <div>
            <Form.Group id="lastAccessParameter">
              <Form.Label>Last Access Parameter</Form.Label>
              <Form.Select
                name="district"
                value={lastAccessParameter}
                onChange={(e: SelectEvent) => {
                  console.log(accessParametersArr.indexOf(e.target.value));
                  setLastAccessParameter(e.target.value);
                  setLastAccessParameterIndex(
                    accessParametersArr.indexOf(e.target.value)
                  );
                }}
                required
              >
                <option value="" disabled selected hidden>
                  Select Last Access Parameter
                </option>
                {accessParametersArr.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          {lastAccessParameterIndex !== undefined && (
            <div className="row">
              {lastAccessParameter && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="district">
                    <Form.Label>District</Form.Label>
                    <Form.Select
                      name="district"
                      value={data.district}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select District
                      </option>
                      {districtData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {cityData[0] && lastAccessParameterIndex >= 1 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="city">
                    <Form.Label>City</Form.Label>
                    <Form.Select
                      name="city"
                      value={data.city}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select City
                      </option>
                      {cityData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {tehseelData[0] && lastAccessParameterIndex >= 2 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="tehseel">
                    <Form.Label>Tehseel</Form.Label>
                    <Form.Select
                      name="tehseel"
                      value={data.tehseel}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Tehseel
                      </option>
                      {tehseelData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {constituencyData[0] && lastAccessParameterIndex >= 3 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="constituency">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Select
                      name="constituency"
                      value={data.constituency}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Constituency
                      </option>
                      {constituencyData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {unionCouncilData[0] && lastAccessParameterIndex >= 4 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="unionCouncil">
                    <Form.Label>Union Council</Form.Label>
                    <Form.Select
                      name="unionCouncil"
                      value={data.unionCouncil}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select Union Council
                      </option>
                      {unionCouncilData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {constituencyNameData[0] && lastAccessParameterIndex >= 5 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="constituencyName">
                    <Form.Label>Constituency Name</Form.Label>
                    <Form.Select
                      name="constituencyName"
                      value={data.constituencyName}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Name
                      </option>
                      {constituencyNameData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {blockCodeData[0] && lastAccessParameterIndex >= 6 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="blockCode">
                    <Form.Label>Block Code</Form.Label>
                    <Form.Select
                      name="blockCode"
                      value={data.blockCode}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Code
                      </option>
                      {blockCodeData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {phaseData[0] && lastAccessParameterIndex >= 7 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="phase">
                    <Form.Label>Phase</Form.Label>
                    <Form.Select
                      name="phase"
                      value={data.phase}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Phase
                      </option>
                      {phaseData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {sectorData[0] && lastAccessParameterIndex >= 8 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="sector">
                    <Form.Label>Sector</Form.Label>
                    <Form.Select
                      name="sector"
                      value={data.sector}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Sector
                      </option>
                      {sectorData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {streetData[0] && lastAccessParameterIndex >= 9 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="streetNo">
                    <Form.Label>Street No</Form.Label>
                    <Form.Select
                      name="streetNo"
                      value={data.streetNo}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select No
                      </option>
                      {streetData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {genderData[0] && lastAccessParameterIndex >= 10 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="sector"
                      value={data.gender}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Gender
                      </option>
                      {genderData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {laneData[0] && lastAccessParameterIndex >= 11 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="lane">
                    <Form.Label>Lane</Form.Label>
                    <Form.Select
                      name="sector"
                      value={data.lane}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Lane
                      </option>
                      {laneData.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {boulevardAvenueData[0] && lastAccessParameterIndex >= 12 && (
                <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                  <Form.Group id="boulevardAvenue">
                    <Form.Label>Boulevard | Avenue</Form.Label>
                    <Form.Select
                      name="boulevardAvenue"
                      value={data.boulevardAvenue}
                      onChange={(e: SelectEvent) => {
                        onAccessParameterChange(e);
                      }}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select District
                      </option>
                      {formOptionsMock.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default DataAccess;
