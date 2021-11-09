import { Payment } from "../interfaces/PaymentModel";
import { ApiService } from "./ApiServices";

export class PaymentService {
  static baseUrl = ["payment"];

  static async getCurrentUserPayments() {
    try {
      const res = await ApiService.get(`${PaymentService.baseUrl[0]}/current`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllPayments() {
    try {
      const res = await ApiService.get(`${PaymentService.baseUrl[0]}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePayment(paymentId: string, paymentData: Payment) {
    try {
      const res = await ApiService.put(
        `${PaymentService.baseUrl[0]}/${paymentId}`,
        paymentData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPaymentFile(fileName: string) {
    try {
      const res = await ApiService.get(
        `${PaymentService.baseUrl[0]}/${fileName}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async postPayment(paymentData: any) {
    try {
      const res = await ApiService.post(
        `${PaymentService.baseUrl[0]}`,
        paymentData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePayment(paymentId: string) {
    try {
      const res = await ApiService.delete(
        `${PaymentService.baseUrl[0]}/${paymentId}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
