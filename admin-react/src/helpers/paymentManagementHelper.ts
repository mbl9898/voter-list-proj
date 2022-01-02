import { Payment } from '../interfaces/PaymentModel';
import { PaymentService } from '../services/PaymentService';
import { setFilteredPaymentHeadings, setPayments } from '../store';

export const paymentFormInitial: Payment = {
  email: '',
  title: '',
  amount: undefined,
  description: '',
};
export const paymentFormReset: Payment = {
  email: '',
  title: '',
  amount: 0,
  description: '',
};

export const getAllPayments = async (
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  dispatch: any,
) => {
  const res = await PaymentService.getAllPayments();
  res && !res[0] && dispatch(setPayments(res));
  if (res) {
    let resHeadings = res[0] && Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    if (resHeadings) {
      resHeadings.unshift('Sr');
      resHeadings = resHeadings.filter(
        (heading: string) =>
          heading !== 'filePath' &&
          heading !== '_id' &&
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
      dispatch(setFilteredPaymentHeadings(sentenceCaseHeadings));
      dispatch(setPayments(res));
    }
  }
};

export const getPaymentFile = async (fileName: string) => {
  const res = await PaymentService.getPaymentFile(fileName);
  window.location.assign(
    (process.env.REACT_APP_API_IS_DEV === 'true'
      ? 'http://localhost:5000/'
      : 'https://dataentry.alabrar.pk/') + res.path,
  );
};
