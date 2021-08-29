import { getAllPayments, getCurrentUserPayments } from './helpers/getPayment';
import { updatePayment } from './helpers/updatePayment';
import { createPayment } from './helpers/createPayment';
import { deleteRecord } from './helpers/deletePayment';
import { downloadPaymentReceipt } from './helpers/downloadPaymentReceipt';

export const payment = {
  createPayment,
  downloadPaymentReceipt,
  getAllPayments,
  getCurrentUserPayments,
  updatePayment,
  deleteRecord,
};
