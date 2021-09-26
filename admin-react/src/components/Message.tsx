import React, { useEffect } from "react";

interface Props extends React.AllHTMLAttributes<any> {
  msg: string | null;
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
  const { msg, variant, ...others } = props;
  useEffect(() => {}, [msg]);

  return (
    <>
      {console.log(msg)}
      {msg && (
        <div
          className={`alert alert-${variant} alert-dismissible fade show`}
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
      )}
    </>
  );
};

export default Message;
