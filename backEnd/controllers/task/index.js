import { getCurrentUserTasks, getAllTasks } from './helpers/getTask';
import { updateTask } from './helpers/updateTask';
import { createTask } from './helpers/createTask';
import { deleteRecord } from './helpers/deleteTask';
import { downloadTaskFile } from './helpers/downloadTaskFile';

export const task = {
  getCurrentUserTasks,
  getAllTasks,
  downloadTaskFile,
  updateTask,
  createTask,
  deleteRecord,
};
