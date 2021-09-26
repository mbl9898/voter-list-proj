export interface Payment {
  _id?: string;
  email: string;
  title: string;
  amount: number | undefined;
  description: string;
  fileName?: string;
  filePath?: string;
}
