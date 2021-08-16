import { BlockCode } from "../interfaces/BlockCode";
import { ApiService } from "./ApiServices";

export class BlockCodeService {
  static baseUrl = ["blockCode"];

  static async getBlockCodes() {
    try {
      const res = await ApiService.get(`${BlockCodeService.baseUrl[0]}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getBlockCodeById(id: string) {
    try {
      const res = await ApiService.get(`${BlockCodeService.baseUrl[0]}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateBlockCode(blockCodeData: BlockCode) {
    try {
      const res = await ApiService.put(
        `${BlockCodeService.baseUrl[0]}`,
        blockCodeData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async postBlockCode(blockCodeData: BlockCode) {
    try {
      const res = await ApiService.post(
        `${BlockCodeService.baseUrl[0]}`,
        blockCodeData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteBlockCode(id: string) {
    try {
      const res = await ApiService.delete(
        `${BlockCodeService.baseUrl[0]}/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
