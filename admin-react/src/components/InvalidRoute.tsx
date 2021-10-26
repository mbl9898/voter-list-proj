import React from "react";
import { Link } from "react-router-dom";

const InvalidRoute = () => {
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ height: 100 + "vh" }}
      >
        <h1 className="text-center align-middle">404 Page Not Found!</h1>
        <Link className=" text-center align-middle display-6" to="/">
          Go Back
        </Link>
      </div>
    </>
  );
};

export default InvalidRoute;
