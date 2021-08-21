import { Task } from "../interfaces/TaskModel";
import { ApiService } from "./ApiServices";

export class TaskService {
  static baseUrl = ["task"];

  static async getCurrentUserTasks() {
    try {
      const res = await ApiService.get(`${TaskService.baseUrl[0]}/current`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllTasks() {
    try {
      const res = await ApiService.get(`${TaskService.baseUrl[0]}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateTask(taskId: string, taskData: Task) {
    try {
      const res = await ApiService.put(
        `${TaskService.baseUrl[0]}/${taskId}`,
        taskData
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async postTask(taskData: any) {
    try {
      const res = await ApiService.post(`${TaskService.baseUrl[0]}`, taskData);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTask(taskId: string) {
    try {
      const res = await ApiService.delete(
        `${TaskService.baseUrl[0]}/${taskId}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
