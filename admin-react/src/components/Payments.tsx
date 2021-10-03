import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getPaymentFile } from '../helpers/paymentManagementHelper';
import { Payment } from '../interfaces/PaymentModel';
import { PaymentService } from '../services/PaymentService';
import Loading from './Loading';

const Payments = () => {
  const [payments, setPayments] = useState<null | Payment[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getPayments = async () => {
    try {
      const res = await PaymentService.getCurrentUserPayments();
      console.log(res);
      await setPayments(res.data);
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
          <div className='cpage-content'>
            {payments?.map((payment: Payment, index: number) => {
              return (
                <Card key={index} className='d-flex justify-content-center p-4'>
                  <p>Title: {payment.title}</p>
                  <p>Description: {payment.description}</p>
                  <p>FileName: {payment.fileName}</p>
                  {payment.filePath && (
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        payment.fileName && getPaymentFile(payment.fileName);
                      }}
                    >
                      Download
                    </button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Payments;
