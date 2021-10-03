import { SetStateAction, useState } from 'react';
import { Dispatch } from 'react';
import { useEffect } from 'react';
import { getAllPayments } from '../../helpers/paymentManagementHelper';
import { Payment } from '../../interfaces/PaymentModel';
import { PaymentService } from '../../services/PaymentService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CModal from '../CModal';

interface Props {
  setUpdatePaymentData: Dispatch<SetStateAction<Payment | null>>;
  setPaymentEntryForm: Dispatch<SetStateAction<boolean>>;
  paymentEntryForm: boolean;
}

const PaymentTable = ({
  setUpdatePaymentData,
  setPaymentEntryForm,
  paymentEntryForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const [msg, setMsg] = useState('');
  const filteredPaymentHeadings = useAppSelector(
    (state) => state.app.filteredPaymentHeadings
  );
  const payments = useAppSelector((state) => state.app.payments);
  const deletePayment = async (id: string) => {
    const res = await PaymentService.deletePayment(id);
    if (res && res.success) {
      setMsg(res.data);
    }

    getAllPayments(dispatch);
  };
  const onSubmit = (payment: Payment) => {
    payment._id && deletePayment(payment._id);
  };
  useEffect(() => {
    getAllPayments(dispatch);
  }, []);
  return (
    <>
      {!payments[0] && <h5 className='text-center'>No Payment Data</h5>}
      {payments[0] && (
        <div>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  {filteredPaymentHeadings.map(
                    (heading: string, index: number) => (
                      <th className='text-center' key={index} scope='col'>
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: Payment, index: number) => {
                  return (
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td className='text-center'>{payment.email}</td>
                      <td className='text-center'>{payment.title}</td>
                      <td className='text-center'>{payment.amount}</td>
                      <td className='text-center'>{payment.description}</td>
                      <td className='text-center'>{payment.fileName}</td>
                      <td className='text-center'>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            setUpdatePaymentData(
                              !paymentEntryForm ? payment : null
                            );
                            setPaymentEntryForm(!paymentEntryForm);
                          }}
                        >
                          update
                        </button>
                      </td>
                      <td>
                        <CModal
                          heading={
                            'Are you sure you want to delete this Payment?'
                          }
                          triggerButtonContent='delete'
                          triggerButtonVarient='danger'
                          onSubmit={() => {
                            onSubmit(payment);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentTable;
