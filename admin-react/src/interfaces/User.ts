export interface User {
  _id: string;
  username: string;
  email: string;
  isApproved: boolean;
  isModified: boolean;
  isRejected: boolean;
  role: string;
  rate: number;
}
