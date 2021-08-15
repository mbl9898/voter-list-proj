import React, { useEffect, useState } from "react";
import CCard from "./CCard";
import UnAuthorizedModel from "../services/UnAuthorizedModel";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUnAuthorizedList } from "../helpers/authorizeHelper";
import VoteDisplayModal from "./VoteDisplayModal";

const Authorize = () => {
  const dispatch = useAppDispatch();
  const [unAthorizedVoteIndex, setUnathorizedVoteIndex] = useState(0);
  const [unAthorizedVote, setUnathorizedVote] =
    useState<null | UnAuthorizedModel>(null);
  // const [showModalProp, setShowModalProp] = useState<null | number>(null);
  const unauthorizedData: UnAuthorizedModel[] | [] = useAppSelector(
    (state) => state.app.unauthorizedData
  );

  useEffect(() => {
    getUnAuthorizedList(dispatch);
    setUnathorizedVote(unauthorizedData[unAthorizedVoteIndex]);
  }, [unAthorizedVoteIndex, unauthorizedData]);
  return (
    <>
      {unAthorizedVote && (
        <VoteDisplayModal
          index={unAthorizedVoteIndex}
          setIndex={setUnathorizedVoteIndex}
          showModalProp={unAthorizedVoteIndex}
          unauthorizedVote={unAthorizedVote}
          unauthorizedVotesLength={unauthorizedData.length - 1}
        />
      )}
      {/* {unauthorizedData && <CCard unauthorizedData={unauthorizedData} />} */}
    </>
  );
};

export default Authorize;
