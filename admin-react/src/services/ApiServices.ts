import _axios from "axios";

export class ApiService {
  private static createAxios = () => {
    return _axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-api-key": "SG.cpdcjwepcjio",
      },
    });
  };

  static async get(url: string): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async post(url: string, body?: object): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.post(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async put(url: string, body: object): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.put(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async delete(url: string): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.delete(url);
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
