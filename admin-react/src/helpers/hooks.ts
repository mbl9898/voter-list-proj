import { useState } from "react";

export const useForm = (callback: any, initialState = {}) => {
  const [data, setData] = useState<any>(initialState);
  const onChange = (event: any) => {
    console.log("onchange");
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    data,
  };
};
