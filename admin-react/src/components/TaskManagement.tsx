import React, { useState } from "react";
import { useEffect } from "react";
import { Task } from "../interfaces/TaskModel";
import { UserService } from "../services/UserService";
import CreateTask from "./CreateTask";
import TasksTable from "./TasksTable";

const TaskManagement = () => {
  const [users, setUsers] = useState([]);
  const [taskEntryForm, setTaskEntryForm] = useState(false);
  const [updateTaskData, setUpdateTaskData] = useState<null | Task>(null);
  const getAllUsers = async () => {
    const res = await UserService.allUsers();
    if (res) {
      setUsers(res);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="container">
      <h4 className="text-center my-1">Task Management</h4>
      <div className="d-flex flex-row-reverse m-2">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setTaskEntryForm(!taskEntryForm);
            setUpdateTaskData(null);
          }}
        >
          Create Task
        </button>
      </div>
      {!taskEntryForm && (
        <TasksTable
          taskEntryForm={taskEntryForm}
          setTaskEntryForm={setTaskEntryForm}
          setUpdateTaskData={setUpdateTaskData}
        />
      )}

      {taskEntryForm && (
        <CreateTask
          updateTaskData={updateTaskData}
          taskEntryForm={taskEntryForm}
          setTaskEntryForm={setTaskEntryForm}
          users={users}
        />
      )}
    </div>
  );
};

export default TaskManagement;
