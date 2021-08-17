import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserProgressData } from "../helpers/dashboardHelper";
import { setDashboardData } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import RejectedVotesModal from "./RejectedVotesModal";
const Dashboard = () => {
  const [rejectedVoteModal, setRejectedVoteModal] = useState(false);
  const dashboardData = useAppSelector((state) => state.app.dashboardData);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
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
            <h5 className="mt-3">
              Accuracy Rate:{" "}
              {Math.floor(
                (dashboardData.approved /
                  (dashboardData.approved + dashboardData.rejected)) *
                  100
              )}
              %
            </h5>
          </div>
          <hr />
          <div className="d-flex justify-content-evenly">
            <div>
              <button className="btn btn-primary">{`Unapproved - ${
                dashboardData ? dashboardData.pending : "0"
              }`}</button>
            </div>
            <div>
              <button className="btn btn-primary">{`Approved - ${
                dashboardData ? dashboardData.approved : 0
              }`}</button>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setRejectedVoteModal(true);
                }}
              >{`Rejected - ${
                dashboardData ? dashboardData.rejected : 0
              }`}</button>
              <RejectedVotesModal
                rejectedVoteModal={rejectedVoteModal}
                setRejectedVoteModal={setRejectedVoteModal}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-evenly">
            <div>
              <button className="btn btn-primary">
                {`Estimated Withdrawl Amount - Rs: ${
                  (dashboardData ? dashboardData.approved : 0) *
                  currentUser.rate
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
