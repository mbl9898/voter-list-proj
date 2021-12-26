import { ApiService } from './ApiServices';
// import UnAuthorizedModel from "./UnAuthorizedModel";

export default class DashboardService {
  static baseUrl = 'profile';
  static async getUserData() {
    const data = await ApiService.get(DashboardService.baseUrl);
    return data.data;
  }

  static async changePassword() {
    const data = await ApiService.put(`${DashboardService.baseUrl}`, {});
    return data.data;
  }
}
