import { VoteRejection } from '../interfaces/VoteRejection';
import { ApiService } from './ApiServices';
import UnAuthorizedModel from './UnAuthorizedModel';

<<<<<<< HEAD
export default class UnAuthorized {
  static baseUrl = ['unauthorized'];
=======
export default class UnAuthorizedService {
  static baseUrl = ["unauthorized"];
>>>>>>> 41d6c900763b519042b76f69d2574928aa9b02b0
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
<<<<<<< HEAD
        `${UnAuthorized.baseUrl[0]}/rejectedVotes`,
=======
        `${UnAuthorizedService.baseUrl[0]}/rejectedVotes`
>>>>>>> 41d6c900763b519042b76f69d2574928aa9b02b0
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewUnauthorizedData(newUnAuthorizedData: UnAuthorizedModel) {
    try {
      const res = await ApiService.post(
<<<<<<< HEAD
        UnAuthorized.baseUrl[0],
        newUnAuthorizedData,
=======
        UnAuthorizedService.baseUrl[0],
        newUnAuthorizedData
>>>>>>> 41d6c900763b519042b76f69d2574928aa9b02b0
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateRejectedVote(rejectedVoteData: UnAuthorizedModel) {
    try {
      const data = await ApiService.put(
<<<<<<< HEAD
        `${UnAuthorized.baseUrl[0]}/updateRejectedVote`,
        rejectedVoteData,
=======
        `${UnAuthorizedService.baseUrl[0]}/updateRejectedVote`,
        rejectedVoteData
>>>>>>> 41d6c900763b519042b76f69d2574928aa9b02b0
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
<<<<<<< HEAD
        `${UnAuthorized.baseUrl[0]}/rejectVote`,
        { id, rejections },
=======
        `${UnAuthorizedService.baseUrl[0]}/rejectVote`,
        { id, rejections }
>>>>>>> 41d6c900763b519042b76f69d2574928aa9b02b0
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
