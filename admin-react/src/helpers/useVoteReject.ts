import { setDataVoteReject } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { StoreState } from './../store/index';

export const useVoteReject = () => {
  const dispatch = useAppDispatch();
  const dataVoteReject = useAppSelector((state: StoreState) => state.app.dataVoteReject);
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
