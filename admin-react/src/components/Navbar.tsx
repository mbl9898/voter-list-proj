import React from "react";
import { useHistory } from "react-router-dom";
import {
  setCurrentUser,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
} from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const dashboardData = useAppSelector((state) => state.app.dashboardData);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const isLogInFormDisplay = useAppSelector(
    (state) => state.app.isLogInFormDisplay
  );

  const openSignUpForm = () => {
    dispatch(setIsLogInFormDisplay(false));
    history.push("/signup");
    document.title = "SignUp - Voter List App";
    dispatch(setIsSignUpFormDisplay(true));
  };
  const openLogInForm = () => {
    dispatch(setIsSignUpFormDisplay(false));
    history.push("/login");
    document.title = "Login - Voter List App";
    dispatch(setIsLogInFormDisplay(true));
  };
  const handleLogoutOpenLogInForm = async () => {
    dispatch(setCurrentUser(null));
    // history.push("/login")
    // await logout(currentUser.uid, dispatch);
    await dispatch(setIsLogInFormDisplay(true));
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fs-2 fw-bold" href="/">
            Voter List App
          </a>
          <div className="d-flex">
            {currentUser !== null && (
              <>
                {(currentUser.role === "admin" ||
                  currentUser.role === "dataEntry") && (
                  <>
                    <button className="mx-1 btn btn-primary position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-clock-history me-1 mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                      Unapproved
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {dashboardData ? dashboardData.pending : "0"}
                        <span className="visually-hidden">
                          Unapproved Votes
                        </span>
                      </span>
                    </button>
                    <button className="mx-3 btn btn-primary position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-circle-fill me-1 mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      Approved
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {dashboardData ? dashboardData.approved : "0"}
                        <span className="visually-hidden">Approved Votes</span>
                      </span>
                    </button>
                  </>
                )}
              </>
            )}
            <ProfileDropDown />
            {currentUser === null && (
              <button
                className=" mx-2 btn btn-outline-primary"
                onClick={() => {
                  isLogInFormDisplay ? openSignUpForm() : openLogInForm();
                }}
              >
                {isLogInFormDisplay ? "Sign Up" : "Login"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
