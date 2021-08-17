import { useState } from "react";

export const useForm = (callback: any, initialState: any) => {
  const [data, setData] = useState(initialState);
  const onChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: data.username
        ? event.target.value
        : event.target.value.toUpperCase(),
    });
  };

  const onSubmit = (event: any) => {
    event && event.preventDefault();
    callback(data);
  };

  return {
    onChange,
    onSubmit,
    data,
    setData,
  };
};
