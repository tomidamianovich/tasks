import { FC, useState, useEffect } from "react";
import TodoItem from "../TaskItem";
import Table from "../Table";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskList, TaskListRequest } from "../../type";
import { stateType } from "../../store";
import { AxiosError } from "axios";
import { INITIAL_TASKS } from "../../utils/constants";
import { useSelector } from "react-redux";

const Tasks: FC = () => {
  const user = useSelector((state: stateType) => state.user);
  const [tasks, setTodos] = useState<TaskList>(INITIAL_TASKS);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const headings = [
    "id",
    "description",
    "owner",
    "createdAt",
    "updatedAt",
    "Completed",
  ];

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
          {tasks && tasks.map((task) => <TodoItem key={task._id} {...task} />)}
        </tr>
      </Table>
      {error && <div>{errorMsg ?? "Error founded"}</div>}
    </section>
  );
};

export default Tasks;
