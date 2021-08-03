import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom";
import { signUp } from "../services/appService";

export default function SignUp({
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
}: any) {
  const userNameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordConfirmRef = useRef<any>();
  // const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (passwordRef.current) {
      if (passwordConfirmRef.current) {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }
      }
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        userNameRef,
        emailRef,
        passwordRef,
        passwordConfirmRef,
        dispatch,
        setError
      );
      // history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="userName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" ref={userNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    autoComplete="true"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsSignUpFormDisplay(false);
                setIsLogInFormDisplay(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
