import axios from "axios";
import { Dispatch } from "react";
// import { VotesModel } from "../interfaces/VotesModel";
import {
  setCurrentUser,
  // setData,
  setError,
  // setHeadings,
  setIsAccessDeniedDisplay,
  // setIsDataLoading,
  setIsSignUpFormDisplay,
} from "../store";
// import { auth, db } from "../firebase";

export const uids = ["60fc2d09e269a2374ca5e82a"];

export const heading = [
  "sNo",
  "blockCode",
  "constituencyName",
  "moza",
  "dehya",
  "city",
  "patwarHalka",
  "tapaydar",
  "tehseel",
  "talka",
  "district",
  "unionCouncil",
  "bookNo",
  "constituency",
  "gender",
  "voteSNo",
  "familyNo",
  "name",
  "maritalStatus",
  "fatherHusbandName",
  "cnic",
  "age",
  "houseNo",
  "street",
  "phase",
  "sector",
  "lane",
  "boulevardAvenue",
  "otherArea",
  "count",
  "address",
];

export const signUp = async (
  userNameRef: any,
  emailRef: any,
  passwordRef: any,
  passwordConfirmRef: any,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setError: any
) => {
  setError("");
  const auth = axios.create({
    baseURL:
      process.env.REACT_APP_API_IS_DEV === "true"
        ? process.env.REACT_APP_API_BASE_URL_DEV
        : process.env.REACT_APP_API_BASE_URL_STAGING,
    timeout: 5000,
    headers: { "x-api-key": "SG.cpdcjwepcjio" },
  });
  if (passwordRef.current) {
    if (passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }
    }
  }
  const authRes = await auth
    .post("auth/register", {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: passwordConfirmRef.current.value,
    })
    .catch((err) => console.log(err));
  if (authRes) {
    try {
      if (authRes.data.success) {
        dispatch(
          setCurrentUser({
            email: emailRef.current.value,
            uid: authRes.data.data._id,
            ...authRes.data.data,
          })
        );
        localStorage.setItem("token", authRes.data.data.access_token);
        dispatch(setIsSignUpFormDisplay(false));
      }
      if (!authRes.data.success) {
        if (authRes.data.error) {
          if (authRes.data.error.message) {
            var emailExists = authRes.data.error.message;
          }
          if (authRes.data.error.details) {
            if (authRes.data.error.details.email) {
              var invalidEmail = authRes.data.error.details.email[0];
            }
            if (authRes.data.error.details.password) {
              var invalidPassword = authRes.data.error.details.password[0];
            }
          }
          setError(
            `${emailExists !== undefined ? emailExists : ""} \n
            ${invalidEmail !== undefined ? invalidEmail : ""} \n 
            ${invalidPassword !== undefined ? invalidPassword : ""}`
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(authRes, "SignUp Res Error");
  }
};

export const logout = async (
  uid: string,
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  const currentToken = localStorage.getItem("token");
  // return auth.signOut();
  setError("");
  const auth = axios.create({
    baseURL:
      process.env.REACT_APP_API_IS_DEV === "true"
        ? process.env.REACT_APP_API_BASE_URL_DEV
        : process.env.REACT_APP_API_BASE_URL_STAGING,
    timeout: 5000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      authorization: `bearer ${currentToken}`,
    },
  });

  try {
    const authRes = await auth.post("logout/", {
      userId: uid,
      accessToken: `bearer ${currentToken}`,
    });
    if (authRes.data.success) {
      dispatch(setCurrentUser(null));
      dispatch(setIsAccessDeniedDisplay(false));
    }
  } catch {
    setError("Failed to log out");
  }
};
