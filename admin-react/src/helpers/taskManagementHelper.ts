import { Task } from "../interfaces/TaskModel";
import { TaskService } from "../services/TaskService";
import { setFilteredTaskHeadings, setTasks } from "../store";

export const taskFormInitial: Task = {
  email: "",
  title: "",
  description: "",
};

export const getAllTasks = async (
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  dispatch: any
) => {
  const res = await TaskService.getAllTasks();
  console.log(res);

  if (res) {
    let resHeadings = res[0] && Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    if (resHeadings) {
      resHeadings.unshift("Sr");
      resHeadings = resHeadings.filter(
        (heading: string) =>
          heading !== "filePath" &&
          heading !== "_id" &&
          heading !== "enteredBy" &&
          heading !== "createdAt" &&
          heading !== "__v"
      );
      // resHeadings.push("Update");
      // resHeadings.push("Delete");
      resHeadings.forEach((heading: string) => {
        const result = heading.replace(/([A-Z])/g, " $1");
        sentenceCaseHeadings.push(
          result.charAt(0).toUpperCase() + result.slice(1)
        );
      });
      dispatch(setFilteredTaskHeadings(sentenceCaseHeadings));
      dispatch(setTasks(res));
    }
  }
};
