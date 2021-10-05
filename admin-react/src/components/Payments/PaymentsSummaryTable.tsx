interface Props {
  totalEarnings: number | null;
  totalEarningsRecieved: number;
  totalWithdrawableAmount: number;
}
const PaymentsSummaryTable = ({
  totalEarnings,
  totalEarningsRecieved,
  totalWithdrawableAmount,
}: Props) => {
  return (
    <div className='mt-3'>
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
              <td className='text-center'>{totalWithdrawableAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsSummaryTable;
