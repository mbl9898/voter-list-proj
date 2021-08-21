import { useState } from "react";
import { setDataVoteReject } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useVoteReject = () => {
  const dispatch = useAppDispatch();
  const dataVoteReject = useAppSelector((state) => state.app.dataVoteReject);
  // dispatch(setDataVoteReject(initialState));
  const onChangeVoteReject = (event: any) => {
    dispatch(
      setDataVoteReject({
        ...dataVoteReject,
        [event.target.id]: !dataVoteReject[event.target.id],
      })
    );
  };

  return {
    onChangeVoteReject,
  };
};
