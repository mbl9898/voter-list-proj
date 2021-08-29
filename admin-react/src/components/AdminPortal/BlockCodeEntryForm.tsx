import { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import {
  blockCodeFormInitial,
  getBlockCodes,
} from "../../helpers/BlockCodeManagementHelper";
import { useForm } from "../../helpers/useForm";
import { BlockCode } from "../../interfaces/BlockCode";
import { BlockCodeService } from "../../services/BlockCodeService";
import { useAppDispatch } from "../../store/hooks";
import Loading from "../Loading";

interface Props {
  updateBlockCodeData: null | BlockCode;
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>;
  setBlockCodeEntryForm: Dispatch<SetStateAction<boolean>>;
}

const BlockCodeEntryForm = ({
  updateBlockCodeData,
  // setFilteredBlockCodeHeadings,
  setBlockCodeEntryForm,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const { onChange, onSubmit, data, setData } = useForm(
    submitBlockCodeCallback,
    blockCodeFormInitial
  );

  async function submitBlockCodeCallback(data: any) {
    setLoading(true);
    setError("");
    if (!updateBlockCodeData) {
      const res = await BlockCodeService.postBlockCode(data);
      res.error &&
        setError(`${res.error.message}
    `);
      res.success && setData(blockCodeFormInitial);
    }
    if (updateBlockCodeData) {
      const res = await BlockCodeService.updateBlockCode(data);
      res.success && setData(blockCodeFormInitial);
      getBlockCodes(dispatch);
      setBlockCodeEntryForm(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    updateBlockCodeData && setData(updateBlockCodeData);
  }, []);
  return (
    <div>
      <div>
        <Card>
          <Card.Body>
            <h4 className="text-center mb-4">
              {updateBlockCodeData ? "Update Block Code" : "Create Block Code"}
            </h4>
            {error && (
              <div className="d-flex justify-content-center">
                <Alert
                  style={{ width: 300 + "px" }}
                  className="text-center"
                  variant="danger"
                >
                  {error}
                </Alert>
              </div>
            )}
            <Form onSubmit={onSubmit}>
              <div className="row">
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
              </div>
              <hr />
              <div className="d-flex justify-content-center">
                <Button
                  className="my-3 w-50"
                  disabled={loading}
                  // onClick={onSubmit}
                  type="submit"
                >
                  Submit
                  {loading && <Loading variant="warning" />}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BlockCodeEntryForm;
