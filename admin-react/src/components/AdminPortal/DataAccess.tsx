import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from '../../helpers/useForm';
import { getUsers } from '../../helpers/userManagementHelper';
import { User } from '../../interfaces/User';
import { VotesModel } from '../../interfaces/VotesModel';
import AuthorizedService from '../../services/AuthorizedService';
import { UserService } from '../../services/UserService';
import { setMessage, setMessageVariant } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import Loading from '../Loading';

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
interface Props {
  userId: string;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setDataAccess: Dispatch<SetStateAction<boolean>>;
}
const DataAccess = ({ userId, setUsers, setDataAccess }: Props) => {
  type SetAccessParametersData =
    | Dispatch<SetStateAction<number[]>>
    | Dispatch<SetStateAction<string[]>>;
  type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
  const dispatch = useAppDispatch();
  const formOptionsMock = [
    501021717, 501021718, 501021719, 501021720, 501021721, 501021722, 501021723,
  ];
  const [lastAccessParameter, setLastAccessParameter] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullAccess, setIsFullAccess] = useState(false);
  const [resData, setResData] = useState<any>({});
  const [lastAccessParameterIndex, setLastAccessParameterIndex] = useState<
    number | undefined
  >(undefined);
  const dataAccessFormInitial: DataAccessParamsModel = {
    district: '',
    city: '',
    tehseel: '',
    constituency: '',
    unionCouncil: '',
    constituencyName: '',
    blockCode: null,
    phase: '',
    sector: '',
    street: '',
    gender: '',
    lane: '',
    boulevardAvenue: '',
  };
  const accessParametersArr = [
    'district',
    'city',
    'tehseel',
    'constituency',
    'unionCouncil',
    'constituencyName',
    'blockCode',
    'phase',
    'sector',
    'street',
    'gender',
    'lane',
    'boulevardAvenue',
  ];
  const { onSubmit, data, setData } = useForm(
    submitDataAccessCallback,
    dataAccessFormInitial,
  );

  const getUniqueData = async (
    field: DataAccessParamsModel,
    eName?: string,
  ) => {
    if (!eName) {
      console.log(field);
      const res = await AuthorizedService.getUniqueAuthorizedDataSearch(field);
      console.log(res);
      if (res.success) {
        res.district && setResData({ district: res.district });
      }
    }
    if (eName) {
      const nextFieldNameIndex = accessParametersArr.indexOf(eName) + 1;
      const fieldName = accessParametersArr[nextFieldNameIndex];
      console.log(field);
      const res = await AuthorizedService.getUniqueAuthorizedDataSearch(field);
      console.log(res);
      if (res.success) {
        res.district && setResData({ district: res.district });
        const nextFieldDistinctData = res.data
          .map((item: any) => item[fieldName])
          .filter(
            (value: any, index: any, self: any) =>
              self.indexOf(value) === index,
          );
        console.log(fieldName, nextFieldDistinctData);

        res.data &&
          setResData({ ...resData, [fieldName]: nextFieldDistinctData });
      }
    }
  };
  const onAccessParameterChange = (event: SelectEvent) => {
    const eName = event.target.name;
    const eValue = event.target.value;
    const newData = {
      ...data,
      [eName]: eValue,
    };
    setData(newData);
    console.log(newData);
    getUniqueData(newData, eName);
  };
  async function submitDataAccessCallback() {
    setLoading(true);
    const res = await UserService.updatedUserDataAccess(
      userId,
      isFullAccess ? { fullAccess: true } : data,
    );
    if (res.success) {
      res.success && dispatch(setMessageVariant('success'));
      res.success && dispatch(setMessage(res.message));
      getUsers(setUsers);
      setDataAccess(false);
    }
    if (!res.success) {
      res.success && dispatch(setMessageVariant('danger'));
      res.success && dispatch(setMessage(res.message));
    }
    setLoading(false);
  }
  useEffect(() => {
    getUniqueData(dataAccessFormInitial);
  }, []);
  return (
    <div>
      <Form>
        <div className="row">
          <h4 className="text-center p-3">Data Access</h4>
          <div className="form-check form-switch m-2">
            <label className="form-check-label">Full Access</label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={() => {
                setIsFullAccess((prev) => !prev);
              }}
            />
          </div>
          {!isFullAccess && (
            <>
              <Form.Group id="lastAccessParameter">
                <Form.Label>Last Access Parameter</Form.Label>
                <Form.Select
                  name="district"
                  value={lastAccessParameter}
                  onChange={(e: SelectEvent) => {
                    console.log(accessParametersArr.indexOf(e.target.value));
                    setLastAccessParameter(e.target.value);
                    setLastAccessParameterIndex(
                      accessParametersArr.indexOf(e.target.value),
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
              <>
                {lastAccessParameterIndex !== undefined && (
                  <>
                    <div className="row">
                      {resData.district &&
                        resData.district[0] &&
                        lastAccessParameter && (
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
                                {resData.district.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}

                      {resData.city &&
                        resData.city[0] &&
                        lastAccessParameterIndex >= 1 && (
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
                                {resData.city.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}

                      {resData.tehseel &&
                        resData.tehseel[0] &&
                        lastAccessParameterIndex >= 2 && (
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
                                {resData.tehseel.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}

                      {resData.constituency &&
                        resData.constituency[0] &&
                        lastAccessParameterIndex >= 3 && (
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
                                {resData.constituency.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.unionCouncil &&
                        resData.unionCouncil[0] &&
                        lastAccessParameterIndex >= 4 && (
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
                                {resData.unionCouncil.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.constituencyName &&
                        resData.constituencyName[0] &&
                        lastAccessParameterIndex >= 5 && (
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
                                {resData.constituencyName.map(
                                  (option: string) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ),
                                )}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.blockCode &&
                        resData.blockCode[0] &&
                        lastAccessParameterIndex >= 6 && (
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
                                {resData.blockCode.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.phase &&
                        resData.phase[0] &&
                        lastAccessParameterIndex >= 7 && (
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
                                {resData.phase.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.sector &&
                        resData.sector[0] &&
                        lastAccessParameterIndex >= 8 && (
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
                                {resData.sector.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.street &&
                        resData.street[0] &&
                        lastAccessParameterIndex >= 9 && (
                          <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                            <Form.Group id="street">
                              <Form.Label>Street</Form.Label>
                              <Form.Select
                                name="street"
                                value={data.street}
                                onChange={(e: SelectEvent) => {
                                  onAccessParameterChange(e);
                                }}
                                required
                              >
                                <option value="" disabled selected hidden>
                                  Select Street No.
                                </option>
                                {resData.street.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.gender &&
                        resData.gender[0] &&
                        lastAccessParameterIndex >= 10 && (
                          <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                            <Form.Group id="gender">
                              <Form.Label>Gender</Form.Label>
                              <Form.Select
                                name="gender"
                                value={data.gender}
                                onChange={(e: SelectEvent) => {
                                  onAccessParameterChange(e);
                                }}
                                required
                              >
                                <option value="" disabled selected hidden>
                                  Select Gender
                                </option>
                                {resData.gender.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.lane &&
                        resData.lane[0] &&
                        lastAccessParameterIndex >= 11 && (
                          <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
                            <Form.Group id="lane">
                              <Form.Label>Lane</Form.Label>
                              <Form.Select
                                name="lane"
                                value={data.lane}
                                onChange={(e: SelectEvent) => {
                                  onAccessParameterChange(e);
                                }}
                                required
                              >
                                <option value="" disabled selected hidden>
                                  Select Lane
                                </option>
                                {resData.lane.map((option: string) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                      {resData.boulevardAvenue &&
                        resData.boulevardAvenue[0] &&
                        lastAccessParameterIndex >= 12 && (
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
                                  Select Boulevard | Avenue
                                </option>
                                {resData.boulevardAvenue.map(
                                  (option: string) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ),
                                )}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        )}
                    </div>
                  </>
                )}
              </>
            </>
          )}
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary w-50" onClick={onSubmit}>
              Submit
              {loading && <Loading variant="warning" />}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DataAccess;
