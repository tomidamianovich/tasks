import { FC, useState, useEffect } from "react";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskListRequest, Task } from "../../type";
import { stateType } from "../../store";
import { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddTaskForm, TaskItem, Table, Modal } from "../";
import { addTask, setTasks } from "../../store/reducers/tasksReducer";
import "./styles/index.scss";

const Tasks: FC = () => {
  const user = useSelector((state: stateType) => state.user);
  const tasks = useSelector((state: stateType) => state.tasks);
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
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
      .then((response: TaskListRequest) => setTasks(response.data))
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });

  useEffect(() => {
    getItems();
  }, []);

  const handleAddTaskForm = () => {
    // handleModalVisibility();
    dispatch(
      addTask({
        _id: "62b822d244d16b00177cd1a1" + Math.random(),
        completed: false,
        description: "Placeholder task",
        owner: "62b81c3744d16b00177cd19e",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    );
  };

  return (
    <section>
      <Table headings={headings}>
        <tbody>
          {tasks.map((task: Task) => (
            <TaskItem {...task} />
          ))}
        </tbody>
      </Table>
      {error && <div>{errorMsg ?? "Error founded"}</div>}
      <AddTaskForm handleAddTask={handleAddTaskForm} />
      {isModalVisible && (
        <Modal
          title="Add new Task"
          children={<div>Form</div>}
          onClose={handleModalVisibility}
        />
      )}
    </section>
  );
};

export default Tasks;
