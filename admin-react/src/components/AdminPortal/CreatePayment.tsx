import { SetStateAction, useEffect, useState, Dispatch, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
  getAllPayments,
  paymentFormInitial,
} from "../../helpers/paymentManagementHelper";
import { useForm } from "../../helpers/useForm";
import { Payment } from "../../interfaces/PaymentModel";
import { User } from "../../interfaces/User";
import { ApiService } from "../../services/ApiServices";
import { useAppDispatch } from "../../store/hooks";
import Message from "../Message";
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
  const [message, setMessage] = useState<null | string>(null);
  const [messageVariant, setMessageVariant] = useState<
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
  >("info");
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
      if (resCreate && !resCreate.success) {
        resCreate && setMessageVariant("danger");
        resCreate && setMessage(`Error: ${resCreate.data.message}`);
      }
      if (resUpdate && !resUpdate.success) {
        resUpdate && setMessageVariant("danger");
        resUpdate && setMessage(`Error: ${resUpdate.data.message}`);
      }
      if (
        (resCreate && resCreate.data.success) ||
        (resUpdate && resUpdate.data.success)
      ) {
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 5000);
        setMessageVariant("info");
        setTimeout(() => setMessage(null), 5000);
        resCreate && setMessage("Payment Created SuccessFully");
        resUpdate && setMessage("Payment Updated SuccessFully");
        setData(paymentFormInitial);
        fileInputRef.current && (fileInputRef.current.value = "");
        setFile("");
        getAllPayments(dispatch);
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
        <Message msg={message} variant={messageVariant} />
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
            <Form.Label>Choose Payment File</Form.Label>
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
