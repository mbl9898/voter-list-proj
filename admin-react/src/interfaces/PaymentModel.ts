export interface Payment {
  _id?: string;
  email: string;
  title: string;
  amount: number;
  description: string;
  fileName?: string;
  filePath?: string;
}
