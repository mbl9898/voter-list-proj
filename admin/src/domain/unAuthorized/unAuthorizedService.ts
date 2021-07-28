import { ApiService } from "@/services/ApiServices";
import UnAuthorizedModel from "./UnAuthorizedModel";

export default class UnAuthorized {
  static baseUrl = ["unauthorized", "authorized"];
  static async getUnAuthorized() {
    try {
      const data = await ApiService.get(UnAuthorized.baseUrl[0]);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewUnauthorizedData(newUnAuthorizedData: UnAuthorizedModel) {
    try {
      const data = await ApiService.post(
        UnAuthorized.baseUrl[0],
        newUnAuthorizedData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteRecord(id: string) {
    try {
      const data = await ApiService.delete(`${UnAuthorized.baseUrl[0]}/${id}`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAuthorized() {
    try {
      const data = await ApiService.get(UnAuthorized.baseUrl[1]);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewAuthorizedData(newAuthorizedData: UnAuthorizedModel) {
    try {
      const data = await ApiService.post(
        UnAuthorized.baseUrl[1],
        newAuthorizedData
      );
      if (data.data) {
        await UnAuthorized.deleteRecord(newAuthorizedData._id!);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUnAuthorizedDataById(id: string) {
    try {
      console.log(id);
      const data = await ApiService.get(`${UnAuthorized.baseUrl[0]}/${id}`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAuthorizedRecord(id: string) {
    try {
      const data = await ApiService.delete(`${UnAuthorized.baseUrl[1]}/${id}`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
