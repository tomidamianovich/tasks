import { FC } from "react";
import { Task } from "../../type";

const TodoItem: FC<Task> = ({
  completed,
  _id,
  description,
  owner,
  createdAt,
  updatedAt,
}) => (
  <div>
    <p>Completed: {completed}</p>
    <p>_id: {_id}</p>
    <p>description: {description}</p>
    <p>owner: {owner}</p>
    <p>createdAt: {createdAt}</p>
    <p>updatedAt: {updatedAt}</p>
  </div>
);

export default TodoItem;
