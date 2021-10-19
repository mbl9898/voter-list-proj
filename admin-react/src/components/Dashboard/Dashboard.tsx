import axios from "axios";
import { useEffect, useState } from "react";
import { getUserProgressData } from "../../helpers/dashboardHelper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import RejectedVotesModal from "./RejectedVotesModal";
import { StoreState } from "../../store/index";
import CountUp from "react-countup";

const Dashboard = () => {
  const [rejectedVoteModal, setRejectedVoteModal] = useState(false);
  const dashboardData = useAppSelector(
    (state: StoreState) => state.app.dashboardData
  );
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser
  );
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const accuracy =
    dashboardData &&
    Math.floor(
      (dashboardData.approved /
        (dashboardData.approved + dashboardData.rejected)) *
        100
    );

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      setLoading(true);
      getUserProgressData(dispatch, source);
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
          {(currentUser && currentUser.role === "dataEntry") ||
          (currentUser && currentUser.role === "admin") ? (
            <>
              <div className="d-flex justify-content-center">
                <h5 className="mt-3">
                  Accuracy Rate:{" "}
                  {accuracy ? (
                    <CountUp delay={0.5} duration={2} end={accuracy} />
                  ) : (
                    100
                  )}
                  %
                </h5>
              </div>
              <hr />
              <div className="d-flex justify-content-evenly">
                <div>
                  <button className="btn btn-primary">
                    Unapproved -{" "}
                    {dashboardData ? (
                      <CountUp
                        delay={0.5}
                        duration={2}
                        end={dashboardData.pending}
                      />
                    ) : (
                      0
                    )}
                  </button>
                </div>
                <div>
                  <button className="btn btn-primary">
                    Approved -{" "}
                    {dashboardData ? (
                      <CountUp
                        delay={0.5}
                        duration={2}
                        end={dashboardData.approved}
                      />
                    ) : (
                      0
                    )}
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-danger"
                    disabled={dashboardData?.rejected === 0}
                    onClick={() => {
                      setRejectedVoteModal(true);
                    }}
                  >
                    Rejected -{" "}
                    {dashboardData ? (
                      <CountUp
                        delay={0.5}
                        duration={2}
                        end={dashboardData.rejected}
                      />
                    ) : (
                      0
                    )}
                  </button>
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
                    Estimated Withdrawl Amount - Rs:
                    {dashboardData ? (
                      <CountUp
                        delay={0.5}
                        duration={2}
                        end={dashboardData.withdrawalAmount}
                      />
                    ) : (
                      0
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div
              className="d-flex flex-column justify-content-center"
              style={{ height: 100 + "vh" }}
            >
              <h1 className="text-center align-middle">
                Your Account Is Not Approved:
              </h1>
              <p className="text-center display-6 align-middle">
                Please Contact Admin To Approve Your Account
              </p>
              <a
                href="tel:0323-5072748"
                className="text-center display-6 align-middle"
              >
                Contact: 0323-5072748
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
