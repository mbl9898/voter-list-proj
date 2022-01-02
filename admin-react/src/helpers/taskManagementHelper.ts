import { Dispatch, SetStateAction } from 'react';
import { Task } from '../interfaces/TaskModel';
import { TaskService } from '../services/TaskService';
import { setFilteredTaskHeadings, setTasks } from '../store';

export const taskFormInitial: Task = {
  email: '',
  title: '',
  description: '',
};

export const getAllTasks = async (
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  dispatch: Dispatch<{ payload: any; type: string }>,
  setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  const res = await TaskService.getAllTasks();
  !res[0] && dispatch(setTasks(res));
  if (res) {
    let resHeadings = res[0] && Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    if (resHeadings) {
      resHeadings.unshift('Sr');
      resHeadings = resHeadings.filter(
        (heading: string) =>
          heading !== 'filePath' &&
          heading !== '_id' &&
          heading !== 'enteredBy' &&
          heading !== 'createdAt' &&
          heading !== '__v',
      );
      // resHeadings.push("Update");
      // resHeadings.push("Delete");
      resHeadings.forEach((heading: string) => {
        const result = heading.replace(/([A-Z])/g, ' $1');
        sentenceCaseHeadings.push(
          result.charAt(0).toUpperCase() + result.slice(1),
        );
      });
      dispatch(setFilteredTaskHeadings(sentenceCaseHeadings));
      await dispatch(setTasks(res));
      setLoading && setLoading(false);
    }
  }
};

export const getTaskFile = async (fileName: string) => {
  const res = await TaskService.getTaskFile(fileName);
  window.location.assign(
    (process.env.REACT_APP_API_IS_DEV === 'true'
      ? 'http://localhost:5000/'
      : 'https://dataentry.alabrar.pk/') + res.path,
  );
};
