import React, { useState } from "react";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";
import TaskManagement from "./TaskManagement";
import PaymentManagement from "./PaymentManagement";

const AdminPortal = () => {
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);
  const [taskManagement, setTaskManagement] = useState<boolean>(false);
  const [paymentManagement, setPaymentManagement] = useState<boolean>(false);

  return (
    <>
      <div className="d-flex justify-content-center m-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setUserManagement(!userManagement);
            setBlockCodeManagement(false);
            setTaskManagement(false);
            setPaymentManagement(false);
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
            setPaymentManagement(false);
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
            setPaymentManagement(false);
          }}
        >
          Task Management
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setPaymentManagement(!paymentManagement);
            setTaskManagement(false);
            setUserManagement(false);
            setBlockCodeManagement(false);
          }}
        >
          Payment Management
        </button>
      </div>
      {userManagement && <UserManagement />}
      {blockCodeManagement && <BlockCodeManagement />}
      {taskManagement && <TaskManagement />}
      {paymentManagement && <PaymentManagement />}
    </>
  );
};

export default AdminPortal;
