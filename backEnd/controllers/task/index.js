import { getCurrentUserTasks, getAllTasks } from './helpers/getTask';
import { updateTask } from './helpers/updateTask';
import { createTask } from './helpers/createTask';
import { deleteRecord } from './helpers/deleteTask';

export const task = {
  getCurrentUserTasks,
  getAllTasks,
  updateTask,
  createTask,
  deleteRecord,
};
