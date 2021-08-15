import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";
import UnAuthorizedModel from "../services/UnAuthorizedModel";

interface InitialState {
  navLinkActive: number;
  currentUser: User | null;
  dashboardData: { pending: number; rejected: number; approved: number };
  unauthorizedData: UnAuthorizedModel[];
  pendingUnauthorizedData: UnAuthorizedModel[];
  rejectedVotes: UnAuthorizedModel[];
  currentRejectedVote: UnAuthorizedModel | null;
  isLoggedIn: boolean;
  isSignUpFormDisplay: boolean;
  isLogInFormDisplay: boolean;
  isAccessDeniedDisplay: boolean;
  error: string;
}

const initialState: InitialState = {
  navLinkActive: 0,
  currentUser: null,
  dashboardData: { rejected: 0, pending: 0, approved: 0 },
  unauthorizedData: [],
  pendingUnauthorizedData: [],
  rejectedVotes: [],
  currentRejectedVote: null,
  isLoggedIn: false,
  isSignUpFormDisplay: false,
  isLogInFormDisplay: true,
  isAccessDeniedDisplay: false,
  error: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNavLinkActive(state, action: PayloadAction<any>) {
      state.navLinkActive = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
    },
    setDashboardData(state, action: PayloadAction<any>) {
      state.dashboardData = action.payload;
    },
    setUnauthorizedData(state, action: PayloadAction<any>) {
      state.unauthorizedData = action.payload;
    },
    setPendingUnauthorizedData(state, action: PayloadAction<any>) {
      state.pendingUnauthorizedData = action.payload;
    },
    setRejectedVotes(state, action: PayloadAction<any>) {
      state.rejectedVotes = action.payload;
    },
    setCurrentRejectedVote(state, action: PayloadAction<any>) {
      state.currentRejectedVote = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<any>) {
      state.isLoggedIn = action.payload;
    },
    setIsSignUpFormDisplay(state, action: PayloadAction<any>) {
      state.isSignUpFormDisplay = action.payload;
    },
    setIsLogInFormDisplay(state, action: PayloadAction<any>) {
      state.isLogInFormDisplay = action.payload;
    },
    setIsAccessDeniedDisplay(state, action: PayloadAction<any>) {
      state.isAccessDeniedDisplay = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
  },
});
