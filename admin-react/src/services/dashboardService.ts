import { ApiService } from "./ApiServices";
// import UnAuthorizedModel from "./UnAuthorizedModel";

export default class DashboardService {
  static baseUrl = "profile";
  static async getUserData() {
    try {
      const data = await ApiService.get(DashboardService.baseUrl);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async changePassword() {
    try {
      const data = await ApiService.put(`${DashboardService.baseUrl}`, {});
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
