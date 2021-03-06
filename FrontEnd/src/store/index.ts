import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSplice";
export const store: any = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setData,
  setHeadings,
  setCurrentUser,
  setError,
  setAlert,
  setIsAccessDeniedDisplay,
  setIsListDisplay,
  setIsDataLoading,
  setIsLogInFormDisplay,
  setIsSignUpFormDisplay,
  setLoading,
} = appSlice.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
