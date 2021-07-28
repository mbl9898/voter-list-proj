import { ApiService } from "@/services/ApiServices";
// import UnAuthorizedModel from "./UnAuthorizedModel";

export default class UnAuthorized {
  static baseUrl = "profile-settings";
  static async getUserData() {
    try {
      const data = await ApiService.get(UnAuthorized.baseUrl);
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async changePassword() {
    try {
      const data = await ApiService.put(`${UnAuthorized.baseUrl}`, {});
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
