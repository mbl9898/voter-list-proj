import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserProgressData } from "../helpers/dashboardHelper";
import { setDashboardData } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const Dashboard = () => {
  const dashboardData = useAppSelector((state) => state.app.dashboardData);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    console.log("Dashboard Component");
    try {
      setLoading(true);
      getUserProgressData(dispatch, setDashboardData, source.token);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    return () => {
      source.cancel("axios request cancelled");
    };
  }, []);
  return (
    <>
      {loading && (
        <div>
          <p>Dashboard</p>
          <h1>Loading...</h1>
        </div>
      )}

      {!loading && (
        <div className="container">
          <div className="d-flex justify-content-center">
            <h5>Accuracy Rate: 100%</h5>
          </div>
          <hr />
          <div className="d-flex justify-content-evenly">
            <div>
              {/* <q-btn
          :label="`Pending For Approval - ${userData.pending}`"
          color="primary"
        /> */}
              <button className="btn btn-primary">{`Unapproved - ${
                dashboardData ? dashboardData.pending : "0"
              }`}</button>
            </div>
            <div>
              {/* <q-btn :label="`Approved - ${userData.approved}`" color="primary" /> */}
              <button className="btn btn-primary">{`Approved - ${
                dashboardData ? dashboardData.approved : 0
              }`}</button>
            </div>
            <div>
              {/* <q-btn color="red" label="Rejected" /> */}
              <button className="btn btn-danger">Rejected</button>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-evenly">
            <div>
              {/* <q-btn
          :label="
            `Estimated Withdrawl Amount - Rs: ${userData.rate * userData.approved ? userData.approved : 0 }`
          "
          color="primary"
        /> */}
              <button className="btn btn-primary">
                {`Estimated Withdrawl Amount - Rs: ${
                  currentUser.rate * dashboardData ? dashboardData.approved : 0
                }`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
