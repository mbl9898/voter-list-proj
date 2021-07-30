import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  //   data: [],
  //   headings: [],
  currentUser: null,
  dashboardData: { pending: 0, approved: 0 },
  //   loading: true,
  //   isListDisplay: false,
  //   isDataLoading: false,
  isLoggedIn: false,
  isSignUpFormDisplay: false,
  isLogInFormDisplay: true,
  //   isAccessDeniedDisplay: false,
  //   error: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    setHeadings(state, action: PayloadAction<any>) {
      state.headings = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
    },
    setDashboardData(state, action: PayloadAction<any>) {
      state.dashboardData = action.payload;
    },
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setIsListDisplay(state, action: PayloadAction<any>) {
      state.isListDisplay = action.payload;
    },
    setIsDataLoading(state, action: PayloadAction<any>) {
      state.isDataLoading = action.payload;
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
