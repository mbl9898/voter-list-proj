import React, { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { useEffect } from "react";
import { getAllTasks } from "../helpers/taskManagementHelper";
import { Task } from "../interfaces/TaskModel";
import { TaskService } from "../services/TaskService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CModal from "./CModal";
import Message from "./Message";

interface Props {
  setUpdateTaskData: Dispatch<SetStateAction<Task | null>>;
  setTaskEntryForm: Dispatch<SetStateAction<boolean>>;
  taskEntryForm: boolean;
}

const TasksTable = ({
  setUpdateTaskData,
  setTaskEntryForm,
  taskEntryForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const [msg, setMsg] = useState("");
  const filteredTaskHeadings = useAppSelector(
    (state) => state.app.filteredTaskHeadings
  );
  const tasks = useAppSelector((state) => state.app.tasks);
  const deleteTask = async (id: string) => {
    const res = await TaskService.deleteTask(id);
    if (res.success) {
      setMsg(res.data);
    }

    getAllTasks(dispatch);
  };
  const onSubmit = (task: Task) => {
    task._id && deleteTask(task._id);
  };
  useEffect(() => {
    getAllTasks(dispatch);
  }, []);
  return (
    <div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {filteredTaskHeadings.map((heading: string, index: number) => (
                <th className="text-center" key={index} scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: Task, index: number) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td className="text-center">{task.email}</td>
                  <td className="text-center">{task.title}</td>
                  <td className="text-center">{task.description}</td>
                  <td className="text-center">{task.fileName}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setUpdateTaskData(!taskEntryForm ? task : null);
                        setTaskEntryForm(!taskEntryForm);
                      }}
                    >
                      update
                    </button>
                  </td>
                  <td>
                    <CModal
                      heading={"Are you sure you want to delete this Task?"}
                      triggerButtonContent="delete"
                      triggerButtonVarient="danger"
                      onSubmit={() => {
                        onSubmit(task);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
