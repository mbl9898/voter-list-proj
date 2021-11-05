<<<<<<< HEAD
import { memo, useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd
import AppLoading from "./components/AppLoading";
import NavLinks from "./components/NavLinks";
import Navbar from "./components/Navbar";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { BrowserRouter as Router } from "react-router-dom";
import { getUnAuthorizedList } from "./helpers/authorizeHelper";
import Routes from "./components/Routes";
import Message from "./components/Message";
import { User } from "./interfaces/User";
import { StoreState } from "./store/index";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser: User | null = useAppSelector(
    (state: StoreState) => state.app.currentUser
  );
  const message: null | string = useAppSelector(
    (state: StoreState) => state.app.message
  );
  const messageVariant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark" = useAppSelector((state: StoreState) => state.app.messageVariant);
  useEffect(() => {
    setLoading(true);
    currentUser &&
      currentUser.role === "admin" &&
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
              <Message msg={message} variant={messageVariant} id="msg" />
            )}
            <Routes />
          </>
        )}
      </Router>
    </>
  );
};

export default memo(App);
