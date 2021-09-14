import { useEffect, useState } from "react";
import AppLoading from "./components/AppLoading";
import NavLinks from "./components/NavLinks";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import DataEntry from "./components/DataEntry";
import Authorize from "./components/Authorize";
import AdminPortal from "./components/AdminPortal/AdminPortal";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUnAuthorizedList } from "./helpers/authorizeHelper";
import Routes from "./components/Routes";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.app.currentUser);
  useEffect(() => {
    setLoading(true);
    getUnAuthorizedList(dispatch);
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
            {currentUser !== null && <NavLinks />}
            <Routes />
          </>
        )}
      </Router>
    </>
  );
};

export default App;
