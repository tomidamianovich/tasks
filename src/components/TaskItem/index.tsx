import { FC } from "react";
import { Task } from "../../type";
import { useDispatch } from "react-redux";
import { removeTask } from "../../store/reducers/tasksReducer";

const TodoItem: FC<Task> = ({
  completed,
  _id,
  description,
  owner,
  createdAt,
  updatedAt,
}) => {
  const dispatch = useDispatch();
  const handleOnRemoveItem = () => {
    dispatch(removeTask(_id));
  };
  return (
    <tr>
      <th>{_id}</th>
      <th>{description}</th>
      <th>{owner}</th>
      <th>{createdAt}</th>
      <th>{updatedAt}</th>
      <th>{completed ? "Yes" : "No"}</th>
      <th>
        <button onClick={handleOnRemoveItem} className="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </th>
    </tr>
  );
};

export default TodoItem;
