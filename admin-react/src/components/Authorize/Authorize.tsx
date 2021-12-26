import { useEffect, useState } from 'react';
import UnAuthorizedModel from '../../services/UnAuthorizedModel';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import VoteDisplayModal from './VoteDisplayModal';
import { setDataVoteRejectToUnauthorizedDataIndex } from '../../store';
import { StoreState } from '../../store/index';
import { getUnAuthorizedList } from '../../helpers/authorizeHelper';

const Authorize = () => {
  const dispatch = useAppDispatch();
  const [unAuthorizedVoteIndex, setUnauthorizedVoteIndex] = useState(0);
  const [unAuthorizedVote, setUnauthorizedVote] =
    useState<null | UnAuthorizedModel>(null);
  const unauthorizedData: UnAuthorizedModel[] | [] = useAppSelector(
    (state: StoreState) => state.app.unauthorizedData,
  );

  useEffect(() => {
    getUnAuthorizedList(dispatch);
    unAuthorizedVoteIndex >= 0
      ? setUnauthorizedVote(unauthorizedData[unAuthorizedVoteIndex])
      : setUnauthorizedVote(null);
    dispatch(setDataVoteRejectToUnauthorizedDataIndex(unAuthorizedVoteIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unAuthorizedVoteIndex]);
  return (
    <>
      {unauthorizedData && !unauthorizedData[0] && (
        <h4 className="my-4 text-center">No UnAuthorized Votes Available</h4>
      )}
      {unAuthorizedVote && (
        <VoteDisplayModal
          index={unAuthorizedVoteIndex}
          setIndex={setUnauthorizedVoteIndex}
          showModalProp={unAuthorizedVoteIndex}
          unauthorizedVote={unAuthorizedVote}
          unauthorizedVotesLength={unauthorizedData.length - 1}
        />
      )}
      {/* {unauthorizedData && <CCard unauthorizedData={unauthorizedData} />} */}
    </>
  );
};

export default Authorize;
