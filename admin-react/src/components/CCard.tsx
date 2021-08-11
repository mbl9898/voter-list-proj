import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUnAuthorizedList } from '../helpers/authorizeHelper';
import UnAuthorizedModel from '../services/UnAuthorizedModel';
import UnAuthorizedService from '../services/unAuthorizedService';
import VoteDisplayModal from './VoteDisplayModal';

interface Props {
  title?: string;
  body?: string;
  unauthorizedData?: UnAuthorizedModel[];
  rejectedVotes?: UnAuthorizedModel[];
}

const CCard = ({ title, body, unauthorizedData, rejectedVotes }: Props) => {
  const dispatch = useDispatch();
  const [showModalProp, setShowModalProp] = useState<null | number>(null);
  const [isApprovedKey, setIsApprovedKey] = useState<null | number>(null);
  const [isRejectedKey, setIsRejectedKey] = useState<null | number>(null);
  const approveVote = async (vote: UnAuthorizedModel) => {
    const res = await UnAuthorizedService.addNewAuthorizedData(vote);
    console.log(res);
    return res.success;
  };
  const rejectVote = async (id: string) => {
    const res = await UnAuthorizedService.rejectVote(id);
    console.log(res);
  };
  useEffect(() => {}, []);
  return (
    <>
      {!unauthorizedData && (
        <div className='cpage-content'>
          <div className='ccard'>
            <div className='ccontent'>
              {title && <h2 className='ctitle'>{title}</h2>}
              {body && <p className='cbody'>{body}</p>}
              <button className='cbtn'>View Trips</button>
            </div>
          </div>
        </div>
      )}
      {unauthorizedData && (
        <div className='cpage-content'>
          {unauthorizedData.map((unauthorizedVote, index) => {
            return (
              <div key={index} className='ccard'>
                <div className='ccontent'>
                  <h2 className='ctitle'>{unauthorizedVote.name}</h2>
                  {unauthorizedVote && (
                    <div
                      className='cbody'
                      onClick={() => {
                        setShowModalProp(index);
                      }}
                    >
                      <p>{`Block Code= ${unauthorizedVote.blockCode}`}</p>
                      <p>{`Vote S No= ${unauthorizedVote.voteSNo}`}</p>
                      <p>{`CNIC= ${unauthorizedVote.cnic}`}</p>
                    </div>
                  )}
                  <button
                    className='btn btn-primary'
                    disabled={isApprovedKey === index ? true : false}
                    onClick={async () => {
                      const success = await approveVote(unauthorizedVote);
                      if (success) {
                        setIsApprovedKey(index);
                        setIsRejectedKey(null);
                        getUnAuthorizedList(dispatch);
                      }
                    }}
                  >
                    {isApprovedKey === index ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    className='btn btn-danger'
                    disabled={
                      isRejectedKey === index ||
                      unauthorizedVote.status === 'rejected'
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (unauthorizedVote._id) {
                        rejectVote(unauthorizedVote._id);
                        setIsApprovedKey(null);
                        setIsRejectedKey(index);
                      }
                    }}
                  >
                    {isRejectedKey === index ||
                    unauthorizedVote.status === 'rejected'
                      ? 'Rejected'
                      : 'Reject'}
                  </button>
                </div>

                <VoteDisplayModal
                  voteIndex={index}
                  showModalProp={showModalProp}
                  setShowModalProp={setShowModalProp}
                  unauthorizedVote={unauthorizedVote}
                />
              </div>
            );
          })}
        </div>
      )}
      {rejectedVotes && (
        <div className='cpage-content'>
          {rejectedVotes.map((rejectedVote: UnAuthorizedModel, index) => {
            return (
              <div key={index} className='ccard'>
                <div className='ccontent'>
                  <h2 className='ctitle'>{rejectedVote.name}</h2>
                  {rejectedVotes && (
                    <div
                      className='cbody'
                      onClick={() => {
                        setShowModalProp(index);
                      }}
                    >
                      <p>{`Block Code= ${rejectedVote.blockCode}`}</p>
                      <p>{`Vote S No= ${rejectedVote.voteSNo}`}</p>
                      <p>{`CNIC= ${rejectedVote.cnic}`}</p>
                    </div>
                  )}
                  <button
                    className='btn btn-primary'
                    disabled={isApprovedKey === index ? true : false}
                    onClick={async () => {
                      const success = await approveVote(rejectedVote);
                      if (success) {
                        setIsApprovedKey(index);
                        setIsRejectedKey(null);
                        getUnAuthorizedList(dispatch);
                      }
                    }}
                  >
                    {isApprovedKey === index ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    className='btn btn-danger'
                    disabled={
                      isRejectedKey === index ||
                      rejectedVote.status === 'rejected'
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (rejectedVote._id) {
                        rejectVote(rejectedVote._id);
                        setIsApprovedKey(null);
                        setIsRejectedKey(index);
                      }
                    }}
                  >
                    {isRejectedKey === index ||
                    rejectedVote.status === 'rejected'
                      ? 'Rejected'
                      : 'Reject'}
                  </button>
                </div>

                {/* <VoteDisplayModal
                  voteIndex={index}
                  showModalProp={showModalProp}
                  setShowModalProp={setShowModalProp}
                  rejectedVotes={rejectedVotes}
                /> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default CCard;
