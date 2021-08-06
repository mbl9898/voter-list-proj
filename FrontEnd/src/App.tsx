import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
// import SignUp from "./components/SignUp";
import SignUp2 from "./components/SignUp2";
import Login2 from "./components/Login2";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DataGrid from "./components/DataGrid";
import { getSortedFilteredVotes } from "./services";
import {
  setError,
  setIsDataLoading,
  setIsListDisplay,
  setIsLogInFormDisplay,
} from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import AppLoading from "./components/AppLoading";
import { Alert } from "react-bootstrap";

let dataArr: any[] = [];
let errorSetter: any;
const App = () => {
  const [loading, setLoading] = useState(true);
  const data = useAppSelector((state) => state.app.data);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const isListDisplay = useAppSelector((state) => state.app.isListDisplay);
  const alert = useAppSelector((state) => state.app.alert);
  const isSignUpFormDisplay = useAppSelector(
    (state) => state.app.isSignUpFormDisplay
  );
  const isLogInFormDisplay = useAppSelector(
    (state) => state.app.isLogInFormDisplay
  );
  const isAccessDeniedDisplay = useAppSelector(
    (state) => state.app.isAccessDeniedDisplay
  );

  const dispatch = useAppDispatch();

  dataArr = data;
  errorSetter = setError;

  useEffect(() => {
    console.log(currentUser, "currentUser");
    if (currentUser !== null) {
      dispatch(setIsListDisplay(true));
      dispatch(setIsDataLoading(true));
      getSortedFilteredVotes(dispatch, currentUser);
      dispatch(setIsLogInFormDisplay(false));
    }
    setLoading(false);
  }, [dispatch, currentUser]);
  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      {loading && <AppLoading />}
      {!loading && (
        <>
          <Navbar />
          <div style={{ minHeight: "72vh" }}>
            {isSignUpFormDisplay && <SignUp2 />}
            {isLogInFormDisplay && <Login2 />}
            {currentUser &&
              (isAccessDeniedDisplay ? (
                <h2
                  className="d-flex justify-content-center align-item-center"
                  style={{
                    display: "flex",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  You Are Not Allowed To Access Data
                </h2>
              ) : (
                <>
                  {isListDisplay && (
                    <>
                      <DataGrid />
                    </>
                  )}
                </>
              ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default App;
export { dataArr, errorSetter };
