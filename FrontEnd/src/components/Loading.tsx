import React from "react";

interface Props {
  variant?: "primary" | "danger" | "warning";
}
const Loading = ({ variant = "primary" }: Props) => {
  return (
    <>
      <div
        className="text-center"
        style={{
          display: "flex",
          height: variant !== "warning" ? "100vh" : "",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={`spinner-border text-${variant}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {variant !== "warning" && (
          <h5 className="mt-4 ms-2 text-primary">Loading...</h5>
        )}
      </div>
    </>
  );
};

export default Loading;
