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
import Votes from "./Votes/Votes";
<<<<<<< HEAD
import InvalidRoute from "./InvalidRoute";
=======
import Profile from "./Profile";
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd

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
            <Votes />
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
<<<<<<< HEAD
=======
        <Route path="/profile" exact>
          {currentUser ? (
            <Profile />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>

>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="*">
          <InvalidRoute />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
