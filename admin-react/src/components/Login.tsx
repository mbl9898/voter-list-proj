import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
} from "../store";
import Loading from "./Loading";
import { useAppSelector } from "../store/hooks";
import { UserService } from "../services/UserService";
import { useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setAlert("");
    setLoading(true);
    try {
      const res = await UserService.loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (!res.success) {
        setError(res.error.message);
      }
      if (res.success) {
        setAlert("This user has been successfully loggedIn");
        setTimeout(() => {
          setAlert("");
        }, 5000);
        dispatch(setCurrentUser(res.data.userData));
        localStorage.setItem("token", res.data.access_token);
        dispatch(setIsLogInFormDisplay(false));
        history.push("/");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Log In
                  {loading && <Loading variant="warning" />}
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account?{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(setIsLogInFormDisplay(false));
                history.push("/signup");
                dispatch(setIsSignUpFormDisplay(true));
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
