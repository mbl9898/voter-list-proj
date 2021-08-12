import React, { useEffect, useState } from "react";
import { getRejectedVotes } from "../helpers/dataEntryHelper";
import UnAuthorizedModel from "../services/UnAuthorizedModel";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CCard from "./CCard";
import DataEntryForm from "./DataEntryForm";

const DataEntry = () => {
  const dispatch = useAppDispatch();
  const [isVoteFormDisplay, setIsVoteFormDisplay] = useState(false);
  const rejectedVotes: UnAuthorizedModel[] | [] = useAppSelector(
    (state) => state.app.rejectedVotes
  );
  useEffect(() => {
    getRejectedVotes(dispatch);
  }, []);
  return (
    <>
      <div className="container">
        <CCard
          rejectedVotes={rejectedVotes}
          setIsVoteFormDisplay={setIsVoteFormDisplay}
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              setIsVoteFormDisplay(!isVoteFormDisplay);
            }}
          >
            Add Vote
          </button>
        </div>
        {isVoteFormDisplay && <DataEntryForm />}
      </div>
    </>
  );
};

export default DataEntry;
