import { ApiService } from "./ApiServices";
import UserModel from "./UserModel";
export class UserService {
  static baseUrl = ["auth", "profile-settings"];

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
  static async changeRole(
    userId: string,
    role: "admin" | "dataEntry" | "dataViewer"
  ) {
    try {
      const res = await ApiService.put(`${UserService.baseUrl[1]}/changeRole`, {
        userId,
        role,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async changeRate(userId: string, rate: number) {
    try {
      const res = await ApiService.put(`${UserService.baseUrl[1]}/changeRate`, {
        userId,
        rate,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
