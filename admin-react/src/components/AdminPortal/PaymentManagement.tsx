import { useState } from 'react';
import { useEffect } from 'react';
import { Payment } from '../../interfaces/PaymentModel';
import { UserService } from '../../services/UserService';
import CreatePayment from './CreatePayment';
import PaymentTable from './PaymentTable';

const TaskManagement = () => {
  const [users, setUsers] = useState([]);
  const [paymentEntryForm, setPaymentEntryForm] = useState(false);
  const [updatePaymentData, setUpdatePaymentData] = useState<null | Payment>(
    null,
  );

  const getAllUsers = async () => {
    const res = await UserService.allUsers();
    if (res) {
      setUsers(res);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="container">
      <h4 className="text-center my-1 fw-bold">Payment Management</h4>
      <div className="d-flex flex-row-reverse m-2">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setPaymentEntryForm(!paymentEntryForm);
            setUpdatePaymentData(null);
          }}
        >
          Create Payment
        </button>
      </div>
      {!paymentEntryForm && (
        <PaymentTable
          paymentEntryForm={paymentEntryForm}
          setPaymentEntryForm={setPaymentEntryForm}
          setUpdatePaymentData={setUpdatePaymentData}
        />
      )}

      {paymentEntryForm && (
        <CreatePayment
          updatePaymentData={updatePaymentData}
          paymentEntryForm={paymentEntryForm}
          setPaymentEntryForm={setPaymentEntryForm}
          users={users}
        />
      )}
    </div>
  );
};

export default TaskManagement;
