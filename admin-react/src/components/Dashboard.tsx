import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dashboardService from "../services/dashboardService";
import { setDashboardData } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const Dashboard = () => {
  // const [userData, setUserData] = useState<any>({});
  const dashboardData = useAppSelector((state) => state.app.dashboardData);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const getUserData = async () => {
    const dataReq = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 5000,
      headers: {
        "x-api-key": "SG.cpdcjwepcjio",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // const res = await dashboardService.getUserData();
    const res = await dataReq.get("profile-settings");
    console.log(res, "dashboardService.getUserData Res");
    dispatch(setDashboardData(res && res.data && res.data.data));
  };
  useEffect(() => {
    console.log("Dashboard Component");
    try {
      setLoading(true);
      getUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
              <button className="btn btn-primary">{`Unapproved - ${dashboardData.pending}`}</button>
            </div>
            <div>
              {/* <q-btn :label="`Approved - ${userData.approved}`" color="primary" /> */}
              <button className="btn btn-primary">{`Approved - ${dashboardData.approved}`}</button>
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
                  currentUser.rate * dashboardData.approved
                    ? dashboardData.approved
                    : 0
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
