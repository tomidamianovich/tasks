import { FC } from "react";
import { Task } from "../../type";

type TaskItemProps = Task & {
  handleDeleteTask: (_id: string) => void;
};

const TaskItem: FC<TaskItemProps> = ({
  completed,
  _id,
  description,
  owner,
  createdAt,
  updatedAt,
  handleDeleteTask,
}) => (
  <tr>
    <th>{_id}</th>
    <th>{description}</th>
    <th>{owner}</th>
    <th>{createdAt}</th>
    <th>{updatedAt}</th>
    <th>{completed ? "Yes" : "No"}</th>
    <th>
      <button onClick={() => handleDeleteTask(_id)} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </th>
  </tr>
);

export default TaskItem;
