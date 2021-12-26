import { useState } from 'react';

export const useForm = (callback: any, initialState: any) => {
  const [data, setData] = useState(initialState);
  const onChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: data.blockCode
        ? event.target.value.toUpperCase()
        : event.target.value,
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
