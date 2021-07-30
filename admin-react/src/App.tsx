import React, { useEffect, useState } from "react";
import AppLoading from "./components/AppLoading";
import NavLinks from "./components/NavLinks";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import { useAppSelector } from "./store/hooks";
import { UserService } from "./services/UserService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import DataEntry from "./components/DataEntry";

const App = () => {
  const [loading, setLoading] = useState(false);
  const isSignUpFormDisplay = useAppSelector(
    (state) => state.app.isSignUpFormDisplay
  );
  const isLogInFormDisplay = useAppSelector(
    (state) => state.app.isLogInFormDisplay
  );
  const currentUser = useAppSelector((state) => state.app.currentUser);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <Router>
        {loading && <AppLoading />}
        {!loading && (
          <>
            <Navbar />
            <NavLinks />
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

              <Route path="/dataEntry"></Route>

              <Route path="/signup" exact>
                <SignUp />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
};

export default App;
