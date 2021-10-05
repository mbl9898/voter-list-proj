import { configureStore } from "@reduxjs/toolkit";
import { appSlice, StoreInitialState } from "./appSplice";
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setNavLinkActive,
  setCurrentUser,
  setDashboardData,
  setUnauthorizedData,
  setUnauthorizedRejectedVotes,
  setPendingUnauthorizedData,
  setRejectedVotes,
  setDataVoteReject,
  setDataVoteRejectToUnauthorizedDataIndex,
  setCurrentRejectedVote,
  setBlockCodes,
  setFilteredBlockCodeHeadings,
  setDefaultBlockCodeData,
  setTasks,
  setFilteredTaskHeadings,
  setPayments,
  setFilteredPaymentHeadings,
  setIsLoggedIn,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
  setIsAccessDeniedDisplay,
  setError,
  setMessage,
  setMessageVariant,
} = appSlice.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface StoreState {
  app: StoreInitialState
}