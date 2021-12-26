import { BlockCode } from '../interfaces/BlockCode';
import { ApiService } from './ApiServices';

export class BlockCodeService {
  static baseUrl = ['blockCode'];

  static async getBlockCodes() {
    const res = await ApiService.get(`${BlockCodeService.baseUrl[0]}`);
    return res.data;
  }
  static async getBlockCodeByNumber(blockCodeNumber: number) {
    const res = await ApiService.get(
      `${BlockCodeService.baseUrl[0]}/${blockCodeNumber}`,
    );
    return res;
  }
  static async updateBlockCode(blockCodeData: BlockCode) {
    const res = await ApiService.put(
      `${BlockCodeService.baseUrl[0]}`,
      blockCodeData,
    );
    return res;
  }
  static async postBlockCode(blockCodeData: BlockCode) {
    const res = await ApiService.post(
      `${BlockCodeService.baseUrl[0]}`,
      blockCodeData,
    );
    return res;
  }
  static async deleteBlockCode(id: string) {
    const res = await ApiService.delete(`${BlockCodeService.baseUrl[0]}/${id}`);
    return res.data;
  }
}
