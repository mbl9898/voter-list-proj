import { SetStateAction, useState } from 'react';
import { Dispatch } from 'react';
import { useEffect } from 'react';
import { getAllTasks, getTaskFile } from '../../helpers/taskManagementHelper';
import { Task } from '../../interfaces/TaskModel';
import { TaskService } from '../../services/TaskService';
import { setMessage, setMessageVariant } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CModal from '../CModal';
import Loading from '../Loading';
import { StoreState } from './../../store/index';

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
  const [loading, setLoading] = useState(false);
  const filteredTaskHeadings = useAppSelector(
    (state: StoreState) => state.app.filteredTaskHeadings,
  );
  const tasks = useAppSelector((state: StoreState) => state.app.tasks);
  const deleteTask = async (id: string) => {
    const res = await TaskService.deleteTask(id);

    if (res && !res.success) {
      dispatch(setMessageVariant('danger'));
      dispatch(setMessage(res.message));
      return;
    }

    dispatch(setMessageVariant('success'));
    dispatch(setMessage(res.message));

    getAllTasks(dispatch, setLoading);
  };
  const onSubmit = (task: Task) => {
    task._id && deleteTask(task._id);
  };
  useEffect(() => {
    getAllTasks(dispatch, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {!tasks[0] && <h5 className="text-center">No Task Data</h5>}
          {tasks[0] && (
            <div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {filteredTaskHeadings.map(
                        (heading: string, index: number) => (
                          <th className="text-center" key={index} scope="col">
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task: Task, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="text-center">{task.email}</td>
                          <td className="text-center">{task.title}</td>
                          <td className="text-center">{task.description}</td>
                          <td className="text-center">{task.fileName}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setUpdateTaskData(!taskEntryForm ? task : null);
                                setTaskEntryForm((prevV) => !prevV);
                              }}
                            >
                              update
                            </button>
                          </td>
                          <td>
                            {task.fileName && (
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  task.fileName && getTaskFile(task.fileName);
                                }}
                              >
                                View File
                              </button>
                            )}
                          </td>
                          <td>
                            <CModal
                              heading={
                                'Are you sure you want to delete this Task?'
                              }
                              triggerButtonContent="delete"
                              triggerButtonVariant="danger"
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
          )}
        </>
      )}
    </>
  );
};

export default TasksTable;
