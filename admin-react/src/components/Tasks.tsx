import { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Task } from "../interfaces/TaskModel";
import { TaskService } from "../services/TaskService";

const Tasks = () => {
  const [tasks, setTasks] = useState<null | Task[]>(null);
  const getTasks = async () => {
    try {
      const res = await TaskService.getCurrentUserTasks();
      console.log(res);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getTaskFile = async (fileName: string) => {
    const res = await TaskService.getTaskFile(fileName);
    window.location.assign(
      (process.env.REACT_APP_API_IS_DEV === "true"
        ? "http://localhost:5000/"
        : "https://dataentry.alabrar.pk/") + res.path
    );
    console.log(res);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="container">
      {tasks && !tasks[0] && (
        <h4 className="my-4 text-center">No Task Assigned</h4>
      )}
      <div className="cpage-content">
        {tasks?.map((task: Task, index: number) => {
          return (
            <Card key={index} className="d-flex justify-content-center p-4">
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>FileName: {task.fileName}</p>
              {task.filePath && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    task.fileName && getTaskFile(task.fileName);
                  }}
                >
                  Download
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
