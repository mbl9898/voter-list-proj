import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link btn ${active === 0 ? "active" : ""}`}
              aria-current="page"
              to="/"
              onClick={() => {
                setActive(0);
              }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn ${active === 1 ? "active" : ""}`}
              to="/dataEntry"
              onClick={() => {
                setActive(1);
              }}
            >
              Data Entry
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn ${active === 2 ? "active" : ""}`}
              to="/Authorized"
              onClick={() => {
                setActive(2);
              }}
            >
              Authorized
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn ${active === 3 ? "active" : ""}`}
              onClick={() => {
                setActive(3);
              }}
              to="/adminPortal"
            >
              Admin Portal
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavLinks;
