import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getPaymentFile } from '../../helpers/paymentManagementHelper';
import { Payment } from '../../interfaces/PaymentModel';
import { PaymentService } from '../../services/PaymentService';
import { useAppSelector } from '../../store/hooks';
import PaymentTable from '../AdminPortal/PaymentTable';
import Loading from '../Loading';
import { StoreState } from '../../store/index';
import PaymentsSummaryTable from './PaymentsSummaryTable';
import PaymentSwitches from './PaymentSwitches';

const Payments = () => {
  const [payments, setPayments] = useState<null | Payment[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGridView, setIsGridView] = useState(true);
  const [arePaymentsHidden, setArePaymentsHidden] = useState(true);
  const dashboardData = useAppSelector(
    (state: StoreState) => state.app.dashboardData,
  );
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser,
  );
  const [totalEarningsRecieved, setTotalEarningsRecieved] = useState(0);
  const [totalWithdrawableAmount, setTotalWithdrawableAmount] = useState(0);
  const totalEarnings =
    currentUser && dashboardData.approved * currentUser.rate;

  const calcEarnings = (paymentsRecieved: Payment[]) => {
    let amountsRecieved: any = [];

    paymentsRecieved.forEach((payment: Payment) => {
      amountsRecieved.push(payment.amount);
    });
    amountsRecieved = amountsRecieved.reduce(
      (accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      },
      0,
    );
    setTotalEarningsRecieved(amountsRecieved);
    totalEarnings &&
      setTotalWithdrawableAmount(totalEarnings - amountsRecieved);
  };
  const getPayments = async () => {
    const res = await PaymentService.getCurrentUserPayments();
    res.success && setPayments(res.data);
    res.success && calcEarnings(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="container">
          {payments && !payments[0] && (
            <h4 className="my-4 text-center">No Payments Available</h4>
          )}
          {payments && payments[0] && (
            <div className="mt-5">
              <h3 className="text-center">Payments Data</h3>
              <PaymentSwitches
                arePaymentsHidden={arePaymentsHidden}
                setArePaymentsHidden={setArePaymentsHidden}
                isGridView={isGridView}
                setIsGridView={setIsGridView}
              />

              <PaymentsSummaryTable
                totalEarnings={totalEarnings}
                totalEarningsRecieved={totalEarningsRecieved}
                totalWithdrawableAmount={totalWithdrawableAmount}
              />

              {!arePaymentsHidden && (
                <div>
                  <>
                    {!isGridView && (
                      <div>
                        {payments && payments[0] && (
                          <PaymentTable currentUserPayments={payments} />
                        )}
                      </div>
                    )}
                  </>
                  <>
                    {isGridView && (
                      <div className="cpage-content">
                        {payments?.map((payment: Payment, index: number) => {
                          return (
                            <Card
                              key={index}
                              className="d-flex justify-content-center p-4"
                            >
                              <p>Title: {payment.title}</p>
                              <p>Amount: {payment.amount}</p>
                              <p>Description: {payment.description}</p>
                              {/* <p>FileName: {payment.fileName}</p> */}
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
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </>
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
