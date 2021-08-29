import { Link } from "react-router-dom";
import { setNavLinkActive } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const NavLinks = () => {
  // const [active, setActive] = useState(0);
  const navLinkActive = useAppSelector((state) => state.app.navLinkActive);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link btn ${navLinkActive === 0 ? "active" : ""}`}
              aria-current="page"
              to="/"
              onClick={() => {
                dispatch(setNavLinkActive(0));
                document.title = "Dashboard - Voter List App";
              }}
            >
              Dashboard
            </Link>
          </li>
          {(currentUser.role === "admin" ||
            currentUser.role === "dataEntry") && (
            <li className="nav-item">
              <Link
                className={`nav-link btn ${
                  navLinkActive === 1 ? "active" : ""
                }`}
                to="/dataEntry"
                onClick={() => {
                  dispatch(setNavLinkActive(1));
                  document.title = "Data Entry - Voter List App";
                }}
              >
                Data Entry
              </Link>
            </li>
          )}
          {(currentUser.role === "admin" ||
            currentUser.role === "dataEntry") && (
            <li className="nav-item">
              <Link
                className={`nav-link btn ${
                  navLinkActive === 2 ? "active" : ""
                }`}
                to="/tasks"
                onClick={() => {
                  dispatch(setNavLinkActive(2));
                  document.title = "Tasks - Voter List App";
                }}
              >
                Tasks
              </Link>
            </li>
          )}
          {(currentUser.role === "admin" ||
            currentUser.role === "dataEntry") && (
            <li className="nav-item">
              <Link
                className={`nav-link btn ${
                  navLinkActive === 3 ? "active" : ""
                }`}
                to="/payments"
                onClick={() => {
                  dispatch(setNavLinkActive(3));
                  document.title = "Payments - Voter List App";
                }}
              >
                Payments
              </Link>
            </li>
          )}
          {currentUser.role === "admin" && (
            <li className="nav-item">
              <Link
                className={`nav-link btn ${
                  navLinkActive === 4 ? "active" : ""
                }`}
                to="/authorize"
                onClick={() => {
                  dispatch(setNavLinkActive(4));
                  document.title = "Autorize - Voter List App";
                }}
              >
                Authorize
              </Link>
            </li>
          )}
          {currentUser.role === "admin" && (
            <li className="nav-item">
              <Link
                className={`nav-link btn ${
                  navLinkActive === 5 ? "active" : ""
                }`}
                onClick={() => {
                  dispatch(setNavLinkActive(5));
                  document.title = "Admin Portal - Voter List App";
                }}
                to="/adminPortal"
              >
                Admin Portal
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavLinks;
