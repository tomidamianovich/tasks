import { FC, useState, useEffect } from "react";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskListRequest, Task } from "../../type";
import { stateType } from "../../store";
import { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddTaskButton, TaskItem, Table, Modal, AddTaskForm, Badge } from "../";
import {
  addTask,
  deleteTask,
  setTasks,
} from "../../store/reducers/tasksReducer";
import "./styles/index.scss";

const Tasks: FC = () => {
  const user = useSelector((state: stateType) => state.user);
  const tasks = useSelector((state: stateType) => state.tasks);
  const dispatch = useDispatch();
  const [hasError, setError] = useState<boolean>(false);
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const headings = [
    "id",
    "description",
    "owner",
    "createdAt",
    "updatedAt",
    "Completed",
  ];

  const handleModalVisibility = () => setModalVisibility(!isModalVisible);

  const getItems = () =>
    taskRequestHandler
      .getTasks(user?.token)
      .then((response: TaskListRequest) => {
        dispatch(setTasks(response.data));
      })
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });

  const handleAddTask = (description: string) =>
    taskRequestHandler
      .addTask(user?.token, description)
      .then((response: TaskListRequest) => dispatch(addTask(response.data)))
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });

  useEffect(() => {
    getItems();
  }, []);

  const handleAddTaskForm = () => {
    handleModalVisibility();
  };

  const handleDeleteTask = (id: string) => {
    taskRequestHandler
      .deleteTask(user?.token, id)
      .then(
        (response: TaskListRequest) =>
          response.success && dispatch(deleteTask(id))
      )
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });
  };

  return (
    <section>
      <Table headings={headings}>
        <tbody>
          {tasks.map((task: Task) => (
            <TaskItem {...task} handleDeleteTask={handleDeleteTask} />
          ))}
        </tbody>
      </Table>
      <Badge type="error" value={errorMsg} error={hasError} />
      <AddTaskButton handleAddTask={handleAddTaskForm} />
      {isModalVisible && (
        <Modal
          title="Add new Task"
          children={
            <AddTaskForm
              addTaskHandler={(description) => handleAddTask(description)}
              handleAddTask={handleAddTaskForm}
            />
          }
          onClose={handleModalVisibility}
        />
      )}
    </section>
  );
};

export default Tasks;
