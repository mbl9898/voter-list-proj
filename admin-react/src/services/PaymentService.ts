import { Payment } from '../interfaces/PaymentModel';
import { ApiService } from './ApiServices';

export class PaymentService {
  static baseUrl = ['payment'];

  static async getCurrentUserPayments() {
    const res = await ApiService.get(`${PaymentService.baseUrl[0]}/current`);
    return res;
  }
  static async getAllPayments() {
    const res = await ApiService.get(`${PaymentService.baseUrl[0]}`);
    return res.data;
  }
  static async updatePayment(paymentId: string, paymentData: Payment) {
    const res = await ApiService.put(
      `${PaymentService.baseUrl[0]}/${paymentId}`,
      paymentData,
    );
    return res;
  }
  static async getPaymentFile(fileName: string) {
    const res = await ApiService.get(
      `${PaymentService.baseUrl[0]}/${fileName}`,
    );
    return res;
  }
  static async postPayment(paymentData: any) {
    const res = await ApiService.post(
      `${PaymentService.baseUrl[0]}`,
      paymentData,
    );
    return res;
  }
  static async deletePayment(paymentId: string) {
    const res = await ApiService.delete(
      `${PaymentService.baseUrl[0]}/${paymentId}`,
    );
    return res;
  }
}
