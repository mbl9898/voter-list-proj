import _axios from "axios";

export class ApiService {
  private token = localStorage.getItem("token");

  private static axios = _axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-api-key": "SG.cpdcjwepcjio",
    },
  });

  static async get(url: string): Promise<any> {
    try {
      const res = await ApiService.axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async post(url: string, body?: object): Promise<any> {
    try {
      const res = await ApiService.axios.post(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async put(url: string, body: object): Promise<any> {
    try {
      const res = await ApiService.axios.put(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async delete(url: string): Promise<any> {
    try {
      const res = await ApiService.axios.delete(url);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  private static handleError(error: any) {
    console.log(error);
  }
}
