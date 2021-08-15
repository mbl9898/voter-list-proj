import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSplice";
export const store: any = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setNavLinkActive,
  setCurrentUser,
  setDashboardData,
  setUnauthorizedData,
  setPendingUnauthorizedData,
  setRejectedVotes,
  setCurrentRejectedVote,
  setIsLoggedIn,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
  setIsAccessDeniedDisplay,
  setError,
} = appSlice.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
