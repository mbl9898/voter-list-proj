import { useEffect, useState } from 'react';
import AppLoading from './components/AppLoading';
import NavLinks from './components/NavLinks';
import Navbar from './components/Navbar';
import './App.scss';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { getUnAuthorizedList } from './helpers/authorizeHelper';
import Routes from './components/Routes';
import Message from './components/Message';
import { User } from './interfaces/User';

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser: User = useAppSelector((state) => state.app.currentUser);
  const message: null | string = useAppSelector((state) => state.app.message);
  const messageVariant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = useAppSelector((state) => state.app.messageVariant);
  useEffect(() => {
    setLoading(true);
    currentUser &&
      currentUser.role === 'admin' &&
      getUnAuthorizedList(dispatch);
    setLoading(false);
  }, [currentUser]);
  return (
    <>
      <Router>
        {loading && <AppLoading />}
        {!loading && (
          <>
            <Navbar />
            {currentUser !== null && <NavLinks />}
            {message && (
              <Message msg={message} variant={messageVariant} id='msg' />
            )}
            <Routes />
          </>
        )}
      </Router>
    </>
  );
};

export default App;
