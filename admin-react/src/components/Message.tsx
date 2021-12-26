import React, { memo, useEffect } from 'react';
import { setMessage } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { StoreState } from './../store/index';

interface Props extends React.AllHTMLAttributes<any> {
  msg: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

const Message = (props: Props) => {
  const dispatch = useAppDispatch();
  const msg = useAppSelector((state: StoreState) => state.app.message);
  const { variant, ...others } = props;
  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);
  return (
    <>
      <div
        className={`alert alert-${variant} alert-dismissible fade show notify`}
        role="alert"
        {...others}
      >
        {msg}
      </div>
    </>
  );
};

export default memo(Message);
