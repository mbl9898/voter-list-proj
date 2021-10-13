import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import {
  setCurrentUser,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
  setMessage,
  setNavLinkActive,
} from "../store";
import Loading from "./Loading";
import { UserService } from "../services/UserService";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";

const Login = () => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await UserService.loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (!res.success) {
        setError(res.error.message);
        setLoading(false);
      }
      if (res.success) {
        dispatch(setMessage("You Logged In Successfully"));
        dispatch(setCurrentUser(res.data.userData));
        localStorage.setItem("token", res.data.access_token);
        setLoading(false);
        dispatch(setIsLogInFormDisplay(false));
        dispatch(setNavLinkActive(0));
        history.push("/");
        document.title = "Dashboard - Voter List App";
      }
    } catch (error) {
      console.log(error);
    }
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
              <Form className="pb-5" onSubmit={onSubmit}>
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
                document.title = "SignUp - Voter List App";
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
