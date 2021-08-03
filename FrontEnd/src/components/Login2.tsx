import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
} from "../store";
import Loading from "./Loading";
import { useAppSelector } from "../store/hooks";
import { login } from "../services/appService";
// import { auth } from "../firebase";
// import firebase from "firebase";

const Login2 = () => {
  //   const { login } = useAuth();
  // const currentUser = useAppSelector((state) => state.app.currentUser);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await login(
      emailRef.current.value,
      passwordRef.current.value,
      dispatch,
      setLoading,
      error,
      setError
    );
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
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

export default Login2;
