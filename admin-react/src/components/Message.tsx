import React from "react";

interface Props {
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

const Message = ({ msg, variant }: Props) => {
  return (
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
  );
};

export default Message;
