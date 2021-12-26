import { DataAccessParamsModel } from './../components/AdminPortal/DataAccess';
import { VotesModel } from '../interfaces/VotesModel';
import { ApiService } from './ApiServices';
import UnAuthorizedModel from './UnAuthorizedModel';
import UnAuthorized from './unAuthorizedService';

export default class AuthorizedService {
  static baseUrl = ['authorized'];
  static async getAuthorized() {
    const res = await ApiService.get(AuthorizedService.baseUrl[0]);
    return res;
  }
  static async getAuthorizedPage(pageNo: number, voteLimit: number) {
    const res = await ApiService.get(
      `${AuthorizedService.baseUrl[0]}/page?page=${pageNo}&limit=${voteLimit}`,
    );
    return res;
  }
  static async getAuthorizedSearch(
    searchField: string,
    search: string | number,
    pageNo: number,
    voteLimit: number,
  ) {
    const res = await ApiService.get(
      `${AuthorizedService.baseUrl[0]}/search?search=${search}&searchField=${searchField}&page=${pageNo}&limit=${voteLimit}`,
    );
    return res;
  }
  static async getUniqueAuthorizedDataSearch(reqData: DataAccessParamsModel) {
    const res = await ApiService.get(
      `${AuthorizedService.baseUrl[0]}/unique?district=${reqData.district}
        &city=${reqData.city}
        &tehseel=${reqData.tehseel}
        &constituency=${reqData.constituency}
        &unionCouncil=${reqData.unionCouncil}
        &constituencyName=${reqData.constituencyName}
        &blockCode=${reqData.blockCode === null ? '' : reqData.blockCode}
        &phase=${reqData.phase}
        &sector=${reqData.sector}
        &street=${reqData.street}
        &gender=${reqData.gender}
        &lane=${reqData.lane}
        &boulevardAvenue=${reqData.boulevardAvenue}
        `,
    );
    return res;
  }
  static async addNewAuthorizedVote(newAuthorizedData: UnAuthorizedModel) {
    const data = await ApiService.post(
      AuthorizedService.baseUrl[0],
      newAuthorizedData,
    );
    if (data.data) {
      await UnAuthorized.deleteRecord(newAuthorizedData._id!);
    }
    return data;
  }
  static async updateAuthorizedVote(updatedAuthorizedVoteData: VotesModel) {
    const data = await ApiService.post(
      `${AuthorizedService.baseUrl[0]}/update`,
      updatedAuthorizedVoteData,
    );
    return data;
  }

  static async deleteAuthorizedRecord(id: string) {
    const res = await ApiService.delete(
      `${AuthorizedService.baseUrl[0]}/${id}`,
    );
    return res;
  }
}
