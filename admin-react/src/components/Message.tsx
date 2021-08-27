import React, { useEffect } from "react";

interface Props {
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

const Message = ({ msg, variant }: Props) => {
  useEffect(() => {}, [msg]);
  return (
    <>
      {console.log(msg)}
      {msg && (
        <div
          className={`alert alert-${variant} alert-dismissible fade show`}
          role="alert"
        >
          {msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            {/* <span aria-hidden="true">&times;</span> */}
          </button>
        </div>
      )}
    </>
  );
};

export default Message;
