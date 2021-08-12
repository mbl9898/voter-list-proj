import { Dispatch, SetStateAction } from "react";
import { User } from "../interfaces/User";
import { UserService } from "../services/UserService";

export const getUsers = async (setUsers: Dispatch<SetStateAction<User[]>>) => {
  try {
    const req = await UserService.allUsers();
    setUsers(req.map((x: any) => ({ ...x, isModified: false })));
  } catch (error) {
    console.log(error);
  }
};

export const changeRole = async (
  userId: string,
  role: User["role"],
  setUsers: Dispatch<SetStateAction<User[]>>
) => {
  try {
    const res = await UserService.changeRole(userId, role);
    getUsers(setUsers);

    //   $q.notify({
    //     color: 'primary',
    //     message: `This User has been successfully approved`,
    //   });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
export const changeRate = async (
  userId: string,
  rate: number,
  setUsers: Dispatch<SetStateAction<User[]>>
) => {
  try {
    const res = await UserService.changeRate(userId, rate);
    getUsers(setUsers);

    //   $q.notify({
    //     color: 'primary',
    //     message: `This User has been successfully approved`,
    //   });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const approveUser = async (
  setUsers: Dispatch<SetStateAction<User[]>>,
  userId: string,
  rate: number
) => {
  try {
    const user = await UserService.approval(userId, true, rate);
    getUsers(setUsers);
    //   $q.notify({
    //     color: 'primary',
    //     message: `This User has been successfully approved`,
    //   });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const rejectUser = async (
  setUsers: Dispatch<SetStateAction<User[]>>,
  userId: string,
  rate: number
) => {
  try {
    const user = await UserService.approval(userId, false, rate);
    getUsers(setUsers);
    console.log(getUsers(setUsers));
    //   $q.notify({
    //     color: 'danger',
    //     message: `This User is blocked`,
    //   });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
