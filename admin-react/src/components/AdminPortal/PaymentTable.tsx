import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { useEffect } from 'react';
import {
  getAllPayments,
  getPaymentFile,
} from '../../helpers/paymentManagementHelper';
import { Payment } from '../../interfaces/PaymentModel';
import { PaymentService } from '../../services/PaymentService';
import {
  setFilteredPaymentHeadings,
  setMessage,
  setMessageVariant,
  setPayments,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CModal from '../CModal';
import { StoreState } from './../../store/index';

interface Props {
  currentUserPayments?: Payment[];
  setUpdatePaymentData?: Dispatch<SetStateAction<Payment | null>>;
  setPaymentEntryForm?: Dispatch<SetStateAction<boolean>>;
  paymentEntryForm?: boolean;
}

const PaymentTable = ({
  currentUserPayments,
  setUpdatePaymentData,
  setPaymentEntryForm,
  paymentEntryForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const filteredPaymentHeadings = useAppSelector(
    (state: StoreState) => state.app.filteredPaymentHeadings,
  );
  const payments = useAppSelector((state: StoreState) => state.app.payments);
  const getCurrentUserPaymentHeadings = (currentUserPayments: Payment[]) => {
    if (currentUserPayments) {
      let resHeadings =
        currentUserPayments[0] && Object.keys(currentUserPayments[0]);
      let sentenceCaseHeadings: string[] = [];
      if (resHeadings) {
        resHeadings.unshift('Sr');
        resHeadings = resHeadings.filter(
          (heading: string) =>
            heading !== 'filePath' &&
            heading !== '_id' &&
            heading !== 'email' &&
            heading !== 'fileName' &&
            heading !== 'enteredBy' &&
            heading !== 'createdAt' &&
            heading !== '__v',
        );
        resHeadings.forEach((heading: string) => {
          const result = heading.replace(/([A-Z])/g, ' $1');
          sentenceCaseHeadings.push(
            result.charAt(0).toUpperCase() + result.slice(1),
          );
        });
        return sentenceCaseHeadings;
      }
    }
  };

  const paymentsHeadings = currentUserPayments
    ? getCurrentUserPaymentHeadings(currentUserPayments)
    : filteredPaymentHeadings;
  const paymentsData: Payment[] = currentUserPayments
    ? currentUserPayments
    : payments;
  const deletePayment = async (id: string) => {
    const res = await PaymentService.deletePayment(id);

    if (res && !res.success) {
      dispatch(setMessageVariant('danger'));
      dispatch(setMessage(res.message));
      return;
    }

    dispatch(setMessageVariant('success'));
    dispatch(setMessage(res.message));
    getAllPayments(dispatch);
  };
  const onSubmit = (payment: Payment) => {
    payment._id && deletePayment(payment._id);
  };
  useEffect(() => {
    if (currentUserPayments) {
      dispatch(setFilteredPaymentHeadings([]));
      dispatch(setPayments([]));
    }
    !currentUserPayments && getAllPayments(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!currentUserPayments && !payments[0] ? (
        <h5 className="text-center">No Payment Data</h5>
      ) : (
        !payments[0] &&
        !currentUserPayments && <h5 className="text-center">No Payment Data</h5>
      )}
      {(payments[0] || currentUserPayments) && (
        <div>
          <div className="table-responsive">
            {currentUserPayments && (
              <div className="d-flex bg-dark text-light justify-content-center">
                <h5 className="py-1">Payments</h5>
              </div>
            )}
            <table className="table">
              <thead>
                <tr style={{ borderBottom: '1px solid' }}>
                  {paymentsHeadings &&
                    paymentsHeadings.map((heading: string, index: number) => (
                      <th className="text-center" key={index} scope="col">
                        {heading}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {paymentsData.map((payment: Payment, index: number) => {
                  return (
                    <tr className="text-center" key={index}>
                      <th scope="row">{index + 1}</th>
                      {!currentUserPayments && <td>{payment.email}</td>}
                      <td>{payment.title}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.description}</td>
                      {!currentUserPayments && <td>{payment.fileName}</td>}
                      <td>
                        {setUpdatePaymentData && (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setUpdatePaymentData
                                ? setUpdatePaymentData(
                                    !paymentEntryForm ? payment : null,
                                  )
                                : console.log(
                                    new Error('setUpdatePaymentData issue'),
                                  );

                              setPaymentEntryForm
                                ? setPaymentEntryForm((prevV) => !prevV)
                                : console.log(
                                    new Error('setPaymentEntryForm issue'),
                                  );
                            }}
                          >
                            update
                          </button>
                        )}
                      </td>
                      <td>
                        {payment.filePath && (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              payment.fileName &&
                                getPaymentFile(payment.fileName);
                            }}
                          >
                            View Reciept
                          </button>
                        )}
                      </td>
                      {!currentUserPayments && (
                        <td>
                          <CModal
                            heading={
                              'Are you sure you want to delete this Payment?'
                            }
                            triggerButtonContent="delete"
                            triggerButtonVariant="danger"
                            onSubmit={() => {
                              onSubmit(payment);
                            }}
                          />
                        </td>
                      )}
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
