import React, { useState } from "react";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";

const AdminPortal = () => {
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);

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
      {userManagement && <UserManagement />}
      {blockCodeManagement && <BlockCodeManagement />}
    </>
  );
};

export default AdminPortal;
