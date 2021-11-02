import { VoteRejection } from "../interfaces/VoteRejection";
import { ApiService } from "./ApiServices";
import UnAuthorizedModel from "./UnAuthorizedModel";

export default class UnAuthorizedService {
  static baseUrl = ["unauthorized"];
  static async getUnAuthorized() {
    try {
      const data = await ApiService.get(UnAuthorizedService.baseUrl[0]);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getRejectedVotes() {
    try {
      const res = await ApiService.get(
        `${UnAuthorizedService.baseUrl[0]}/rejectedVotes`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewUnauthorizedData(newUnAuthorizedData: UnAuthorizedModel) {
    try {
      const res = await ApiService.post(
        UnAuthorizedService.baseUrl[0],
        newUnAuthorizedData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateRejectedVote(rejectedVoteData: UnAuthorizedModel) {
    try {
      const data = await ApiService.put(
        `${UnAuthorizedService.baseUrl[0]}/updateRejectedVote`,
        rejectedVoteData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteRecord(id: string) {
    try {
      const res = await ApiService.delete(
        `${UnAuthorizedService.baseUrl[0]}/${id}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUnAuthorizedDataById(id: string) {
    try {
      const data = await ApiService.get(
        `${UnAuthorizedService.baseUrl[0]}/${id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async rejectVote(id: string, rejections?: VoteRejection) {
    try {
      const data = await ApiService.put(
        `${UnAuthorizedService.baseUrl[0]}/rejectVote`,
        { id, rejections }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
