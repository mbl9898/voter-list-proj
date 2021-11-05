import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from '../../helpers/useForm';
import MultiSelect from '../MultiSelect/MultiSelect';

const Reports = () => {
  const formOptionsMock = [
    501021717, 501021718, 501021719, 501021720, 501021721, 501021722, 501021723,
  ];
  const reportsFormInitial = {
    city: '',
  };
  const { onChange, onSubmit, data, setData } = useForm(
    submitVoteCallback,
    reportsFormInitial,
  );

  const [abc, setAbc] = useState([]);

  const fields = [
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqr',
    'stu',
    'vwx',
    'yzA',
  ];

  async function submitVoteCallback(data: any) {}
  return (
    <>
      <div className="container">
        <Form>
          <div className="row">
            <h3 className="text-center p-5 fw-bold">Reports</h3>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="blockCode">
                <Form.Label>Block Code</Form.Label>
                <Form.Select
                  name="blockCode"
                  value={data.blockCode}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="constituencyName">
                <Form.Label>Constituency Name</Form.Label>
                <Form.Select
                  name="constituencyName"
                  value={data.constituencyName}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="moza">
                <Form.Label>Moza</Form.Label>
                <Form.Select
                  name="moza"
                  value={data.moza}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="dehya">
                <Form.Label>Dehya</Form.Label>
                <Form.Select
                  name="dehya"
                  value={data.dehya}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Select
                  name="city"
                  value={data.city}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="patwarHalka">
                <Form.Label>Patwar Halka</Form.Label>
                <Form.Select
                  name="patwarHalka"
                  value={data.patwarHalka}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="tapaydar">
                <Form.Label>Tapaydar</Form.Label>
                <Form.Select
                  name="tapaydar"
                  value={data.tapaydar}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="tehseel">
                <Form.Label>Tehseel</Form.Label>
                <Form.Select
                  name="tehseel"
                  value={data.tehseel}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="talka">
                <Form.Label>Talka</Form.Label>
                <Form.Select
                  name="talka"
                  value={data.talka}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="district">
                <Form.Label>District</Form.Label>
                <Form.Select
                  name="district"
                  value={data.district}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="unionCouncil">
                <Form.Label>Union Council</Form.Label>
                <Form.Select
                  name="unionCouncil"
                  value={data.unionCouncil}
                  onChange={onChange}
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="bookNo">
                <Form.Label>Book No</Form.Label>
                <Form.Select
                  name="bookNo"
                  value={data.bookNo}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={`col col-xs-12 col-sm-4 p-1 br-5`}>
              <Form.Group id="constituency">
                <Form.Label>Constituency</Form.Label>
                <Form.Select
                  name="constituency"
                  value={data.constituency}
                  onChange={onChange}
                  required
                >
                  {formOptionsMock.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <button className="btn btn-primary">Generate Report</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Reports;
