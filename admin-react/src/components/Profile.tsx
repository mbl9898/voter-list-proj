import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useForm } from '../helpers/useForm';
import InputMask from 'react-input-mask';
import {
  setCurrentUser,
  setMessage,
  setMessageVariant,
  StoreState,
} from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Loading from './Loading';
import { UserService } from '../services/UserService';
import ResetPassword from './ResetPassword';

const Profile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser,
  );
  const profileUpdateFormInitial = {
    username: '',
    mobileNo: '',
  };
  const [loading, setLoading] = useState(true);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);
  const [profileUpdateForm, setProfileUpdateForm] = useState(false);
  const { onChange, onSubmit, data, setData } = useForm(
    updateProfileCallback,
    profileUpdateFormInitial,
  );

  async function updateProfileCallback(data: any) {
    const res = await UserService.updateProfile(data);
    console.log(res);
    if (!res?.success) {
      dispatch(setMessageVariant('danger'));
      dispatch(setMessage(res.error.message));
      return;
    }
    if (res?.success) {
      dispatch(setCurrentUser(res.data));
      setData(profileUpdateFormInitial);
      dispatch(setMessageVariant('info'));
      dispatch(setMessage(res.message));
      setProfileUpdateForm(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setData({
        ...data,
        username: currentUser?.username,
        mobileNo: currentUser?.mobileNo,
      });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="container">
          <h4 className="text-center my-1">Profile</h4>
          <div className="d-flex flex-row-reverse m-2">
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                setProfileUpdateForm((prevV) => !prevV);
                setData({
                  ...data,
                  username: currentUser?.username,
                  mobileNo: currentUser?.mobileNo,
                });
                setResetPasswordForm(false);
              }}
            >
              <svg height="30" width="30" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
                ></path>
              </svg>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setResetPasswordForm((prevV) => !prevV);
                setProfileUpdateForm(false);
              }}
            >
              Reset Password
            </button>
          </div>

          {!profileUpdateForm && !resetPasswordForm && (
            <Card className="d-flex justify-content-center p-4 card-shadow">
              <h4 className="text-center mb-3">Profile Data</h4>
              <h5>Email: {currentUser?.email}</h5>
              <h5>Name: {currentUser?.username}</h5>
              <h5>Mobile No: {currentUser?.mobileNo}</h5>
              <h5>Role: {currentUser?.role}</h5>
              <h5>Rate: {currentUser?.rate}</h5>
            </Card>
          )}

          {profileUpdateForm && (
            <Card className="d-flex justify-content-center p-4 card-shadow">
              <h4 className="text-center mb-3">Update Profile</h4>
              <h5>Email: {currentUser?.email}</h5>
              <Form.Group id="username">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  name="username"
                  value={data.username}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group id="mobileNo">
                <Form.Label>Mobile No:</Form.Label>
                <InputMask
                  className="form-control"
                  mask="99999-9999999"
                  placeholder="92300-1112233 Format"
                  name="mobileNo"
                  value={data.mobileNo}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <h5>Role: {currentUser?.role}</h5>
              <h5>Rate: {currentUser?.rate}</h5>
              <hr />
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-50" onClick={onSubmit}>
                  Update
                </button>
              </div>
            </Card>
          )}
          {resetPasswordForm && (
            <ResetPassword setResetPasswordForm={setResetPasswordForm} />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
