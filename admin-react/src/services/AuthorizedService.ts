import { VotesModel } from "../interfaces/VotesModel";
import { ApiService } from "./ApiServices";
import UnAuthorizedModel from "./UnAuthorizedModel";
import UnAuthorized from "./unAuthorizedService";

export default class AuthorizedService {
  static baseUrl = ["authorized"];
  static async getAuthorized() {
    try {
      const res = await ApiService.get(AuthorizedService.baseUrl[0]);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAuthorizedPage(pageNo: number, voteLimit: number) {
    try {
      const res = await ApiService.get(
        `${AuthorizedService.baseUrl[0]}/page?page=${pageNo}&limit=${voteLimit}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAuthorizedSearch(
    searchField: string,
    search: string | number,
    pageNo: number,
    voteLimit: number
  ) {
    try {
      const res = await ApiService.get(
        `${AuthorizedService.baseUrl[0]}/search?search=${search}&searchField=${searchField}&page=${pageNo}&limit=${voteLimit}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewAuthorizedVote(newAuthorizedData: UnAuthorizedModel) {
    try {
      const data = await ApiService.post(
        AuthorizedService.baseUrl[0],
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
  static async updateAuthorizedVote(updatedAuthorizedVoteData: VotesModel) {
    try {
      const data = await ApiService.post(
        `${AuthorizedService.baseUrl[0]}/update`,
        updatedAuthorizedVoteData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAuthorizedRecord(id: string) {
    try {
      const res = await ApiService.delete(
        `${AuthorizedService.baseUrl[0]}/${id}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
