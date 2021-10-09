import React, { Dispatch, SetStateAction } from "react";

interface Props {
  userManagement: boolean;
  blockCodeManagement: boolean;
  taskManagement: boolean;
  paymentManagement: boolean;
  setUserManagement: Dispatch<SetStateAction<boolean>>;
  setBlockCodeManagement: Dispatch<SetStateAction<boolean>>;
  setTaskManagement: Dispatch<SetStateAction<boolean>>;
  setPaymentManagement: Dispatch<SetStateAction<boolean>>;
}

const AdminPortalRoutes = ({
  userManagement,
  blockCodeManagement,
  taskManagement,
  paymentManagement,
  setUserManagement,
  setBlockCodeManagement,
  setTaskManagement,
  setPaymentManagement,
}: Props) => {
  return (
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
  );
};

export default AdminPortalRoutes;
