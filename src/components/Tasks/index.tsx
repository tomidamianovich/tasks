import { FC, useState, useEffect } from "react";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskListRequest, Task } from "../../type";
import { stateType } from "../../store";
import { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddTaskButton, TaskItem, Table, Modal, AddTaskForm, Badge } from "../";
import { addTask, setTasks } from "../../store/reducers/tasksReducer";
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
      .then((response: TaskListRequest) => setTasks(response.data))
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

  const handleAddTask = (
    completed: boolean,
    description: string,
    owner: string
  ) =>
    dispatch(
      addTask({
        _id: "62b822d244d16b00177cd1a1" + Math.random(),
        completed,
        description,
        owner,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    );

  return (
    <section>
      <Table headings={headings}>
        <tbody>
          {tasks.map((task: Task) => (
            <TaskItem {...task} />
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
              addTaskHandler={(isCompleted, description, owner) =>
                handleAddTask(isCompleted, description, owner)
              }
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
