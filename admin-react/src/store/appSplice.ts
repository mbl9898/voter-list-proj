import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { voteRejectInitial } from "../helpers/authorizeHelper";
import { BlockCode } from "../interfaces/BlockCode";
import { Task } from "../interfaces/TaskModel";
import { User } from "../interfaces/User";
import UnAuthorizedModel from "../services/UnAuthorizedModel";

interface InitialState {
  navLinkActive: number;
  currentUser: User | null;
  dashboardData: { pending: number; rejected: number; approved: number };
  unauthorizedData: UnAuthorizedModel[];
  pendingUnauthorizedData: UnAuthorizedModel[];
  rejectedVotes: UnAuthorizedModel[];
  dataVoteReject: any;
  currentRejectedVote: UnAuthorizedModel | null;
  blockCodes: BlockCode[];
  filteredBlockCodeHeadings: string[];
  defaultBlockCodeData: BlockCode | null;
  tasks: Task[];
  filteredTaskHeadings: string[];
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
  dataVoteReject: voteRejectInitial,
  currentRejectedVote: null,
  blockCodes: [],
  filteredBlockCodeHeadings: [],
  defaultBlockCodeData: null,
  tasks: [],
  filteredTaskHeadings: [],
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
    setDataVoteReject(state, action: PayloadAction<any>) {
      state.dataVoteReject = action.payload;
    },
    setDataVoteRejectToUnauthorizedDataIndex(
      state,
      action: PayloadAction<any>
    ) {
      console.log(action.payload, "index");

      state.dataVoteReject = {
        ...state.dataVoteReject,
        ...state.unauthorizedData[action.payload].rejections,
      };
    },
    setCurrentRejectedVote(state, action: PayloadAction<any>) {
      state.currentRejectedVote = action.payload;
    },
    setBlockCodes(state, action: PayloadAction<any>) {
      state.blockCodes = action.payload;
    },
    setFilteredBlockCodeHeadings(state, action: PayloadAction<any>) {
      state.filteredBlockCodeHeadings = action.payload;
    },
    setDefaultBlockCodeData(state, action: PayloadAction<any>) {
      state.defaultBlockCodeData = action.payload;
    },
    setTasks(state, action: PayloadAction<any>) {
      state.tasks = action.payload;
    },
    setFilteredTaskHeadings(state, action: PayloadAction<any>) {
      state.filteredTaskHeadings = action.payload;
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
