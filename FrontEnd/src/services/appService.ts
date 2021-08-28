import axios from "axios";
import { Dispatch } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import {
  setAlert,
  setCurrentUser,
  setData,
  setError,
  setHeadings,
  setIsAccessDeniedDisplay,
  setIsDataLoading,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
} from "../store";

const apiBaseUrl =
  process.env.REACT_APP_API_IS_DEV === "true"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_STAGING;

const heading = [
  "S No",
  "Block Code",
  "Constituency Name",
  "Moza",
  "Dehya",
  "City",
  "Patwar Halka",
  "Tapaydar",
  "Tehseel",
  "Talka",
  "District",
  "Union Council",
  "Book No",
  "Constituency",
  "Gender",
  "Vote S No",
  "Family No",
  "Name",
  "Marital Status",
  "Father|Husband Name",
  "NIC",
  "Age",
  "House No",
  "Street",
  "Phase",
  "Sector",
  "Lane",
  "Boulevard|Avenue",
  "Other Area",
  "Count",
  "Address",
];

const createAddress = (d: VotesModel[]) => {
  if (d) {
    const actualData = d;
    actualData.forEach((data, i) => {
      actualData[i].Address = `
        ${data["House No"] === "-" ? "" : "House:"} 
        ${data["House No"] === "-" ? "" : data["House No"]} 
        ${data.Street === "-" ? "" : "Street:"} 
        ${data.Street === "-" ? "" : data.Street} 
        ${data.Phase === "-" ? "" : data.Phase} 
        ${data.Sector === "-" ? "" : "Sector:"} 
        ${data.Sector === "-" ? "" : data.Sector} 
        ${data.Lane === "-" ? "" : "Lane:"} 
        ${data.Lane === "-" ? "" : data.Lane}
        ${data["Boulevard|Avenue"] === "-" ? "" : data["Boulevard|Avenue"]}
        ${data["Other Area"] === "-" ? "" : data["Other Area"]}
        ${data.City === "-" ? "" : data.City}`;
    });
    return actualData;
  }
};

export const getSortedFilteredVotes = async (
  dispatch: Dispatch<{ payload: any; type: string }>,
  currentUser: any
) => {
  const currentToken = localStorage.getItem("token");

  const vote = axios.create({
    baseURL: apiBaseUrl + "votesData",
    timeout: 500000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      authorization: `bearer ${currentToken}`,
    },
  });
  if (currentUser.role === "dataViewer" || currentUser.role === "admin") {
    await vote.get("/").then(async (voteRes: any) => {
      console.log(voteRes, "voteRes");
      if (voteRes.data.success) {
        const dataSnap = voteRes.data.votesData;
        const newData = createAddress(dataSnap);
        if (newData) {
          let inCompleteDataFilter = newData.filter(
            (data) => data.Name !== "-"
          );
          inCompleteDataFilter.splice(1237, 75);

          await dispatch(setData(inCompleteDataFilter));
          const headings: string[] = Object.keys(newData[0]);
          headings.sort((a, b) => heading.indexOf(a) - heading.indexOf(b));
          const filteredHeadings1 = headings.filter(
            (heading) => heading !== "S No"
          );
          const filteredHeadings2 = filteredHeadings1.filter(
            (heading) => heading !== "Count"
          );
          const filteredHeadings3 = filteredHeadings2.filter(
            (heading) => heading !== "_id"
          );
          dispatch(setHeadings(filteredHeadings3));
          dispatch(setIsDataLoading(false));
        }
      }
    });
  } else {
    dispatch(setIsLogInFormDisplay(false));
    dispatch(setIsAccessDeniedDisplay(true));
    console.log("You Are Not Allowed To Access Data");
    dispatch(setIsDataLoading(false));
  }
};

export const signUp = async (
  userNameRef: any,
  emailRef: any,
  passwordRef: any,
  passwordConfirmRef: any,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setError: any
) => {
  setError("");
  console.log(apiBaseUrl);
  const auth = axios.create({
    baseURL: apiBaseUrl + "auth",
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
    .post("register", {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: passwordConfirmRef.current.value,
    })
    .catch((err) => console.log(err));
  if (authRes) {
    console.log("SignUp Res", authRes);
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
            `${emailExists !== undefined ? emailExists : ""} 
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
export const login = async (
  emailRef: any,
  passwordRef: any,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setLoading: any,
  error: any,
  setError: any
) => {
  const auth = axios.create({
    baseURL: apiBaseUrl + "auth/",
    timeout: 5000,
    headers: { "x-api-key": "SG.cpdcjwepcjio" },
  });
  const authRes = await auth
    .post("login", {
      email: emailRef,
      password: passwordRef,
      remember_me: false,
    })
    .catch((err) => console.log(err));
  setLoading(false);
  if (authRes) {
    console.log(authRes, "LoginRes");
    try {
      if (authRes.data.success) {
        await localStorage.setItem("token", authRes.data.data.access_token);
        await dispatch(
          setCurrentUser({
            ...authRes.data.data.userData,
          })
        );
        dispatch(setIsLogInFormDisplay(false));
      } else {
        throw error;
      }
    } catch (err) {
      if (authRes.data.error) setError(authRes.data.error.message);
    }
  } else {
    console.log(authRes, "Login Res Error");
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
    baseURL: apiBaseUrl + "logout",
    timeout: 5000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      authorization: `bearer ${currentToken}`,
    },
  });

  try {
    const authRes = await auth.post("/", {
      userId: uid,
      accessToken: `bearer ${currentToken}`,
    });
    console.log(authRes);
    if (authRes.data.success) {
      dispatch(setCurrentUser(null));
      dispatch(setIsAccessDeniedDisplay(false));
      dispatch(setIsLogInFormDisplay(true));
    } else {
      dispatch(setAlert("Failed to log out"));
      setTimeout(() => {
        dispatch(setAlert(""));
      }, 5000);
    }
  } catch {
    setError("Failed to log out");
  }
};
