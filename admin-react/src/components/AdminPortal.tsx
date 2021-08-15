import React, { useState } from "react";
import { useEffect } from "react";
import { User } from "../interfaces/User";
import { getUsers } from "../helpers/adminHelper";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";

const AdminPortal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);

  useEffect(() => {
    try {
      getUsers(setUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center m-3">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setUserManagement(!userManagement);
            setBlockCodeManagement(false);
          }}
        >
          User Management
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setBlockCodeManagement(!blockCodeManagement);
            setUserManagement(false);
          }}
        >
          Block Code Management
        </button>
      </div>
      {userManagement && <UserManagement users={users} setUsers={setUsers} />}
      {blockCodeManagement && <BlockCodeManagement />}
    </>
  );
};

export default AdminPortal;
