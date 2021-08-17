export interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "dataEntry" | "dataViewer";
  rate: number;
  assignedBlockCodes: number[];
  defaultBlockCode: number;
}
