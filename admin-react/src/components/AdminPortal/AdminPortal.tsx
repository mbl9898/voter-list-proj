import { useState } from "react";
import UserManagement from "./UserManagement";
import BlockCodeManagement from "./BlockCodeManagement";
import TaskManagement from "./TaskManagement";
import PaymentManagement from "./PaymentManagement";
import AdminPortalRoutes from "./AdminPortalRoutes";

const AdminPortal = () => {
  const [userManagement, setUserManagement] = useState<boolean>(false);
  const [blockCodeManagement, setBlockCodeManagement] =
    useState<boolean>(false);
  const [taskManagement, setTaskManagement] = useState<boolean>(false);
  const [paymentManagement, setPaymentManagement] = useState<boolean>(false);

  return (
    <>
      <AdminPortalRoutes
        userManagement={userManagement}
        blockCodeManagement={blockCodeManagement}
        taskManagement={taskManagement}
        paymentManagement={paymentManagement}
        setUserManagement={setUserManagement}
        setBlockCodeManagement={setBlockCodeManagement}
        setTaskManagement={setTaskManagement}
        setPaymentManagement={setPaymentManagement}
      />
      {userManagement && <UserManagement />}
      {blockCodeManagement && <BlockCodeManagement />}
      {taskManagement && <TaskManagement />}
      {paymentManagement && <PaymentManagement />}
    </>
  );
};

export default AdminPortal;
