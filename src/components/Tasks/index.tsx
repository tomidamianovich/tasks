import { FC, useState, useEffect } from "react";
import TodoItem from "../TaskItem";
import { taskRequestHandler } from "../../utils/requestHandler";
import { TaskList, TaskListRequest, UserToken } from "../../type";
import { AxiosError } from "axios";
import { INITIAL_TASKS } from "../../utils/constants";

type TasksProps = {
  token: UserToken;
};

const Tasks: FC<TasksProps> = ({ token }) => {
  const [tasks, setTodos] = useState<TaskList>(INITIAL_TASKS);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getItems = () =>
    taskRequestHandler
      .getTasks(token)
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
      {tasks && tasks.map((task) => <TodoItem key={task._id} {...task} />)}
      {error && <div>{errorMsg ?? "Error founded"}</div>}
    </section>
  );
};

export default Tasks;
