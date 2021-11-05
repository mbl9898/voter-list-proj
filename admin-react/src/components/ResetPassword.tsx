import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "../helpers/useForm";
import { UserService } from "../services/UserService";
import { setMessage, setMessageVariant } from "../store";
import { useAppDispatch } from "../store/hooks";

export interface ResetPasswordModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface Props {
  setResetPasswordForm: Dispatch<SetStateAction<boolean>>;
}

const ResetPassword = ({ setResetPasswordForm }: Props) => {
  const dispatch = useAppDispatch();
  const resetPasswordFormInitial = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, data, setData } = useForm(
    resetPasswordCallback,
    resetPasswordFormInitial
  );
  async function resetPasswordCallback(data: ResetPasswordModel) {
    const res = await UserService.resetPassword(data);
    console.log(res);
    if (!res?.success) {
      dispatch(setMessageVariant("danger"));
      dispatch(setMessage(res.message));
      return;
    }
    if (res?.success) {
      dispatch(setMessageVariant("info"));
      dispatch(setMessage(res.message));
      setData({ ...resetPasswordFormInitial });
      setResetPasswordForm(false);
    }
  }
  useEffect(() => {
    setData({ ...resetPasswordFormInitial });
  }, []);
  return (
    <>
      <Card className="d-flex justify-content-center p-4 card-shadow">
        <h4 className="text-center mb-3">Reset Password</h4>
        <Form.Group id="oldPassword">
          <Form.Label>Old Password: </Form.Label>
          <Form.Control
            name="oldPassword"
            value={data.oldPassword}
            type="password"
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group id="newPassword">
          <Form.Label>New Password: </Form.Label>
          <Form.Control
            name="newPassword"
            value={data.newPassword}
            type="password"
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group id="confirmPassword">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            name="confirmPassword"
            value={data.confirmPassword}
            type="password"
            onChange={onChange}
            required
          />
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary w-50" onClick={onSubmit}>
            Reset Password
          </button>
        </div>
      </Card>
    </>
  );
};

export default ResetPassword;
