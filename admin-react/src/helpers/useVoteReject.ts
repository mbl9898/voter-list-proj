import { useState } from "react";

export const useVoteReject = (initialState: any) => {
  const [dataVoteReject, setDataVoteReject] = useState(initialState);
  const onChangeVoteReject = (event: any) => {
    setDataVoteReject({
      ...dataVoteReject,
      [event.target.id]: !dataVoteReject[event.target.id],
    });
    console.log(dataVoteReject);
  };

  // const onSubmit = (event: any) => {
  //   event && event.preventDefault();
  //   callback(data);
  // };

  return {
    onChangeVoteReject,
    dataVoteReject,
    setDataVoteReject,
    // onSubmit,
  };
};
