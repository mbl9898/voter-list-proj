import { SetStateAction, useEffect, useState, Dispatch, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
  getAllPayments,
  paymentFormInitial,
  paymentFormReset,
} from "../../helpers/paymentManagementHelper";
import { useForm } from "../../helpers/useForm";
import { Payment } from "../../interfaces/PaymentModel";
import { User } from "../../interfaces/User";
import { ApiService } from "../../services/ApiServices";
import { setMessage, setMessageVariant } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import Progress from "../Progress";

interface Props {
  users: User[];
  updatePaymentData: Payment | null;
  setPaymentEntryForm: Dispatch<SetStateAction<boolean>>;
  paymentEntryForm: boolean;
}

const CreatePayment = ({
  users,
  setPaymentEntryForm,
  updatePaymentData,
  paymentEntryForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, onChange, onSubmit, setData } = useForm(
    onPaymentSubmit,
    paymentFormInitial
  );

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  async function onPaymentSubmit(e: any) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", data.email ? data.email : "");
    formData.append("title", data.title ? data.title : "");
    formData.append("amount", data.amount ? data.amount : "");
    formData.append("description", data.description ? data.description : "");

    try {
      const axios = ApiService.createAxios();
      const resCreate: any =
        !updatePaymentData &&
        (await axios.post("/payment", formData, {
          onUploadProgress: (progressEvent: any) => {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }));

      const resUpdate: any =
        updatePaymentData &&
        (await axios.put(`/payment/${data._id}`, formData, {
          onUploadProgress: (progressEvent: any) => {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }));
      console.log(resUpdate && resUpdate.data);
      console.log(resCreate && resCreate.data);
      if (resCreate && !resCreate.data.success) {
        dispatch(setMessage(null));
        resCreate && dispatch(setMessageVariant("danger"));
        resCreate && dispatch(setMessage(`Error: ${resCreate.data.message}`));
        document.getElementById("msg")?.scrollIntoView();
      }
      if (resUpdate && !resUpdate.data.success) {
        resUpdate && dispatch(setMessageVariant("danger"));
        resUpdate && dispatch(setMessage(`Error: ${resUpdate.data.message}`));
        document.getElementById("msg")?.scrollIntoView();
      }
      if (
        (resCreate && resCreate.data.success) ||
        (resUpdate && resUpdate.data.success)
      ) {
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 5000);
        dispatch(setMessageVariant("info"));
        setTimeout(() => setMessage(""), 3000);
        resCreate && dispatch(setMessage("Payment Created SuccessFully"));
        resUpdate && dispatch(setMessage("Payment Updated SuccessFully"));
        setData(paymentFormReset);
        fileInputRef.current && (fileInputRef.current.value = "");
        setFile("");
        getAllPayments(dispatch);
        document.getElementById("msg")?.scrollIntoView();
        // setPaymentEntryForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    updatePaymentData && setData(updatePaymentData);
  }, [updatePaymentData]);
  return (
    <>
      <Card className="m-4 p-4">
        <h4 className="text-center">
          {updatePaymentData ? "Update Payment" : "Create Payment"}
        </h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select User Email</Form.Label>
            <Form.Control
              list="users"
              type="email"
              placeholder="Select email of user for which you want to upload payment receipt"
              name="email"
              value={data.email}
              onChange={onChange}
              required
            />
            <datalist id="users">
              {users.map((user: User, index: number) => (
                <option key={index} value={`${user.email}`} />
              ))}
            </datalist>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="Payment Title"
              value={data.title}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              placeholder="Amount"
              value={data.amount}
              onChange={onChange}
              type="number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Description</Form.Label>
            <Form.Control
              name="description"
              value={data.description}
              onChange={onChange}
              placeholder="Payment Description"
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Choose Payment Receipt File</Form.Label>
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </Form.Group>
          <Progress percentage={uploadPercentage} />
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className="btn btn-primary btn-block w-50 mt-4"
            >
              {updatePaymentData ? "Update Payment" : "Create Payment"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default CreatePayment;
