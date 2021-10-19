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
                  <svg
                    className="ms-2"
                    height="20"
                    width="20"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                    ></path>
                  </svg>
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
              <svg
                height="25"
                width="25"
                viewBox="0 0 512 512"
                className="ms-1 pb-1"
              >
                <path
                  fill="#fff"
                  d="M416 448h-84c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h84c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zM167.1 83.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L260.8 230H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L147.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
