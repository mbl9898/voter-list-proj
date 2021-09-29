import { User } from "../interfaces/User";
import { ApiService } from "./ApiServices";
import UserModel from "./UserModel";
export class UserService {
  static baseUrl = ["auth", "profile"];

  static async registerUser(registerUser: UserModel) {
    try {
      const data = await ApiService.post(
        `${UserService.baseUrl[0]}/register`,
        registerUser
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(loginUser: UserModel) {
    try {
      const data = await ApiService.post(
        `${UserService.baseUrl[0]}/login`,
        loginUser
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async validateToken() {
    try {
      const data = await ApiService.get(
        `${UserService.baseUrl[0]}/validateToken`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserDataByEmail(email: string) {
    try {
      const data = await ApiService.get(
        `${UserService.baseUrl[1]}/userData/${email}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async allUsers() {
    try {
      const data = await ApiService.get(`${UserService.baseUrl[0]}/allusers`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(userData: User) {
    try {
      const res = await ApiService.put(`${UserService.baseUrl[0]}`, userData);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async setDefaultBlockCode(_id: string, defaultBlockCode: number) {
    try {
      const res = await ApiService.put(
        `${UserService.baseUrl[0]}/setDefaultBlockCode`,
        { _id, defaultBlockCode }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
