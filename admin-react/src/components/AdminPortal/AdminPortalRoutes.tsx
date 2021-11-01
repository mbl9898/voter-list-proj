import React, { Dispatch, memo, SetStateAction } from "react";

interface Props {
  setUserManagement: Dispatch<SetStateAction<boolean>>;
  setBlockCodeManagement: Dispatch<SetStateAction<boolean>>;
  setTaskManagement: Dispatch<SetStateAction<boolean>>;
  setPaymentManagement: Dispatch<SetStateAction<boolean>>;
  setReports: Dispatch<SetStateAction<boolean>>;
}

const AdminPortalRoutes = ({
  setUserManagement,
  setBlockCodeManagement,
  setTaskManagement,
  setPaymentManagement,
  setReports,
}: Props) => {
  console.log("Component Rendered");
  return (
    <div className="d-flex justify-content-center m-4">
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setUserManagement((prevV) => !prevV);
          setBlockCodeManagement(false);
          setTaskManagement(false);
          setPaymentManagement(false);
          setReports(false);
        }}
      >
        User Management
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setBlockCodeManagement((prevV) => !prevV);
          setUserManagement(false);
          setTaskManagement(false);
          setPaymentManagement(false);
          setReports(false);
        }}
      >
        Block Code Management
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setTaskManagement((prevV) => !prevV);
          setUserManagement(false);
          setBlockCodeManagement(false);
          setPaymentManagement(false);
          setReports(false);
        }}
      >
        Task Management
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setPaymentManagement((prevV) => !prevV);
          setTaskManagement(false);
          setUserManagement(false);
          setBlockCodeManagement(false);
          setReports(false);
        }}
      >
        Payment Management
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          setReports((prevV) => !prevV);
          setPaymentManagement(false);
          setTaskManagement(false);
          setUserManagement(false);
          setBlockCodeManagement(false);
        }}
      >
        Reports
      </button>
    </div>
  );
};

export default AdminPortalRoutes;
