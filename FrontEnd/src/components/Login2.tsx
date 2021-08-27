import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setIsLogInFormDisplay, setIsSignUpFormDisplay } from "../store";
import Loading from "./Loading";
import { login } from "../services/appService";

const Login2 = () => {
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
        className="container d-flex align-items-center justify-content-center flex-wrap"
        style={{ minHeight: "100vh" }}
      >
        <div className="row d-flex align-items-center justify-content-center flex-wrap">
          <Card
            className="col m-3 p-3 bg-secondary text-white bg-opacity-25"
            style={{ minHeight: "23rem" }}
          >
            <Card.Body>
              <h4>Use Our App</h4>
              <p>
                Analyze Votes data And To more efficient Campaign
                <br />
                Get votes data of your area
                <br />
                Descriptive Vote Details
                <br />
                Sort and Filter Votes
              </p>
            </Card.Body>
          </Card>
          <Card className="col m-3 p-3" style={{ minHeight: "27rem" }}>
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
                <Button disabled={loading} className="w-100 my-3" type="submit">
                  Log In
                  {loading && <Loading variant="warning" />}
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
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
            </Card.Body>
          </Card>
          <Card
            className="col m-3 p-3 bg-secondary text-white bg-opacity-25"
            style={{ height: "23rem" }}
          >
            <Card.Body>
              <h4>Join Our Data Entry Team</h4>
              <p>
                Work From Home
                <br />
                Work On Your Desired Time
                <br />
                Work More Earn More
              </p>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Login2;
