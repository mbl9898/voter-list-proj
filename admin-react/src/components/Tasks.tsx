import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getTaskFile } from '../helpers/taskManagementHelper';
import { Task } from '../interfaces/TaskModel';
import { TaskService } from '../services/TaskService';
import Loading from './Loading';

const Tasks = () => {
  const [tasks, setTasks] = useState<null | Task[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getTasks = async () => {
    try {
      const res = await TaskService.getCurrentUserTasks();
      console.log(res);
      await setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className='container'>
          {tasks && !tasks[0] && (
            <h4 className='my-4 text-center'>No Task Assigned</h4>
          )}
          <div className='cpage-content'>
            {tasks?.map((task: Task, index: number) => {
              return (
                <Card key={index} className='d-flex justify-content-center p-4'>
                  <p>Title: {task.title}</p>
                  <p>Description: {task.description}</p>
                  <p>FileName: {task.fileName}</p>
                  {task.filePath && (
                    <button
                      className='btn btn-primary'
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
      )}
    </>
  );
};

export default Tasks;
