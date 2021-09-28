import React, { useEffect } from "react";
import { setMessage } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface Props extends React.AllHTMLAttributes<any> {
  msg: string;
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

const Message = (props: Props) => {
  const dispatch = useAppDispatch();
  const msg = useAppSelector((state) => state.app.message);
  const { variant, ...others } = props;
  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);
  }, [msg]);
  return (
    <>
      {console.log(msg)}
      {/* {msg && ( */}
      <div
        className={`alert alert-${variant} alert-dismissible fade show notify`}
        role="alert"
        {...others}
      >
        {msg}
        {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
          </button> */}
      </div>
      {/* )} */}
    </>
  );
};

export default Message;
