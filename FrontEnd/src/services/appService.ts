import axios from "axios";
import { Dispatch } from "react";
import { VotesModel } from "../interfaces/VotesModel";
import {
  setCurrentUser,
  setData,
  setError,
  setHeadings,
  setIsAccessDeniedDisplay,
  setIsDataLoading,
  setIsSignUpFormDisplay,
} from "../store";
// import { auth, db } from "../firebase";

export const uids = ["60fc2d09e269a2374ca5e82a"];

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

    // ${data.Phase == "-" ? "" : "Phase:"}
    // ${data["Boulevard/Avenue"] == "-" ? "" : "Boulevard/Avenue:"}
    return actualData;
  }
};

export const getSortedFilteredVotes = async (
  // collectionName: string,
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  const currentToken = localStorage.getItem("token");

  const vote = axios.create({
    baseURL: "http://localhost:4000/api/v1/votesData",
    timeout: 500000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      authorization: `bearer ${currentToken}`,
    },
  });
  await vote.get("/").then(async (voteRes) => {
    console.log(voteRes, "voteRes");
    if (voteRes.data.success) {
      const dataSnap = voteRes.data.votesData;
      const newData = createAddress(dataSnap);
      if (newData) {
        let inCompleteDataFilter = newData.filter((data) => data.Name !== "-");
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
  // const votes = db.ref(collectionName);
  // await votes.on("value", async (snapshot: any) => {
  //   const dataSnap = snapshot.val();
  //   const newData = createAddress(dataSnap);
  //   if (newData) {
  //     let inCompleteDataFilter = newData.filter((data) => data.Name !== "-");
  //     inCompleteDataFilter.splice(1237, 75);
  //     // console.log(inCompleteDataFilter[1315]);

  //     await dispatch(setData(inCompleteDataFilter));
  //     const headings: string[] = Object.keys(newData[0]);
  //     headings.sort((a, b) => heading.indexOf(a) - heading.indexOf(b));
  //     const filteredHeadings = headings.filter((heading) => heading !== "S No");
  //     const againFilteredHeadings = filteredHeadings.filter(
  //       (heading) => heading !== "Count"
  //     );
  //     dispatch(setHeadings(againFilteredHeadings));
  //     dispatch(setIsListDisplay(true));
  //   }
  // });
};

// export const signup = (email: any, password: any) => {
//   return auth.createUserWithEmailAndPassword(email, password);
// };
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
    baseURL: "http://localhost:4000/api/v1/auth/",
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

export const logout = async (
  uid: string,
  dispatch: Dispatch<{ payload: any; type: string }>
) => {
  const currentToken = localStorage.getItem("token");
  // return auth.signOut();
  setError("");
  const auth = axios.create({
    baseURL: "http://localhost:4000/api/v1/logout",
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
    }
  } catch {
    setError("Failed to log out");
  }
};
