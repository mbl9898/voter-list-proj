export interface User {
  _id: string;
  username: string;
  email: string;
  mobileNo: string;
  role: 'user' | 'admin' | 'dataEntry' | 'dataViewer';
  estimatedWithdrawlAmount?: number;
  rate: number;
  assignedBlockCodes: number[];
  defaultBlockCode: number;
}
