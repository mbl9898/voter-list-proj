import { DataAccessParamsModel } from '../components/AdminPortal/DataAccess';
import { User } from '../interfaces/User';
import { ApiService } from './ApiServices';
import UserModel from './UserModel';
import { ResetPasswordModel } from '../components/ResetPassword';
export class UserService {
  static baseUrl = ['auth', 'profile'];

  static async registerUser(registerUser: UserModel) {
    const data = await ApiService.post(
      `${UserService.baseUrl[0]}/register`,
      registerUser,
    );
    return data;
  }

  static async loginUser(loginUser: UserModel) {
    const data = await ApiService.post(
      `${UserService.baseUrl[0]}/login`,
      loginUser,
    );
    return data;
  }

  static async validateToken() {
    const data = await ApiService.get(
      `${UserService.baseUrl[0]}/validateToken`,
    );
    return data;
  }
  static async getUserDataByEmail(email: string) {
    const data = await ApiService.get(
      `${UserService.baseUrl[1]}/userData/${email}`,
    );
    return data;
  }

  static async allUsers() {
    const data = await ApiService.get(`${UserService.baseUrl[1]}/allusers`);
    return data.data;
  }
  static async updateUser(userData: User) {
    const res = await ApiService.put(`${UserService.baseUrl[1]}`, userData);
    return res;
  }
  static async updatedUserDataAccess(
    userId: string,
    accessData: DataAccessParamsModel,
  ) {
    const res = await ApiService.put(`${UserService.baseUrl[1]}/dataAccess`, {
      userId,
      ...accessData,
    });
    return res;
  }
  static async updateProfile(userData: { username: string; mobileNo: string }) {
    try {
      const res = await ApiService.put(
        `${UserService.baseUrl[0]}/updateProfile`,
        userData,
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async resetPassword(passwordData: ResetPasswordModel) {
    try {
      const res = await ApiService.put(
        `${UserService.baseUrl[0]}/reset-password`,
        passwordData,
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async setDefaultBlockCode(_id: string, defaultBlockCode: number) {
    const res = await ApiService.put(
      `${UserService.baseUrl[1]}/setDefaultBlockCode`,
      { _id, defaultBlockCode },
    );
    return res;
  }
  static async resetPassword(passwordData: ResetPasswordModel) {
    const res = await ApiService.put(
      `${UserService.baseUrl[0]}/reset-password`,
      passwordData,
    );
    return res;
  }
  static async updateProfile(userData: { username: string; mobileNo: string }) {
    const res = await ApiService.put(
      `${UserService.baseUrl[0]}/updateProfile`,
      userData,
    );
    return res;
  }
}
