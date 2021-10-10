import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import AdminPortal from "./AdminPortal/AdminPortal";
import Authorize from "./Authorize/Authorize";
import Dashboard from "./Dashboard/Dashboard";
import DataEntry from "./DataEntry/DataEntry";
import Login from "./Login";
import Payments from "./Payments/Payments";
import SignUp from "./SignUp";
import Tasks from "./Tasks/Tasks";
import { StoreState } from "./../store/index";

const Routes = () => {
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser
  );
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {currentUser ? (
            <Dashboard />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/dataEntry" exact>
          {currentUser ? (
            <DataEntry />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/tasks" exact>
          {currentUser ? (
            <Tasks />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/payments" exact>
          {currentUser ? (
            <Payments />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/votes" exact>
          {currentUser ? (
            // <Votes />
            <Authorize />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/authorize" exact>
          {currentUser ? (
            <Authorize />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>
        <Route path="/adminPortal" exact>
          {currentUser ? (
            <AdminPortal />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>

        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
