import React from "react";
import { useDispatch } from "react-redux";
import { setIsLogInFormDisplay, setIsSignUpFormDisplay } from "../store";
import { useAppSelector } from "../store/hooks";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const isLogInFormDisplay = useAppSelector(
    (state) => state.app.isLogInFormDisplay
  );

  const openSignUpForm = () => {
    dispatch(setIsLogInFormDisplay(false));
    dispatch(setIsSignUpFormDisplay(true));
  };
  const openLogInForm = () => {
    dispatch(setIsSignUpFormDisplay(false));
    dispatch(setIsLogInFormDisplay(true));
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            src="/logo192.jpeg"
            alt="Bait Ul Ilm Logo"
            width="80"
            height="80"
            style={{ borderRadius: "3px" }}
          />
          <a className="navbar-brand fs-2 fw-bold" href="/">
            Voter List App
          </a>
          <ProfileDropDown />

          {currentUser === null && (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                isLogInFormDisplay ? openSignUpForm() : openLogInForm();
              }}
            >
              {isLogInFormDisplay ? "Sign Up" : "Login"}
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
