import { useState } from "react";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";
import TaskManagement from "./TaskManagement";
import PaymentManagement from "./PaymentManagement";
import AdminPortalRoutes from "./AdminPortalRoutes";
import Reports from "./Reports";

const AdminPortal = () => {
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);
  const [taskManagement, setTaskManagement] = useState<boolean>(false);
  const [paymentManagement, setPaymentManagement] = useState<boolean>(false);
  const [reports, setReports] = useState<boolean>(false);

  return (
    <>
      <AdminPortalRoutes
        setUserManagement={setUserManagement}
        setBlockCodeManagement={setBlockCodeManagement}
        setTaskManagement={setTaskManagement}
        setPaymentManagement={setPaymentManagement}
        setReports={setReports}
      />
      {userManagement && <UserManagement />}
      {blockCodeManagement && <BlockCodeManagement />}
      {taskManagement && <TaskManagement />}
      {paymentManagement && <PaymentManagement />}
      {reports && <Reports />}
    </>
  );
};

export default AdminPortal;
