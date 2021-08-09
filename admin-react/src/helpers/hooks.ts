import { useState } from "react";
import { VotesModel } from "../interfaces/VotesModel";

export const useForm = (callback: any, initialState: VotesModel) => {
  const [data, setData] = useState<VotesModel>(initialState);
  const onChange = (event: any) => {
    console.log("onchange");
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const onSubmit = (event: any) => {
    // event.preventDefault();
    callback(data);
  };

  return {
    onChange,
    onSubmit,
    data,
    setData,
  };
};
