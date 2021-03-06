import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUp } from "../services/appService";
import { setIsLogInFormDisplay, setIsSignUpFormDisplay } from "../store";
import Loading from "./Loading";

// import { signup } from "../services/appService";
// import { useAppSelector } from "../store/hooks";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom";

const SignUp2 = () => {
  const userNameRef = useRef<any>();
  const emailRef = useRef<any>();
  const mobileNo = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordConfirmRef = useRef<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await signUp(
      userNameRef,
      mobileNo,
      emailRef,
      passwordRef,
      passwordConfirmRef,
      dispatch,
      setError
    );
    setLoading(false);
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
                <Form.Group id="mobileNo">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" ref={mobileNo} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                  {loading && <Loading variant="warning" />}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(setIsSignUpFormDisplay(false));
                dispatch(setIsLogInFormDisplay(true));
              }}
            >
              Login
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp2;
