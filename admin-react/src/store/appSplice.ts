import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { voteRejectInitial } from '../helpers/authorizeHelper';
import { BlockCode } from '../interfaces/BlockCode';
import { Payment } from '../interfaces/PaymentModel';
import { Task } from '../interfaces/TaskModel';
import { User } from '../interfaces/User';
import UnAuthorizedModel from '../services/UnAuthorizedModel';

export interface StoreInitialState {
  navLinkActive: number;
  currentUser: User | null;
  dashboardData: {
    withdrawalAmount: number;
    pending: number;
    rejected: number;
    approved: number;
  };
  unauthorizedData: UnAuthorizedModel[];
  unauthorizedRejectedVotes: UnAuthorizedModel[];
  pendingUnauthorizedData: UnAuthorizedModel[];
  rejectedVotes: UnAuthorizedModel[];
  dataVoteReject: any;
  currentRejectedVote: UnAuthorizedModel | null;
  blockCodes: BlockCode[];
  filteredBlockCodeHeadings: string[];
  defaultBlockCodeData: BlockCode | null;
  tasks: Task[];
  filteredTaskHeadings: string[];
  payments: Payment[];
  filteredPaymentHeadings: string[];
  isLoggedIn: boolean;
  isSignUpFormDisplay: boolean;
  isLogInFormDisplay: boolean;
  isAccessDeniedDisplay: boolean;
  error: string;
  message: string;
  messageVariant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

const initialState: StoreInitialState = {
  navLinkActive: 0,
  currentUser: null,
  dashboardData: { withdrawalAmount: 0, rejected: 0, pending: 0, approved: 0 },
  unauthorizedData: [],
  unauthorizedRejectedVotes: [],
  pendingUnauthorizedData: [],
  rejectedVotes: [],
  dataVoteReject: voteRejectInitial,
  currentRejectedVote: null,
  blockCodes: [],
  filteredBlockCodeHeadings: [],
  defaultBlockCodeData: null,
  tasks: [],
  filteredTaskHeadings: [],
  payments: [],
  filteredPaymentHeadings: [],
  isLoggedIn: false,
  isSignUpFormDisplay: false,
  isLogInFormDisplay: true,
  isAccessDeniedDisplay: false,
  error: '',
  message: '',
  messageVariant: 'info',
};

export const appSlice = createSlice({
  name: 'app',
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
    setUnauthorizedRejectedVotes(state, action: PayloadAction<any>) {
      state.unauthorizedRejectedVotes = action.payload;
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
      action: PayloadAction<any>,
    ) {
      if (state.unauthorizedData[action.payload]) {
        state.dataVoteReject = {
          ...state.dataVoteReject,
          ...state.unauthorizedData[action.payload].rejections,
        };
      }
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
    setPayments(state, action: PayloadAction<any>) {
      state.payments = action.payload;
    },
    setFilteredPaymentHeadings(state, action: PayloadAction<any>) {
      state.filteredPaymentHeadings = action.payload;
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
    setMessage(state, action: PayloadAction<any>) {
      state.message = action.payload;
    },
    setMessageVariant(state, action: PayloadAction<any>) {
      state.messageVariant = action.payload;
    },
  },
});
