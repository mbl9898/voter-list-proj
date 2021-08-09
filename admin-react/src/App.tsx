import React, { useEffect, useState } from 'react';
import AppLoading from './components/AppLoading';
import NavLinks from './components/NavLinks';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import { useAppSelector } from './store/hooks';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import DataEntry from './components/DataEntry';
import Authorize from './components/Authorize';
import AdminProtal from './components/AdminProtal';

const App = () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.app.currentUser);
  useEffect(() => {
    setLoading(true);
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
            <Switch>
              <Route path='/' exact>
                {currentUser ? (
                  <Dashboard />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                    }}
                  />
                )}
              </Route>
              <Route path='/dataEntry' exact>
                {currentUser ? (
                  <DataEntry />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                    }}
                  />
                )}
              </Route>
              <Route path='/authorize' exact>
                {currentUser ? (
                  <Authorize />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                    }}
                  />
                )}
              </Route>
              <Route path='/adminPortal' exact>
                {currentUser ? (
                  <AdminProtal />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                    }}
                  />
                )}
              </Route>

              <Route path='/signup' exact>
                <SignUp />
              </Route>
              <Route path='/login' exact>
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
