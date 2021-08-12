export interface User {
  _id: string;
  username: string;
  email: string;
  isApproved: boolean;
  isModified: boolean;
  isRejected: boolean;
  role: "user" | "admin" | "dataEntry" | "dataViewer";
  rate: number;
}
