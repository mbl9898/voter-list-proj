import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
  headings: [],
  currentUser: null,
  loading: true,
  isListDisplay: false,
  isDataLoading: false,
  isSignUpFormDisplay: false,
  isLogInFormDisplay: true,
  isAccessDeniedDisplay: false,
  error: "",
  alert: "",
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

    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setIsListDisplay(state, action: PayloadAction<any>) {
      state.isListDisplay = action.payload;
    },
    setIsDataLoading(state, action: PayloadAction<any>) {
      state.isDataLoading = action.payload;
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
    setAlert(state, action: PayloadAction<any>) {
      state.alert = action.payload;
    },
  },
});
