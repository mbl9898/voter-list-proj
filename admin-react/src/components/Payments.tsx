import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getPaymentFile } from '../helpers/paymentManagementHelper';
import { Payment } from '../interfaces/PaymentModel';
import { PaymentService } from '../services/PaymentService';
import { useAppSelector } from '../store/hooks';
import PaymentTable from './AdminPortal/PaymentTable';
import Loading from './Loading';
import { StoreState } from './../store/index';

const Payments = () => {
  const [payments, setPayments] = useState<null | Payment[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGridView, setIsGridView] = useState(true);
  const dashboardData = useAppSelector(
    (state: StoreState) => state.app.dashboardData
  );
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser
  );
  const [totalEarningsRecieved, setTotalEarningsRecieved] = useState(0);
  const totalEarnings =
    currentUser && dashboardData.approved * currentUser.rate;

  const calcTotalEarningsRecieved = (paymentsRecieved: Payment[]) => {
    let amountsRecieved: any = [];

    paymentsRecieved.forEach((payment: Payment) => {
      amountsRecieved.push(payment.amount);
    });
    amountsRecieved = amountsRecieved.reduce(
      (accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      },
      0
    );
    setTotalEarningsRecieved(amountsRecieved);
  };
  const getPayments = async () => {
    try {
      const res = await PaymentService.getCurrentUserPayments();
      console.log(res);
      res.success && setPayments(res.data);
      res.success && calcTotalEarningsRecieved(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className='container'>
          {payments && !payments[0] && (
            <h4 className='my-4 text-center'>No Payments Available</h4>
          )}
          {payments && payments[0] && (
            <div className='mt-5'>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='table-light'>
                    <tr>
                      <td className='text-center'>Total Earnings</td>
                      <td className='text-center'>Earnings Recieved</td>
                      <td className='text-center'>Withdrawable Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-center'>{totalEarnings}</td>
                      <td className='text-center'>{totalEarningsRecieved}</td>
                      <td className='text-center'>
                        {totalEarnings && totalEarnings - totalEarningsRecieved}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className='text-center mb-5'>Payments Data</h3>
              <div className='d-flex flex-row-reverse m-2'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setIsGridView((prevValue) => !prevValue);
                  }}
                >
                  {isGridView ? 'Table View' : 'Grid View'}
                </button>
              </div>
              <>
                {!isGridView && (
                  <div className='d-flex justify-content-center'>
                    {payments && payments[0] && (
                      <PaymentTable currentUserPayments={payments} />
                    )}
                  </div>
                )}
              </>
              {isGridView && (
                <div className='cpage-content'>
                  {payments?.map((payment: Payment, index: number) => {
                    return (
                      <Card
                        key={index}
                        className='d-flex justify-content-center p-4'
                      >
                        <p>Title: {payment.title}</p>
                        <p>Amount: {payment.amount}</p>
                        <p>Description: {payment.description}</p>
                        {/* <p>FileName: {payment.fileName}</p> */}
                        {payment.filePath && (
                          <button
                            className='btn btn-primary'
                            onClick={() => {
                              payment.fileName &&
                                getPaymentFile(payment.fileName);
                            }}
                          >
                            View Reciept
                          </button>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Payments;
