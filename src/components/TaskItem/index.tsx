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
  <>
    <th>{_id}</th>
    <th>{description}</th>
    <th>{owner}</th>
    <th>{createdAt}</th>
    <th>{updatedAt}</th>
    <th>{completed ? "Yes" : "No"}</th>
  </>
);

export default TodoItem;
