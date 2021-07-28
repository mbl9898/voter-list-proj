import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import firebase from "firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLogInFormDisplay, setIsSignUpFormDisplay } from "../store";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  //   const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const abortController: any = new AbortController();
  var cancelTokenSource = axios.CancelToken.source();
  //   const history = useHistory();

  function login(email: any, password: any) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // return auth.signInWithEmailAndPassword(email, password);
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    const auth = axios.create({
      baseURL: "http://localhost:4000/api/v1/auth/",
      timeout: 5000,
      headers: { "x-api-key": "SG.cpdcjwepcjio" },
      cancelToken: cancelTokenSource.token,
    });

    try {
      setError("");
      setLoading(true);
      const authRes = await auth
        .post("login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          remember_me: false,
        })
        .then((authRes) => {
          console.log(authRes);

          try {
            if (authRes.data.success) {
              localStorage.setItem("token", authRes.data.data.access_token);
            } else {
              throw error;
            }
          } catch (err) {
            if (authRes.data.error) setError(authRes.data.error.message);
          }
        })
        .catch((err) => console.log(err));
      // .catch((err) => console.log(err));

      // await login(emailRef.current.value, passwordRef.current.value);
      // auth.onAuthStateChanged((user: any) => {
      //   if (user) {
      //     uids.forEach((uid) => {
      //       if (uid === user.uid) {
      //         getSortedFilteredVotes(
      //           collectionName,
      //           setData,
      //           setHeadings,
      //           setIsListDisplay
      //         );
      //       } else {
      //         console.log("uid not matched");
      //       }
      //     });
      //   }
      // });

      //   history.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
    setLoading(false);
    dispatch(setIsLogInFormDisplay(false));
  }
  useEffect(() => {
    return () => {
      console.log("aborted");
      return cancelTokenSource.cancel();
    };
  });

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
}
