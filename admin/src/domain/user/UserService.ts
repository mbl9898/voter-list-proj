import { ApiService } from "@/services/ApiServices";
import UserModel from "./UserModel";
export class UserService {
  static baseUrl = ["auth", "userDashboard"];

  static async registerUser(registerUser: UserModel) {
    try {
      const data = await ApiService.post(
        `${UserService.baseUrl[0]}/register`,
        registerUser
      );
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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

  static async approval(userId: string, isApproved: boolean, rate: number) {
    try {
      const data = await ApiService.put(`${UserService.baseUrl[0]}/approval`, {
        userId,
        isApproved,
        rate,
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
