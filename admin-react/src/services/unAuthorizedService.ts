import { VoteRejection } from '../interfaces/VoteRejection';
import { ApiService } from './ApiServices';
import UnAuthorizedModel from './UnAuthorizedModel';

export default class UnAuthorizedService {
  static baseUrl = ['unauthorized'];
  static async getUnAuthorized() {
    const data = await ApiService.get(UnAuthorizedService.baseUrl[0]);
    return data.data;
  }
  static async getRejectedVotes() {
    const res = await ApiService.get(
      `${UnAuthorizedService.baseUrl[0]}/rejectedVotes`,
    );
    return res.data;
  }
  static async addNewUnauthorizedData(newUnAuthorizedData: UnAuthorizedModel) {
    const res = await ApiService.post(
      UnAuthorizedService.baseUrl[0],
      newUnAuthorizedData,
    );
    return res;
  }
  static async updateRejectedVote(rejectedVoteData: UnAuthorizedModel) {
    const data = await ApiService.put(
      `${UnAuthorizedService.baseUrl[0]}/updateRejectedVote`,
      rejectedVoteData,
    );
    return data;
  }
  static async deleteRecord(id: string) {
    const res = await ApiService.delete(
      `${UnAuthorizedService.baseUrl[0]}/${id}`,
    );
    return res;
  }
  static async getUnAuthorizedDataById(id: string) {
    const data = await ApiService.get(
      `${UnAuthorizedService.baseUrl[0]}/${id}`,
    );
    return data.data;
  }
  static async rejectVote(id: string, rejections?: VoteRejection) {
    const data = await ApiService.put(
      `${UnAuthorizedService.baseUrl[0]}/rejectVote`,
      { id, rejections },
    );
    return data;
  }
}
