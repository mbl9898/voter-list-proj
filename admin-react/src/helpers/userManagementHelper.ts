import { Dispatch, SetStateAction } from "react";
import { User } from "../interfaces/User";
import { UserService } from "../services/UserService";

export const headings = [
  " Sr",
  "Username",
  "Email",
  "Role",
  "Rate",
  "Update",
  // "Delete",
];

export const userEntryFormInitial: User = {
  _id: "",
  email: "",
  username: "",
  rate: 0,
  role: "user",
  assignedBlockCodes: [],
  defaultBlockCode: 0,
};

export const getUsers = async (
  setUsers: Dispatch<SetStateAction<User[]>>,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const res = await UserService.allUsers();
    await setUsers(res);
    setLoading && setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
