import { FC, useState, useEffect } from "react";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskList, TaskListRequest } from "../../type";
import { stateType } from "../../store";
import { AxiosError } from "axios";
import { INITIAL_TASKS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { AddTaskForm, TaskItem, Table, Modal } from "../";

const Tasks: FC = () => {
  const user = useSelector((state: stateType) => state.user);
  const [tasks, setTodos] = useState<TaskList>(INITIAL_TASKS);
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
      .then((response: TaskListRequest) => setTodos(response.data))
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });

  useEffect(() => {
    getItems();
  }, []);

  return (
    <section>
      <Table headings={headings}>
        <tr>
          {tasks && tasks.map((task) => <TaskItem key={task._id} {...task} />)}
        </tr>
      </Table>
      {error && <div>{errorMsg ?? "Error founded"}</div>}
      <AddTaskForm handleAddTask={handleModalVisibility} />
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
