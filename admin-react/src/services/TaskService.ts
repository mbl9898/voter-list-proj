import { Task } from '../interfaces/TaskModel';
import { ApiService } from './ApiServices';

export class TaskService {
  static baseUrl = ['task'];

  static async getCurrentUserTasks() {
    const res = await ApiService.get(`${TaskService.baseUrl[0]}/current`);
    return res;
  }
  static async getAllTasks() {
    const res = await ApiService.get(`${TaskService.baseUrl[0]}`);
    return res.data;
  }
  static async updateTask(taskId: string, taskData: Task) {
    const res = await ApiService.put(
      `${TaskService.baseUrl[0]}/${taskId}`,
      taskData,
    );
    return res;
  }
  static async getTaskFile(fileName: string) {
    const res = await ApiService.get(`${TaskService.baseUrl[0]}/${fileName}`);
    return res;
  }
  static async postTask(taskData: any) {
    const res = await ApiService.post(`${TaskService.baseUrl[0]}`, taskData);
    return res;
  }
  static async deleteTask(taskId: string) {
    const res = await ApiService.delete(`${TaskService.baseUrl[0]}/${taskId}`);
    return res;
  }
}
