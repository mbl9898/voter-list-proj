import React, { useState } from "react";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";
import TaskManagement from "./TaskManagement";

const AdminPortal = () => {
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);
  const [taskManagement, setTaskManagement] = useState<boolean>(false);

  return (
    <>
      <div className="d-flex justify-content-center m-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setUserManagement(!userManagement);
            setBlockCodeManagement(false);
            setTaskManagement(false);
          }}
        >
          User Management
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setBlockCodeManagement(!blockCodeManagement);
            setUserManagement(false);
            setTaskManagement(false);
          }}
        >
          Block Code Management
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setTaskManagement(!taskManagement);
            setUserManagement(false);
            setBlockCodeManagement(false);
          }}
        >
          Task Management
        </button>
      </div>
      {userManagement && <UserManagement />}
      {blockCodeManagement && <BlockCodeManagement />}
      {taskManagement && <TaskManagement />}
    </>
  );
};

export default AdminPortal;
