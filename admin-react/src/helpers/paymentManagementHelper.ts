import { Payment } from "../interfaces/PaymentModel";
import { PaymentService } from "../services/PaymentService";
import { setFilteredPaymentHeadings, setPayments } from "../store";

export const paymentFormInitial: Payment = {
  email: "",
  title: "",
  description: "",
};

export const getAllPayments = async (
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  dispatch: any
) => {
  const res = await PaymentService.getAllPayments();
  console.log(res);

  !res[0] && dispatch(setPayments(res));
  if (res) {
    let resHeadings = res[0] && Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    if (resHeadings) {
      resHeadings.unshift("Sr");
      resHeadings = resHeadings.filter(
        (heading: string) =>
          heading !== "filePath" &&
          heading !== "_id" &&
          heading !== "enteredBy" &&
          heading !== "createdAt" &&
          heading !== "__v"
      );
      // resHeadings.push("Update");
      // resHeadings.push("Delete");
      resHeadings.forEach((heading: string) => {
        const result = heading.replace(/([A-Z])/g, " $1");
        sentenceCaseHeadings.push(
          result.charAt(0).toUpperCase() + result.slice(1)
        );
      });
      console.log(res, "payments");

      dispatch(setFilteredPaymentHeadings(sentenceCaseHeadings));
      dispatch(setPayments(res));
    }
  }
};
