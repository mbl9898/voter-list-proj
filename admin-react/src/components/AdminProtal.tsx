import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  approvedUser,
  changeRate,
  changeRole,
  getUsers,
  rejectUser,
} from "../helpers/adminHelper";
import { User } from "../interfaces/User";

const AdminProtal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rate, setRate] = useState(0);
  const [role, setRole] = useState<"admin" | "dataEntry" | "dataViewer">(
    "dataEntry"
  );
  const [isRoleChanging, setIsRoleChanging] = useState(false);
  const [isRateChanging, setIsRateChanging] = useState(false);

  useEffect(() => {
    try {
      getUsers(setUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div style={{ maxWidth: 1400 + "px" }} className="cpage-content">
        {users &&
          users.map((user: User, index: number) => {
            console.log(user);

            return (
              <div key={user._id}>
                {user && (
                  <div className="ccard" style={{ height: 400 + "px" }}>
                    <div className="ccontent">
                      <h2 className="ctitle">{user.username}</h2>
                      <div className="cbody">
                        <p>Email: {user.email}</p>
                        <p>
                          Approval Status:
                          {user.isApproved ? " Approved" : "Not Approved"}
                        </p>

                        <div className={isRoleChanging ? "d-flex" : ""}>
                          <p
                            onClick={() => {
                              setIsRoleChanging(!isRoleChanging);
                            }}
                          >
                            Role:
                            {!isRoleChanging && ` ${user.role}`}
                          </p>
                          {isRoleChanging && (
                            <>
                              <Form.Select
                                style={{
                                  width: 10 + "rem",
                                  margin: "0 .5rem",
                                }}
                                name="role"
                                value={role}
                                onChange={(e: any) => {
                                  setRole(e.target.value);
                                }}
                                // required
                              >
                                <option>Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="dataEntry">Data Entry</option>
                                <option value="dataViewer">Data Viewer</option>
                              </Form.Select>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  changeRole(user._id, role, setUsers);
                                  setIsRoleChanging(false);
                                }}
                              >
                                Change
                              </button>
                            </>
                          )}
                        </div>

                        {/* {user.isModified ? (
                          <Form.Control
                            className="mx-2"
                            type="number"
                            name="rate"
                            required
                            onChange={(e: any) => {
                              setRate(e.target.value);
                            }}
                          />
                        ) : (
                          <p
                            onClick={() => {
                              let newArr = [...users];
                              newArr[index] = {
                                ...user,
                                isModified: !user.isModified,
                              };
                              setUsers(newArr);
                            }}
                          >
                            {user.isModified
                              ? user.rate
                              : `Rs: ${user.rate} - Click here to change User Rate`}
                          </p>
                        )} */}
                        {!isRateChanging && (
                          <p
                            onClick={() => {
                              setIsRateChanging(!isRateChanging);
                            }}
                          >
                            {`Rs: ${user.rate} - Click here to change User Rate`}
                          </p>
                        )}
                        {isRateChanging && (
                          <div className="d-flex my-1">
                            <p
                              onClick={() => {
                                setIsRateChanging(false);
                              }}
                            >
                              Rate:
                            </p>
                            <Form.Control
                              style={{ width: 10 + "rem" }}
                              className="mx-2"
                              type="number"
                              name="rate"
                              required
                              onChange={(e: any) => {
                                setRate(e.target.value);
                              }}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                changeRate(user._id, rate, setUsers);
                                setIsRateChanging(false);
                              }}
                            >
                              Change
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d-flex">
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => approvedUser(setUsers, user._id, rate)}
                        >
                          {user.isApproved ? " Approved" : "Approve"}
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => rejectUser(setUsers, user._id, rate)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AdminProtal;
