import React, { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";
import { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getAllTasks, taskFormInitial } from "../helpers/taskManagementHelper";
import { useForm } from "../helpers/useForm";
import { Task } from "../interfaces/TaskModel";
import { User } from "../interfaces/User";
import { ApiService } from "../services/ApiServices";
import { useAppDispatch } from "../store/hooks";
import Message from "./Message";
import Progress from "./Progress";

interface Props {
  users: User[];
  updateTaskData: Task | null;
  setTaskEntryForm: Dispatch<SetStateAction<boolean>>;
}

const CreateTask = ({ users, setTaskEntryForm, updateTaskData }: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, onChange, onSubmit, setData } = useForm(
    onTaskSubmit,
    taskFormInitial
  );

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  async function onTaskSubmit(e: any) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", data.email ? data.email : "");
    formData.append("title", data.title ? data.title : "");
    formData.append("description", data.description ? data.description : "");

    try {
      const axios = ApiService.createAxios();
      const resCreate =
        !updateTaskData &&
        (await axios.post("/task", formData, {
          onUploadProgress: (progressEvent: any) => {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }));
      const resUpdate =
        updateTaskData &&
        (await axios.put(`/task/${data._id}`, formData, {
          onUploadProgress: (progressEvent: any) => {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }));
      console.log(resUpdate);
      console.log(resCreate && resCreate.data);
      if (
        (resCreate && resCreate.data.success) ||
        (resUpdate && resUpdate.data.success)
      ) {
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
        resCreate && setMessage("Task Created SuccessFully");
        resUpdate && setMessage("Task Updated SuccessFully");
        setData(taskFormInitial);
        fileInputRef.current && (fileInputRef.current.value = "");
        setFile("");
        getAllTasks(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    updateTaskData && setData(updateTaskData);
  }, [updateTaskData]);
  return (
    <>
      {message ? <Message msg={message} variant="info" /> : null}
      <Card className="m-4 p-4">
        <h4 className="text-center">
          {updateTaskData ? "Update Task" : "Create Task"}
        </h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select User Email</Form.Label>
            <Form.Control
              list="users"
              type="email"
              placeholder="Select email of user which you want to assign a task "
              name="email"
              value={data.email}
              onChange={onChange}
              required
            />
            <datalist id="users">
              {users.map((user: User, index: number) => (
                <option key={index} value={`${user.email}`} />
              ))}
            </datalist>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="Task Title"
              value={data.title}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              name="description"
              value={data.description}
              onChange={onChange}
              placeholder="Task Description"
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Choose Task File</Form.Label>
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </Form.Group>

          <Progress percentage={uploadPercentage} />
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className="btn btn-primary btn-block w-50 mt-4"
            >
              {updateTaskData ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default CreateTask;
