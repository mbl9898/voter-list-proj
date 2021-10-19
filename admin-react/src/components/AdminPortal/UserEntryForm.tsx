import { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { getBlockCodes } from "../../helpers/BlockCodeManagementHelper";
import { useForm } from "../../helpers/useForm";
import {
  getUsers,
  userEntryFormInitial,
} from "../../helpers/userManagementHelper";
import { User } from "../../interfaces/User";
import { UserService } from "../../services/UserService";
import { setMessage, setMessageVariant } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import Loading from "../Loading";
import TagInput from "../TagInput";

interface Props {
  updateUserData: null | User;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setUserEntryForm: Dispatch<SetStateAction<boolean>>;
}

const BlockCodeEntryForm = ({
  updateUserData,
  setUsers,
  setUserEntryForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { onChange, onSubmit, data, setData } = useForm(
    submitBlockCodeCallback,
    userEntryFormInitial
  );

  async function submitBlockCodeCallback(data: any) {
    setLoading(true);
    setError("");
    if (updateUserData) {
      const res = await UserService.updateUser(data);
      res.success && setData(userEntryFormInitial);
      getUsers(setUsers);
      res.success && dispatch(setMessageVariant("success"));
      res.success && dispatch(setMessage("User Updated Successfully"));
      setUserEntryForm(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    updateUserData && setData({ ...data, ...updateUserData });
    getBlockCodes(dispatch);
  }, [updateUserData]);
  return (
    <div>
      <div>
        <Card className="card-shadow">
          <Card.Body>
            <h4 className="text-center mb-4">
              {updateUserData && "Update User"}
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
            <Form className="pb-5">
              <div className="row">
                <div className="col col-xs-12 col-sm-4 p-2">
                  <Form.Group id="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      name="username"
                      value={data.username}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col col-xs-12 col-sm-4 p-2">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      value={data.email}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col col-xs-12 col-sm-4 p-2">
                  <Form.Group id="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={data.role}
                      onChange={onChange}
                      required
                    >
                      <option>
                        {data.role !== ""
                          ? `Current: ${data.role}`
                          : "Select Role"}
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="dataEntry">Data Entry</option>
                      <option value="dataViewer">Data Viewer</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col col-xs-12 col-sm-4 p-2">
                  <Form.Group id="rate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="number"
                      name="rate"
                      value={data.rate}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col col-xs-12 col-sm-4 p-2">
                  <Form.Group id="assignedBlockCodes">
                    <Form.Label>Assigned Block Codes</Form.Label>
                    <TagInput
                      tags={data.assignedBlockCodes}
                      data={data}
                      setData={setData}
                      placeholder="Press enter to add a Block Code"
                    />
                  </Form.Group>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-center">
                <Button
                  className="m-1 w-50 mt-4"
                  disabled={loading}
                  onClick={(e: any) => {
                    onSubmit(e);
                  }}
                >
                  Update
                  {loading && <Loading variant="warning" />}
                </Button>
                <Button
                  className="m-1 w-25 mt-4"
                  variant="danger"
                  onClick={() => {
                    setData(userEntryFormInitial);
                    setUserEntryForm(false);
                  }}
                >
                  Close
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
